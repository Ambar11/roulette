const bcrypt = require('bcryptjs');
const sql = require('../../connection');
const customError = require('../custom/errors');
const Custom = require('../custom/error');
const functions = require('../custom/function');



exports.gameHistory = async(req, res) => {
    try {

        let checkBets = await functions.querySingle(`SELECT beting.game_id ,beting.number,beting.points,game.date,game.status FROM beting INNER JOIN game ON beting.game_id =  game.id WHERE beting.u_id  = ${req.session.u_id} `);
        let totalArray = checkBets.map((element) => {
            return {
                "game_id": element.game_id,
                "date": element.date,
                "bet": [{ "number": element.number, "points": element.points }]

            }
        });

        let exists = [];
        let updatedBets = [];

        totalArray.map((element, j) => {

            for (var i = 0; i < totalArray.length; i++) {
                if (i != j) {
                    if (element.game_id == totalArray[i].game_id) {
                        element.bet = element.bet.concat(totalArray[i].bet);
                    }
                }
            }
            if (exists.indexOf(element.game_id) == -1) {
                updatedBets.push(element);
                exists.push(element.game_id);
            }
        })




        res.json(updatedBets);



    } catch (error) {
        console.log(error);
        res.json(error);

    }

}


exports.beting = async(req, res) => {
    try {

        const { number, points } = req.body;
        if (!number || !points || number > 100) throw customError.dataInvalid;
        let status = await functions.querySingle(`SELECT * from game WHERE status = 0 OR status = 1`);
        if (points == 0) throw erro = new Custom('!Opps Please enter valid coins', 'enter valid coins ', '401');

        if (status.length == 0) throw erro = new Custom('!Opps No active game session', 'Theres is no active games check game timing', '401');
        if (status[0].status == 1) throw erro = new Custom('!Opps The game is paused', 'The game is paused and beting is disabled', '401');

        let checkPoints = await functions.querySingle(`SELECT * FROM points  WHERE u_id = ${req.session.u_id}`);
        if (parseInt(checkPoints[0].points) < points) throw new Custom('Opps!! There is no enough Coins  contact cashier ', 'points is less contact cashier ', '402');
        // let checkBet = await functions.querySingle(`SELECT * FROM beting WHERE u_id = ${req.session.u_id} AND number =${number}`);

        let makeBet;
        // if (checkBet.length == 0) {
        makeBet = await functions.querySingle(`INSERT INTO beting (game_id,u_id,number,points) VALUES (${status[0].id},${req.session.u_id},${number},${points})`);
        // console.log(makeBet);
        let nowDate = Date();
        await functions.querySingle(`INSERT INTO transaction (refrence,type,points,status,date) VALUES (${makeBet.insertId},'BETING',${points},'DEBITED',"${nowDate}")`);

        // } else {

        // console.log(parseInt(checkBet[0].points) + parseInt(points));

        // makeBet = await functions.querySingle(`UPDATE beting  SET points = ${parseInt(checkBet[0].points) + parseInt(points)} WHERE u_id = ${req.session.u_id} AND number =${number}`);
        // await functions.querySingle(`INSERT INTO transaction (refrence,type,points,status,date) VALUES (${makeBet.insertId},'BETING',${points},'1',${Date()}) `);

        // }
        let totalPoints = await functions.querySingle(`SELECT * FROM points WHERE u_id = ${req.session.u_id}`);
        await functions.querySingle(`UPDATE points SET points = ${parseInt(totalPoints[0].points)-points} WHERE u_id = ${req.session.u_id} `);

        res.json(makeBet);
    } catch (error) {
        // console.log(error);
        res.json(error);
        // res.status(error.code).redirect(`/user/login?status=invalid`);
    }
}




exports.login = async(req, res) => {
    try {
        let userArray;
        const { username, password, } = req.body;
        if (!username || !password) throw customError.dataInvalid;
        userArray = await functions.querySingle(`SELECT * from user WHERE username = '${username}'`);
        adminArray = await functions.querySingle(`SELECT * from admin WHERE username = '${username}'`);
        cashArray = await functions.querySingle(`SELECT * from cashier WHERE username = '${username}'`);

        if (userArray.length > 0) {
            userArray = userArray;
        } else if (adminArray.length > 0) {
            userArray = adminArray;
        } else if (cashArray.length > 0) {
            userArray = cashArray;
        } else {
            throw customError.userNotFound;
        }
        const userValidated = await bcrypt.compare(req.body.password, userArray[0].password);
        if (!userValidated) throw customError.authFailed;
        req.session.login = true;
        req.session.username = userArray[0].username;
        req.session.u_id = userArray[0].id;
        req.session.role = userArray[0].privilege;
        req.session.email = userArray[0].email;
        req.session.status = userArray[0].status;
        console.log(req.session.role);
        if (req.session.role == 'admin') res.status(201).redirect('/admin/adminPanel');
        if (req.session.role == 'cashier') res.status(201).redirect('/cashier/cashierPanel');
        if (req.session.role == 'user') res.status(201).redirect('/user/playerHome');


    } catch (error) {
        // console.log(error);
        // res.send(error);
        res.status(error.code).redirect(`/user/login?status=invalid`);
    }
}





exports.register = async(req, res, next) => {
    function register(req, res, next) {
        return new Promise((resolve, reject) => {

            const { name, username, password, email, password2 } = req.body;
            if (!email || !name || !username || !password || password.length < 5) reject(new Custom('Opps password should have 5 characters ', ' Opps password should have 5 characters ', '401'));
            if (password != password2) reject(new Custom('The passord and retyped pssword does not match', 'The passord and retyped pssword does not match', '401'));
            if (username.length < 10 || username.length > 10) reject(new Custom('Enter a valid Phone no ', 'enter your 10 digit phone number', '401'));

            sql.query(`SELECT * FROM user WHERE username = ${req.body.username} OR email= '${req.body.email}'`, (err, results) => {

                // console.log(err);
                console.log(results);
                if (results[0]) {
                    reject(new Custom('the Phone number or the email  is already exist', 'the Phone number or the email  is already exist', '401'));
                } else {
                    bcrypt.genSalt(parseInt(process.env.SALT, 10), function(err, salt) {
                        bcrypt.hash(req.body.password, salt, function(err, hashedPassword) {

                            var data = [
                                [
                                    hashedPassword,
                                    req.body.username,
                                    req.body.name,
                                    req.body.email,

                                ]
                            ];
                            sq = 'INSERT INTO user (password,username,name,email) VALUES ?';
                            sql.query(sq, [data], async(err, rows, result) => {
                                if (!err) {
                                    try {
                                        let sqlOut = await functions.querySingle(`INSERT INTO points (u_id,points) VALUES(${rows.insertId},0)`);
                                        resolve(sqlOut);
                                    } catch (error) {
                                        reject(error);
                                    }



                                } else {
                                    reject(
                                        mess = new Custom('Database error', err.code, 401)

                                    );
                                }
                            });
                        });
                    });
                }

            });

        });
    }

    register(req, res, next).then(message => {
            res.status(200).json({ code: 200, name: "registered successfully", message: "Go to the Login page" });

        })
        .catch(error => {
            // console.log(error.name);
            res.status(200).json(error);
        })
}
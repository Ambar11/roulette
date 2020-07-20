const customError = require('../custom/errors');
const Custom = require('../custom/error');
const functions = require('../custom/function');



exports.getGameStatus = async(req, res) => {

    try {

        let checkGame = await functions.querySingle(`SELECT * FROM game  ORDER BY id DESC `);
        if (!checkGame[0]) throw mess = new Custom('Opps !!', 'There is no active beting session', 401);


        res.json(checkGame[0]);
    } catch (error) {
        // console.log(error);
        res.json(error);
    }

}

exports.startGame = async(req, res) => {

    try {
        let gameDate = new Date();
        let checkGame = await functions.querySingle(`SELECT * from game WHERE status = 0 AND status = 1`);
        if (checkGame[0]) throw mess = new Custom('Opps !!', 'Select a winner to end the beting session!!', 401);
        let gameData = await functions.querySingle(`INSERT INTO game (date) VALUES ('${gameDate}')`);

        res.json(gameData);
    } catch (error) {
        // console.log(error);
        res.json(error);
    }

}

exports.pauseGame = async(req, res) => {

    try {

        let checkGame = await functions.querySingle(`SELECT * from game WHERE status = 0`);
        if (!checkGame[0]) throw mess = new Custom('Opps !!', 'There is no active beting session', 401);
        let gameData = await functions.querySingle(`UPDATE game SET status = 1 WHERE id = ${checkGame[0].id}`);

        res.json(gameData);
    } catch (error) {
        // console.log(error);
        res.json(error);
    }

}
exports.resumeGame = async(req, res) => {

    try {

        let checkGame = await functions.querySingle(`SELECT * FROM game WHERE status =1 ORDER BY id DESC `);
        if (!checkGame[0]) throw mess = new Custom('Opps !!', 'There is no active beting session', 401);
        let gameData = await functions.querySingle(`UPDATE game SET status = 0 WHERE id = ${checkGame[0].id}`);

        res.json(gameData);
    } catch (error) {
        // console.log(error);
        res.json(error);
    }

}
exports.endGame = async(req, res) => {

    try {
        const { winner_number } = req.body;
        // console.log(winner_number);
        if (!winner_number || winner_number > 100) throw customError.dataInvalid;
        let checkGame = await functions.querySingle(`SELECT * from game WHERE status = 0 OR status = 1`);
        if (!checkGame[0]) throw mess = new Custom('Opps !!', 'There is no active beting session', 401);
        let gameData = await functions.querySingle(`UPDATE game SET status = 2 WHERE id = ${checkGame[0].id}`);
        let winners = await functions.querySingle(`select u_id, sum(points*100) AS points from beting  WHERE game_id = ${checkGame[0].id} AND number = ${winner_number} group by u_id  `);
        // console.log(winners);
        await Promise.all(winners.map(async(users) => {

            let iWinner = await functions.querySingle(`INSERT INTO winner (game_id,u_id,number) VALUES (${checkGame[0].id},${users.u_id},${winner_number}) `);
            let trans = await functions.querySingle(`INSERT INTO transaction (refrence,type,points,status,date) VALUES (${iWinner.insertId},'WINNER',${users.points},'CREDITED',"${Date()}")`);
            let user = await functions.querySingle(`UPDATE points SET points = ${users.points} WHERE u_id = ${users.u_id}`);
            // console.log(userp);
            // console.log(trans);


        }));


        res.json(gameData);
    } catch (error) {
        console.log(error);
        res.json(error);
    }

}


exports.currentGameDetails = async(req, res) => {
    try {

        let checkBets = await functions.querySingle(`SELECT beting.game_id ,beting.number,beting.points,game.date,game.status FROM beting INNER JOIN game ON beting.game_id =  game.id`);
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



        return updatedBets;
        // res.json(updatedBets);



    } catch (error) {
        console.log(error);
        return error;

        // res.json(error);

    }

}
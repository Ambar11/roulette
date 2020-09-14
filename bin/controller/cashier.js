const customError = require('../custom/errors');
const Custom = require('../custom/error');
const functions = require('../custom/function');
const functions2 = require('../custom/function2');


exports.makeTransaction = async(req, res) => {
    const { user_id, amount } = req.body;
    let query = '';
    try {
        if (!user_id || user_id.length < 10) throw new Custom('User is not selected', 'Please select user ', 417);
        if (!amount || amount <= 0) throw new Custom('User enter a valid amount', 'User enter a valid amount', 417);

        let userArray = await functions.querySingle(`SELECT * from user WHERE username = ${user_id}`);
        if (!userArray[0]) throw customError.userNotFound;
        if (userArray[0].status != 0) throw new Custom('Opps!', 'The user is unathorized!', '401');

        let uPoints = await functions.querySingle(`SELECT * from points WHERE u_id = ${userArray[0].id}`);

        if (req.query.status == 'credit') {

            let totalPoints = parseInt(uPoints[0].points) + parseInt(amount);
            query = `UPDATE points SET points = ${totalPoints} WHERE id=${uPoints[0].id}`;
            await functions.querySingle(`INSERT INTO transaction (refrence,cashier_id,type,points,date,status) VALUES (${userArray[0].id},${req.session.u_id},'CASHIER',${parseInt(amount)},'${Date()}','CREDITED')`);
            await functions2.querySingle(`INSERT INTO transaction (refrence,cashier_id,type,points,date,status) VALUES (${userArray[0].id},${req.session.u_id},'CASHIER',${parseInt(amount)},'${Date()}','CREDITED')`);

        } else if (req.query.status == 'debit') {
            if (parseInt(uPoints[0].points) == 0) throw new Custom('Opps!!', 'The user Points is Zero', '401');
            if (parseInt(uPoints[0].points) < parseInt(amount)) throw new Custom(`Opps!! There is no enough Coins to withdraw The user balance is ${uPoints[0].points}`, 'points is less than balance coins ', '402');

            let totalPoints = parseInt(uPoints[0].points) - parseInt(amount);
            query = `UPDATE points SET points = ${totalPoints} WHERE id=${uPoints[0].id}`;
            await functions.querySingle(`INSERT INTO transaction (refrence,cashier_id,type,points,status,date) VALUES (${userArray[0].id},${req.session.u_id},'CASHIER',${parseInt(amount)},'DEBITED','${Date()}')`);
            await functions2.querySingle(`INSERT INTO transaction (refrence,cashier_id,type,points,status,date) VALUES (${userArray[0].id},${req.session.u_id},'CASHIER',${parseInt(amount)},'DEBITED','${Date()}')`);

        }

        let queryOut = await functions.querySingle(query);


        res.json({ code: 200, name: `Points ${req.query.status}ed Successfully!`, message: 'record updated' });
    } catch (error) {
        // console.log(error);
        res.json(error);
    }

}
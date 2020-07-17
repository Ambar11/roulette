const customError = require('../custom/errors');
const Custom = require('../custom/error');
const functions = require('../custom/function');


exports.makeTransaction = async(req, res) => {
    const { user_id, amount } = req.body;
    let query = '';
    try {
        if (!user_id || !amount || user_id.length < 10) throw customError.dataInvalid;
        let userArray = await functions.querySingle(`SELECT * from user WHERE username = ${user_id}`);
        if (!userArray[0]) throw customError.userNotFound;
        let uPoints = await functions.querySingle(`SELECT * from points WHERE u_id = ${userArray[0].id}`);

        if (req.query.status == 'increment') {

            let totalPoints = parseInt(uPoints[0].points) + parseInt(amount);
            query = `UPDATE points SET points = ${totalPoints} WHERE id=${uPoints[0].id}`;
            await functions.querySingle(`INSERT INTO transaction (refrence,cashier_id,type,points,date,status) VALUES (${userArray[0].id},${req.session.u_id},'CASHIER',${parseInt(amount)},'${Date()}','CREDITED')`);

        } else if (req.query.status == 'decrement') {

            let totalPoints = parseInt(uPoints[0].points) - parseInt(amount);
            query = `UPDATE points SET points = ${totalPoints} WHERE id=${uPoints[0].id}`;
            await functions.querySingle(`INSERT INTO transaction (refrence,cashier_id,type,points,status,date) VALUES (${userArray[0].id},${req.session.u_id},'CASHIER',${parseInt(amount)},'DEBITED','${Date()}')`);

        }

        let queryOut = await functions.querySingle(query);


        res.json(queryOut);
    } catch (error) {
        // console.log(error);
        res.json(error);
    }

}
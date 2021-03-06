const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const { checkAdmin } = require('../middleware/auth');
const functions = require('../custom/function');
const helpers = require('../custom/helper');
const { getTime } = require('../custom/helper');


 

// router.get('/dashboard', (req, res) => {

//     res.render('error');
// });


//some action to login user
router.post('/makeBet', userController.beting);
router.post('/gameHistory', userController.gameHistory);
// router.post('/myHistory', userController.myHistory);
// router.get('/logout', (req, res) => {
//     req.session.destroy();
//     res.redirect('/user/login');
// });



router.post('/makeBet', userController.beting);


router.get('/gameTiming', async(req, res) => {
let userDetails =await userController.getUserdetails(req.session.u_id);  

    res.render('schedule', {user: userDetails[0], data: 'empty' });
});
router.get('/myHistory', async(req, res) => {
    let user = await userController.getUserdetails(req.session.u_id);  

    let userDetails = await functions.querySingle(`SELECT winner.game_id AS which,winner.u_id,winner.number,transaction.type AS source,transaction.date,transaction.points,transaction.status FROM winner INNER JOIN transaction ON transaction.refrence = winner.id WHERE transaction.type = 'WINNER' AND winner.u_id = ${req.session.u_id}`);
    let updatedUser = userDetails;
    userDetails.map((user, j) => {

        updatedUser[j].slot = helpers.getSlot(user.date);
        return updatedUser[j].date = helpers.getTime(user.date);

        // console.log(userBets[j]);

    });

    let userDetails1 = await functions.querySingle(`SELECT transaction.status,transaction.type AS source,transaction.date,beting.game_id AS which,beting.u_id,SUM(beting.points) as points FROM beting INNER JOIN transaction ON transaction.refrence = beting.id INNER JOIN game ON game.id = beting.game_id WHERE transaction.type = 'BETING' AND transaction.status = 'DEBITED' AND beting.u_id = ${req.session.u_id} GROUP BY transaction.date  `);
    let updatedUser1 = userDetails1;
    userDetails1.map((user, j) => {

        updatedUser1[j].slot = helpers.getSlot(user.date);
        return updatedUser1[j].date = helpers.getTime(user.date);

        // console.log(userBets[j]);

    });
    let userDetails2 = await functions.querySingle(`SELECT transaction.status,transaction.type AS source,transaction.date,transaction.points,cashier.username AS which FROM transaction INNER JOIN cashier ON cashier.id = transaction.cashier_id WHERE transaction.type = 'CASHIER' AND refrence = ${req.session.u_id} GROUP BY transaction.date   `);
    let updatedUser2 = userDetails2;
    userDetails2.map((user, j) => {

        updatedUser2[j].slot = helpers.getSlot(user.date);
        return updatedUser2[j].date = helpers.getTime(user.date);

        // console.log(userBets[j]);

    });

    // console.log(userDetails);

    // console.log(userDetails1);
    // console.log(userDetails2);

    res.render('trans-history', { user: user[0],data: userDetails.concat(userDetails1).concat(userDetails2) });
});
router.get('/playergameHistory', async(req, res) => {
    let user = await userController.getUserdetails(req.session.u_id);  

    let userDetails1 = await functions.querySingle(`SELECT game.date,beting.game_id,beting.u_id,SUM(beting.points) AS spent FROM beting INNER JOIN transaction ON transaction.refrence = beting.id INNER JOIN game ON game.id = beting.game_id WHERE  beting.u_id = ${req.session.u_id} GROUP BY beting.game_id`);
    let updatedUser1 = userDetails1;
    let userDetails2 = await functions.querySingle(`SELECT winner.game_id,SUM(beting.points)*100 AS earned FROM winner INNER JOIN beting ON beting.u_id = winner.u_id WHERE winner.number = beting.number AND winner.u_id = ${req.session.u_id} GROUP BY winner.game_id`);
    let updatedUser2 = userDetails2;
    userDetails1.map((user, j) => {
        updatedUser1[j].earned = 0;
        updatedUser1[j].slot = helpers.getSlot(user.date);
        updatedUser2.map((win,i)=>{
            if (updatedUser1[j].game_id===updatedUser2[i].game_id) {
                // console.log(updatedUser2[i].game_id);
               return updatedUser1[j].earned = updatedUser2[i].earned;
            }
        });
        return updatedUser1[j].date = helpers.getTime(user.date);
    });
        // console.log(updatedUser1);

    res.render('prevgames', { data: updatedUser1 ,user: user[0]});
});

router.get('/play', async(req, res) => {
    try {
        
        let user = await userController.getUserdetails(req.session.u_id);  
// console.log(user);
        let checkGame = await functions.querySingle(`SELECT * FROM game WHERE status = 0 OR status = 1  ORDER BY id DESC`);
        // console.log(checkGame.length);


        if (checkGame.length > 0) {


            let SumBets = await functions.querySingle(`SELECT beting.number,SUM(beting.points) AS points,game.date FROM beting INNER JOIN game ON beting.game_id = game.id WHERE beting.u_id =${req.session.u_id} AND beting.game_id =${checkGame[0].id} GROUP BY beting.number `);

            let userBets = await functions.querySingle(`SELECT beting.game_id ,beting.number,beting.points,game.date,game.status FROM beting INNER JOIN game ON beting.game_id =  game.id WHERE beting.u_id = ${req.session.u_id} AND beting.game_id =${checkGame[0].id}`);
            let newBets = userBets;
            userBets.map((bets, j) => {
                return newBets[j].date = helpers.getTime(bets.date);

                // console.log(userBets[j]);

            });
            // console.log(newBets);
            // console.log(SumBets);

            res.render('user', { status: 0, data: newBets, user: user[0], sum: SumBets, domain: process.env.DOMAIN });


        } else {
            // console.log(checkGame);

            res.render('user', { status: 1, data: checkGame[0], user: user[0], domain: process.env.DOMAIN });

        }
    } catch (error) {

    }

});
module.exports = router;
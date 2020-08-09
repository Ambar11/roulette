const express = require('express');
const moment = require('moment');

const router = express.Router();
const userController = require('../controller/admin');
const { checkAdmin } = require('../middleware/auth');
const functions = require('../custom/function');
const helpers = require('../custom/helper');
const { getTime } = require('../custom/helper');

// router.get('/logout', (req, res) => {
//     req.session.destroy();
//     res.redirect('/user/login');
// });
router.get('/getGameStatus', userController.getGameStatus);

router.get('/startGame', userController.startGame);
router.get('/pauseGame', userController.pauseGame);
router.get('/resumeGame', userController.resumeGame);
router.post('/endGame', userController.endGame);

router.get('/adminPanel', async(req, res) => {

    try {
        let checkGame = await functions.querySingle(`SELECT * FROM game  ORDER BY id DESC`);
        let status = checkGame[0].status;
        if (status == 2) {
            res.render('admin', { status: status, domain: process.env.DOMAIN });

        } else {
            let checkBets = await functions.querySingle(`SELECT game.id,game.date,game.status FROM  game  WHERE status = 0 OR status =1`);
            let totalArray = checkBets.map((element) => {
                return {
                    "game_id": element.id,
                    "date": element.date


                }
            });
            // console.log(totalArray);

            let exists = [];
            let updatedBets = [];
            let getbets = await functions.querySingle(`SELECT * FROM  beting  WHERE game_id = ${totalArray[0].game_id}`);

            let exist = [];
            let updatednumber = [];

            let bets = getbets;

            let structuredBets = [];

            for (var i = 1; i < 101; i++) {
                structuredBets.push({
                    number: i,
                    bets: 0,
                    total: 0
                });
            }

            for (var i = 0; i < bets.length; i++) {
                structuredBets[bets[i].number - 1].total += bets[i].points;
                structuredBets[bets[i].number - 1].bets++;
            }

            var dateObj = helpers.getTime(totalArray[0].date);


            res.render('admin', { status: status, data: totalArray[0], Gdate: dateObj, numbers: structuredBets, domain: process.env.DOMAIN });

        }
    } catch (error) {
        // console.log(error);
        res.render('admin', { status: 2, domain: process.env.DOMAIN });
        // return error;

        // res.json(error);

    }

});
router.get('/gameDetails/:id', async(req, res) => {

    try {

        let checkwinner = await functions.querySingle(`SELECT * FROM winner WHERE game_id = ${req.params.id} `);

        let checkGame = await functions.querySingle(`SELECT * FROM game  WHERE id = ${req.params.id} `);
        let status = checkGame[0].status;

        let checkBets = await functions.querySingle(`SELECT game.id,game.date,game.status FROM  game   WHERE id = ${req.params.id}`);
        let totalArray = checkBets.map((element) => {
            return {
                "game_id": element.id,
                "date": element.date


            }
        });


        let exists = [];
        let updatedBets = [];
        let getbets = await functions.querySingle(`SELECT * FROM  beting  WHERE game_id = ${totalArray[0].game_id}`);




        let exist = [];
        let updatednumber = [];

        let bets = getbets;

        let structuredBets = [];

        for (var i = 1; i < 101; i++) {
            structuredBets.push({
                number: i,
                bets: 0,
                total: 0
            });
        }

        for (var i = 0; i < bets.length; i++) {
            structuredBets[bets[i].number - 1].total += bets[i].points;
            structuredBets[bets[i].number - 1].bets++;
        }

        var dateObj = helpers.getTime(totalArray[0].date);
        // console.log(totalArray[0]);
        console.log(checkwinner);

        res.render('currentgameDetails', { checkwinner: checkwinner, status: status, data: totalArray[0], Gdate: dateObj, numbers: structuredBets });


    } catch (error) {
        // console.log(error);
        // return error;

        // res.json(error);

    }



});



router.get('/userHistory', async(req, res) => {



    try {
        let allUserHistory = await functions.querySingle(`SELECT user.id,user.username,user.email,points.points FROM points INNER JOIN user ON points.u_id = user.id`);

        await Promise.all(allUserHistory.map(async(user, i) => {

            let userBets = await functions.querySingle(`SELECT beting.game_id ,beting.number,beting.points,game.date,game.status FROM beting INNER JOIN game ON beting.game_id =  game.id WHERE beting.u_id = ${user.id}`);
            let newBets = userBets;
            userBets.map((bets, j) => {
                return newBets[j].date = helpers.getTime(bets.date);

                // console.log(userBets[j]);

            });
            return allUserHistory[i].bets = newBets;

        }));

        res.render('userHistory', { data: allUserHistory });


    } catch (error) {
        console.log(error);
        // return error;

        // res.json(error);

    }



    // res.render('userHistory', { data: 'empty' });
});
router.get('/gameHistory', async(req, res) => {


    try {

        let checkGames = await functions.querySingle(`SELECT * FROM game`);
        let totalArray = checkGames.map((element) => {
            return {
                "game_id": element.id,
                "date": helpers.getTime(element.date),
                "status": element.status

            }
        });

        res.render('gameHistory', { data: totalArray });


    } catch (error) {
        // console.log(error);
        // return error;

        // res.json(error);

    }



});
router.get('/usertransaction/:id', async(req, res) => {
    let userDetails = await functions.querySingle(`SELECT user.name,user.username,user.id,user.email,points.points FROM points INNER JOIN user ON user.id = points.u_id WHERE user.id=${req.params.id}`);
    if (!userDetails[0]) res.redirect('/admin/usertransactionHistory');
    let checkbets = await functions.querySingle(`SELECT * FROM transaction WHERE NOT type = 'BETING' AND NOT type='WINNER'  AND refrence=${req.params.id}`);
    if (!checkbets) res.redirect('/usertransactionHistory');
    let checktrans = await functions.querySingle(`SELECT transaction.date,transaction.points,transaction.status,beting.u_id,beting.game_id,beting.number,beting.points FROM transaction INNER JOIN beting ON beting.id=transaction.refrence WHERE type = 'BETING' AND beting.u_id=${req.params.id}`);
    let newTrans = checktrans;
    checktrans.map((bets, j) => {
        return newTrans[j].date = helpers.getTime(bets.date);

        // console.log(userBets[j]);

    });
    let newBets = checkbets;
    checkbets.map((bets, j) => {
        return newBets[j].date = helpers.getTime(bets.date);

        // console.log(userBets[j]);

    });
    let checkwins = await functions.querySingle(`SELECT * FROM winner INNER JOIN transaction ON transaction.refrence = winner.u_id WHERE winner.u_id =${req.params.id} AND transaction.type='WINNER'`);
    let newWins = checkwins;
    checkwins.map((bets, j) => {
        return newWins[j].date = helpers.getTime(bets.date);

        // console.log(userBets[j]);

    });

    let userBets = await functions.querySingle(`SELECT beting.game_id ,beting.number,beting.points,game.date,game.status FROM beting INNER JOIN game ON beting.game_id =  game.id WHERE beting.u_id = ${req.params.id}`);
    let newB = userBets;
    userBets.map((bets, j) => {
        return newB[j].date = helpers.getTime(bets.date);

        // console.log(userBets[j]);

    });


    res.render('usertransaction', { data: newBets, data1: newWins, trans: newTrans, history: newB, user: userDetails[0] });
});
router.get('/usertransactionHistory', async(req, res) => {

    let userDetails = await functions.querySingle(`SELECT * FROM user`);

    res.render('usertransactionHistory', { data: userDetails });
});
router.get('/cashiertransaction/:id', async(req, res) => {
    let cashierDetails = await functions.querySingle(`SELECT * FROM cashier WHERE id=${req.params.id}`);
    if (!cashierDetails[0]) res.redirect('/admin/cashiertransactionHistory');
    let cashierTransaction = await functions.querySingle(`SELECT user.username,user.id,transaction.date,transaction.points,transaction.status FROM transaction INNER JOIN user ON user.id = transaction.refrence WHERE type="CASHIER" AND cashier_id=${req.params.id}`);

    let cashier = cashierTransaction;
    cashierTransaction.map((bets, j) => {
        return cashier[j].date = helpers.getTime(bets.date);

        // console.log(userBets[j]);

    });
    // console.log(cashier);
    res.render('cashiertransaction', { data: cashierDetails[0], data1: cashier });
});
router.get('/cashiertransactionHistory', async(req, res) => {

    let cashierDetails = await functions.querySingle(`SELECT * FROM cashier `);

    res.render('cashiertransactionHistory', { data: cashierDetails });
});
module.exports = router;
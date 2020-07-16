const express = require('express');
const moment = require('moment');

const router = express.Router();
const userController = require('../controller/admin');
const { checkAdmin } = require('../middleware/auth');
const functions = require('../custom/function');
const helpers = require('../custom/helper');
const { getTime } = require('../custom/helper');



router.post('/startGame', (req, res, next) => { checkAdmin(req, res, next, ['admin'], 'login') }, userController.startGame);
router.post('/pauseGame', (req, res, next) => { checkAdmin(req, res, next, ['admin'], 'login') }, userController.pauseGame);

router.get('/adminPanel', (req, res, next) => { checkAdmin(req, res, next, ['admin'], 'login') }, (req, res) => {
    res.render('admin', { data: req });
});
router.get('/currentgameDetails', (req, res, next) => { checkAdmin(req, res, next, ['admin'], 'login') }, async(req, res) => {

    try {

        let checkBets = await functions.querySingle(`SELECT beting.game_id ,beting.number,beting.points,game.date,game.status FROM beting INNER JOIN game ON beting.game_id =  game.id WHERE game.status = 0 OR game.status =1`);
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


        let exist = [];
        let updatednumber = [];
        // console.log(updatedBets[0].bet);
        let bets = updatedBets[0]["bet"];
        bets.map((element, j) => {
            for (var i = 0; i < bets.length; i++) {
                if (i != j) {
                    if (element.number == bets[i].number) {
                        element.points = element.points + parseInt(bets[i].points);
                        if (!element.total) {
                            element.total = 2;

                        } else {
                            element.total = element.total + 1;

                        }

                    }
                }
            }
            if (exist.indexOf(element.number) == -1) {
                updatednumber.push(element);
                exist.push(element.number);
            }
        });
        // console.log(updatednumber);



        var dateObj = helpers.getTime(updatedBets[0].date);

        res.render('currentgameDetails', { data: updatedBets, Gdate: dateObj, numbers: updatednumber });


    } catch (error) {
        // console.log(error);
        // return error;

        // res.json(error);

    }



});

router.get('/gameDetails/:id', (req, res, next) => { checkAdmin(req, res, next, ['admin'], 'login') }, async(req, res) => {

    try {

        let checkBets = await functions.querySingle(`SELECT beting.game_id ,beting.number,beting.points,game.date,game.status FROM beting INNER JOIN game ON beting.game_id =  game.id WHERE game.id = ${req.params.id}`);
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


        let exist = [];
        let updatednumber = [];
        // console.log(updatedBets[0].bet);
        let bets = updatedBets[0]["bet"];
        bets.map((element, j) => {
            for (var i = 0; i < bets.length; i++) {
                if (i != j) {
                    if (element.number == bets[i].number) {
                        element.points = element.points + parseInt(bets[i].points);
                        if (!element.total) {
                            element.total = 2;

                        } else {
                            element.total = element.total + 1;

                        }

                    }
                }
            }
            if (exist.indexOf(element.number) == -1) {
                updatednumber.push(element);
                exist.push(element.number);
            }
        });
        // console.log(updatednumber);



        var dateObj = helpers.getTime(updatedBets[0].date);

        res.render('currentgameDetails', { data: updatedBets, Gdate: dateObj, numbers: updatednumber });


    } catch (error) {
        // console.log(error);
        // return error;

        // res.json(error);

    }



})

router.get('/userHistory', (req, res, next) => { checkAdmin(req, res, next, ['admin'], 'login') }, async(req, res) => {



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
        // allUserHistory.map(user => {
        //     console.log(user.username);
        //     user.bets.map(bet => {
        //         console.log(bet);
        //     });
        // });

        // res.json(allUserHistory);
        res.render('userHistory', { data: allUserHistory });


    } catch (error) {
        console.log(error);
        // return error;

        // res.json(error);

    }



    // res.render('userHistory', { data: 'empty' });
});
router.get('/gameHistory', (req, res, next) => { checkAdmin(req, res, next, ['admin'], 'login') }, async(req, res) => {


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
router.get('/usertransaction', (req, res, next) => { checkAdmin(req, res, next, ['admin'], 'login') }, (req, res) => {


    res.render('usertransaction', { data: 'empty' });
});
router.get('/usertransactionHistory', (req, res, next) => { checkAdmin(req, res, next, ['admin'], 'login') }, (req, res) => {
    res.render('usertransactionHistory', { data: 'empty' });
});
router.get('/cashiertransactionHistory', (req, res, next) => { checkAdmin(req, res, next, ['admin'], 'login') }, (req, res) => {
    res.render('cashiertransactionHistory', { data: 'empty' });
});
module.exports = router;
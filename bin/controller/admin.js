const customError = require('../custom/errors');
const Custom = require('../custom/error');
const functions = require('../custom/function');


exports.startGame = async(req, res) => {

    try {
        let gameDate = new Date();
        let checkGame = await functions.querySingle(`SELECT * from game WHERE status = 0`);
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

exports.endGame = async(req, res) => {

    try {
        const { winner_number } = req.body;
        if (!winner_number || winner_number > 100) throw customError.dataInvalid;
        let checkGame = await functions.querySingle(`SELECT * from game WHERE status = 1`);
        if (!checkGame[0]) throw mess = new Custom('Opps !!', 'There is no active beting session', 401);
        let gameData = await functions.querySingle(`UPDATE game SET status = 2 WHERE id = ${checkGame[0].id}`);
        let winners = await functions.querySingle(`SELECT * FROM beting WHERE game_id = ${checkGame[0].id} AND number=${winner_number}`);
        await functions.querySingle(`INSERT INTO winner (game_id,u_id) VALUES (${checkGame[0].id},${winner_number}) `);


        res.json(gameData);
    } catch (error) {
        // console.log(error);
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
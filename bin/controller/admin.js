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
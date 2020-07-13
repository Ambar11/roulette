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

        let checkGame = await functions.querySingle(`SELECT * from game WHERE status = 1`);
        if (!checkGame[0]) throw mess = new Custom('Opps !!', 'There is no active beting session', 401);
        let gameData = await functions.querySingle(`UPDATE game SET status = 2 WHERE id = ${checkGame[0].id}`);

        res.json(gameData);
    } catch (error) {
        // console.log(error);
        res.json(error);
    }

}
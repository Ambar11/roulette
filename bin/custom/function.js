const sql = require('../../connection');
const customError = require('../custom/errors');
const Custom = require('../custom/error');

let querySingle = async(query) => {
    try {


        let query1 = (query) => {
            return new Promise((resolve, reject) => {
                sql.query(query, (err, results) => {
                    if (err) throw err;
                    if (!results[0]) throw customError.dataNotFound;
                    resolve(results);
                })
            });
        }

        await Promise.all(data = await query1(query));



        return data;
    } catch (err) {
        console.log(err);
        reject(mess = new Custom('Database error', err.code, 401, err));
    }

}



let queryMultiple = async(query) => {
    try {


        let query1 = (query) => {
            return new Promise((resolve, reject) => {
                sql.query(query, (err, results) => {
                    if (err) throw err;
                    if (!results[0]) throw customError.productNotFound;
                    resolve(results);
                })
            });
        }

        await Promise.all(orderArray.map(async(e, i) => orderArray[i].hotel = await query1(e.ref_id)));



        return orderArray;
    } catch (err) {
        console.log(err);
        reject(mess = new Custom('Database error', err.code, 401))
    }

}
module.exports = { querySingle, queryMultiple };
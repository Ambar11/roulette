// require('dotenv/config');
// // const mysql = require('mysql');
// const express = require('express');
// const bodyParser = require('body-parser');
// const mysql = require('mysql2/promise');
// const app = express();
// app.use(express.json());
// app.use(require('body-parser').json());
// app.use(require('body-parser').urlencoded({ extended: true, limit: '100mb' }));
// app.use(require('body-parser').json({ limit: '100mb' }));

const { compareSync } = require("bcryptjs");

// const { resolveInclude } = require("ejs");


// const pool = mysql.createPool({
//     host: '107.178.102.117',
//     user: 'techmyli_user',
//     password: 'DX7@karan',
//     database: 'techmyli_bhajiwaala',
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });







// // let kp = getBlogPost(11);
// // console.log(kp);

// app.get('/', (req, res) => {
//     res.send(
//         pool.query(`SELECT * from ordered_products WHERE order_id = ${req.body.id}`, (error, result) => {
//             res.send(result);
//             console.log(result);
//         })
//     );
// });

// app.listen(5000, () => {
//     console.log('listening on port 5000');
// });

let kp = (message) => {
    return new Promise((resolve, reject) => {
        console.log('inside kp1');
        resolve(1);
    });

}
let kp1 = (message) => {
    return new Promise((resolve, reject) => {
        console.log('inside kp2');
        resolve(2);
    });

}
let kp2 = (message) => {
    return new Promise((resolve, reject) => {
        console.log('inside kp3');
        resolve(3);
    });

}

let out = Promise.all(kp(), kp1('hyfhyf'), kp2('ytf'));
console.log(out);
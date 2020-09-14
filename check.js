const functions = require('../custom/function');
const functions2 = require('../custom/function2');

check = async()=>{
   let db1T = await functions.querySingle(`SELECT SUM(points) FROM transaction WHERE status="CREDITED"`);
   let db1Td = await functions.querySingle(`SELECT SUM(points) FROM transaction WHERE status="CREDITED"`);
   
   let db2T = await functions2.querySingle(`SELECT SUM(points) FROM transaction WHERE status="CREDITED"`);
   let db2T = await functions2.querySingle(`SELECT SUM(points) FROM transaction WHERE status="CREDITED"`);
   
   let db1P = await functions.querySingle(`SELECT SUM(points) FROM points`);
   let db2P = await functions2.querySingle(`SELECT SUM(points) FROM points`);




}
const moment = require('moment');


function getMonthFromString(mon) {

    var d = Date.parse(mon + "1, 2012");
    if (isNaN(d)) return -1;
    return new Date(d).getMonth() + 1

}

function getTime(date) {
    let arr = moment.tz(date, "Asia/Kolkata").toString().split(' ');
    // console.log(arr);
    year = arr[3];
    month = getMonthFromString(arr[1]);
    day = arr[2];
    return dateObj = day + '/' + month + '/' + year;

}

module.exports = { getTime, getMonthFromString }
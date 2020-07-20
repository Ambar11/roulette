const moment = require('moment');


function getMonthFromString(mon) {

    var d = Date.parse(mon + "1, 2012");
    if (isNaN(d)) return -1;
    return new Date(d).getMonth() + 1

}

function getTime(date) {
    let arr = date.toString().split(' ');
    // console.log(arr);
    year = arr[3];
    month = getMonthFromString(arr[1]);
    day = arr[2];
    return dateObj = day + '/' + month + '/' + year;

}

function getSlot(date) {
    let arr = date.toString().split(' ');
    // console.log(arr);
    time = arr[4].toString().split(':');
    var data = [
            [0, 4, "Evening"],
            [5, 11, "Morning"], //Store messages in an array
            [12, 17, "Afternoon"],
            [18, 24, "Evening"]
        ],
        hr = time[0];

    for (var i = 0; i < data.length; i++) {
        if (hr >= data[i][0] && hr <= data[i][1]) {
            return data[i][2];
        }
    }

}

module.exports = { getTime, getMonthFromString, getSlot }
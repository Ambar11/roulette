const CustomError = require('./error');

const authFailed = new CustomError('Authorization Failed!',
    `Uh oh! i can't tell you anymore #BruteForcers! alert`, 401);
const dataInvalid = new CustomError('Data Invalid!',
    `Uh oh! the data you've sent is not as expected #Contact the developer!`, 417);
const userNotFound = new CustomError('User Not Found!',
    `Uh oh! i can't tell you anymore #BruteForcers! alert`, 401);
const userExists = new CustomError('User Exists!',
    'Uh oh! the phone number entered is already registered', 409);
const productExists = new CustomError('Products Exists!',
    'Uh oh! the Product entered is already registered', 409);
const productNotFound = new CustomError('umm! Product Not Found!',
    `Uh oh! we tried searching in each and every corner`, 404);
const dataNotFound = new CustomError('umm! Data Not Found!',
    `Uh oh! we tried searching in each and every corner`, 404);
const duplicateRequest = new CustomError('Already Done!',
    `Umm! The stuff you are trying to do is been done already!`, 409);
const serverDown = new CustomError('umm! Some Servers are down!',
    `we swear! that it's not us, we pay our server bills on time`, 404);
module.exports = { dataNotFound, productExists, authFailed, dataInvalid, userNotFound, userExists, productNotFound, duplicateRequest, serverDown };
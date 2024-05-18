const express = require('express');
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth, authErrorCatcher } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();


// middle ware that checks keys and validates them
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];


// this is our signup route
router.post('/', validateSignup, async (req, res) => {
  const bodyObj = { email, password, username, firstName, lastName } = req.body;
  const hashedPassword = bcrypt.hashSync(password);
  let emailCheck = User.findAll({
    where: {
      email: bodyObj.email
    }
  });


  if (emailCheck.length > 0) {
    res.status(500);
    res.set('Content-type', 'application/json');
    res.body = {
      "message": "User already exists",
      "errors": {
        "email": "User with that email already exists"
      }
    }
    return res.json(res.body);
  };
  let userNameCheck = User.findAll({
    where: {
      username: bodyObj.username
    }
  });

  if (userNameCheck.lenght>0) {
    res.status(500);
    res.set('Content-type', 'application/json');
    res.body = {
      "message": "User already exists",
      "errors": {
        "email": "User with that username already exists"
      }
    }
    return res.json(res.body);
  };

  //by here we know username and email are good and password is hashed
  //here is where we would valitade the info and catch the validation error

  for (const key in bodyObj) {
    if (bodyObj[key] === undefined || bodyObj[key] === 0) {
      res.status(400);
      res.body = {
        "message": "Bad Request",
        "errors": {
          "email": "Invalid email",
          "username": "Username is required",
          "firstName": "First Name is required",
          "lastName": "Last Name is required"
        }
      };
      return res.json(res.body);
    };
  }
  const user = await User.create({ email, username, hashedPassword, firstName, lastName });

  const safeUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
  };

  await setTokenCookie(res, safeUser);

  res.body = {user: safeUser}
  return res.json(res.body);
});


router.use(authErrorCatcher);
module.exports = router;

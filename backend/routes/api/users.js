const express = require('express');
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth, authErrorCatcher } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();


router.use(authErrorCatcher);
router.use(handleValidationErrors);

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
  let emailCheck = await User.findAll({
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
    };
    return res.json(res.body);
  };

  let userNameCheck = await User.findAll({
    where: {
      username: bodyObj.username
    }
  });

  if (userNameCheck.length>0) {
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



  for (const key in bodyObj) {
    if (bodyObj[key] === undefined || bodyObj[key] === '') {
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

router.use('/', (err,req,res,next)=>{
  if(err.title === "Bad request."){
    const statusCode = err.statusCode || 500;
  res.status(statusCode);
  res.body = {
    message: err.message,
    errors: {
      email: "Invalid email",
      username: "Username is required",
      firstName: "First Name is required",
      lastName: "Last Name is required"
    }
  }
  return res.json(res.body);
  };
});

module.exports = router;

const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const { ValidationError } = require('sequelize');
const { environment } = require('./config');
const isProduction = environment === 'production';
const app = express();


app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());



if (!isProduction) {
    // enable cors only in development
    app.use(cors());
    // cors by default allows any origin
    // we can restrict it later?
  }

  // helmet helps set a variety of headers to better secure your app
  app.use(
    helmet.crossOriginResourcePolicy({
      policy: "cross-origin"
    })
  );

  // Set the _csrf token and create req.csrfToken method
  app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
  );

app.use(routes);

app.get("/", (req, res) => {
  res.json({
    message: "API server is running",
  });
});

app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = { message: "The requested resource couldn't be found." };
  err.status = 404;
  next(err);
});

app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    let errors = {};
    for (let error of err.errors) {
      errors[error.path] = error.message;
    }
    err.title = 'Validation error';
    err.errors = errors;
  }
  next(err);
});
/*
If the error that caused this error-handler to be called is an instance of
ValidationError from the sequelize package, then the error was created from a
Sequelize database validation error and the additional keys of title string and
an object representation of its errors array and passed into the next error
handling middleware.
*/

app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack
  });
});
/*
This error handler is for formatting all the errors before returning a JSON
response. It will include the error message, the error messages as a JSON
object with key-value pairs, and the error stack trace (if the environment is
  in development) with the status code of the error message.
*/




  module.exports = app;

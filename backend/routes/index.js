const express = require('express');
// const cookieParser = require('cookie-parser');
// const csurf = require('csurf'); //suggestion made in discord but server works without it
//thanks to kegans help in not invoking req.csrfToken on line 7
const router = express.Router();

router.get('/hello/world', function(req, res) {
  res.cookie('XSRF-TOKEN', req.csrfToken);
  res.send('Hello World!');
});




module.exports = router;

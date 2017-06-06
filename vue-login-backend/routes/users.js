var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res) {
  console.log(req.body);
  res.json({result: 'Hello World'})
})

router.get('/email', function(req, res) {
  // console.log(req.body);
  console.log(req.query);
  res.json({data: '1554799901@qq.com'})
})

module.exports = router;

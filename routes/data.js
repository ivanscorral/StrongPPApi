var express = require('express');
var router = express.Router();
var EndpointUtils = require('../src/endpointUtils')
var Users = require('../src/db/users/users');


/* GET home page. */
/* Required params:
*   - username
*   - passwd: password
*/
router.post('/user', function(req, res, next) {
    let username = req.body.username;
    let pass = req.body.passwd;
    let users = new Users();
    users.register(username, pass, function(err){
        res.status(500).send(EndpointUtils.generateResponseMessage('500 Internal Server error', err));
    });
    res.status(200).send(EndpointUtils.generateResponseMessage('200 OK', 'ok'));
});

/* Required params:
*   - exercise name
*   - exercise image url (optional)
*/

router.post('/exercise', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });
/* Required params:
*   - user token
*/
router.post('/entrenamiento', function(req, res, next) {
res.render('index', { title: 'Express' });
});
/* Required params:
*   - user token
*   - id entrena
*   - id exercise
*/
router.post('/serie', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* Required params:
*   - user token
*   - id serie
*   - no repeticiones
*   - peso
*/
router.post('/repeticion', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
  

module.exports = router;

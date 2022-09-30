var express = require('express');
var router = express.Router();

/* GET home page. */
/* Required params:
*   - username
*   - pass: password
*/
router.post('/new/user', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Required params:
*   - exercise name
*   - exercise image url (optional)
*/

router.post('/new/exercise', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });
/* Required params:
*   - user token
*/
router.post('/new/entrenamiento', function(req, res, next) {
res.render('index', { title: 'Express' });
});
/* Required params:
*   - user token
*   - id entrena
*   - id exercise
*/
router.post('/new/serie', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* Required params:
*   - user token
*   - id serie
*   - no repeticiones
*   - peso
*/
router.post('/new/repeticion', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
  

module.exports = router;

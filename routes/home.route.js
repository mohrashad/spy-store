const router = require('express').Router();
const homeControl = require('../controllers/home.control');

router.get('/', homeControl.getHome);

module.exports = router;
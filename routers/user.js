const express = require("express");
const router = express.Router();
const {
    apiLogin, apiLogout, apiSignUp
} = require("../controllers/user");

router.post('/signup', apiSignUp);
router.post('/login',apiLogin);
router.get('/logout', apiLogout);

module.exports = router;
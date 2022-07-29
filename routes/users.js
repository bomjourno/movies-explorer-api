const router = require('express').Router();

const { getUser, patchUser } = require('../controllers/users');
const { patchUserValidationCheck } = require('../middlewares/validation');

router.get('/me', getUser);
router.patch('/me', patchUserValidationCheck, patchUser);

module.exports = router;

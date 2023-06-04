const Router = require('express');
const router = new Router();
const apartmentsRouter = require('./apartmentRouter');

router.use('/apartments', apartmentsRouter)

module.exports = router;
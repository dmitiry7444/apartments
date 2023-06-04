const Router = require('express');
const router = new Router();
const ApartmentController = require('../controllers/apartmentController')

router.get('/', ApartmentController.getApartments);
router.get('/:id', ApartmentController.getOneApartment);
router.post('/', ApartmentController.createApartment);
router.put('/:id', ApartmentController.updateApartment);
router.delete('/:id', ApartmentController.deleteApartment);

module.exports = router;
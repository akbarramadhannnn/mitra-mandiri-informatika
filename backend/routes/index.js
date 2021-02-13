const router = require('express').Router();
const { getPosition } = require('../controllers/position');
const {
  getEmployee,
  createEmployee,
  deleteEmployee,
  updateEmployee,
  getEmployeeById,
} = require('../controllers/employee');

router.get('/position', getPosition);
router.get('/employee', getEmployee);
router.get('/employee/:id', getEmployeeById);
router.post('/employee/create', createEmployee);
router.put('/employee/update/:id', updateEmployee);
router.delete('/employee/delete/:id', deleteEmployee);

module.exports = router;

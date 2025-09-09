const { Router } = require('express');
const { list, create } = require('../controllers/taskController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = Router();

router.get('/', authMiddleware, list);
router.post('/', authMiddleware, create);

module.exports = router;

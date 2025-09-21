const { Router } = require('express');
const router = Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, taskController.renderTasksPage);
router.post('/', authMiddleware, taskController.createTask);
router.get('/edit/:id', authMiddleware, taskController.renderEditPage);
router.post('/edit/:id', authMiddleware, taskController.updateTask);
router.post('/delete/:id', authMiddleware, taskController.deleteTask);

module.exports = router;
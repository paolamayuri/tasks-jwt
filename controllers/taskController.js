const Task = require('../models/Task');
const User = require('../models/User');

exports.renderTasksPage = async (req, res) => {
    try {
        const tasks = await Task.findAll({
            where: { userId: req.user.id },
            order: [['createdAt', 'DESC']]
        });
        // Aponte para o arquivo dentro da pasta 'tasks'
        res.render('tasks/tasks', { tasks: tasks }); 
    } catch (error) {
        console.error('Erro ao carregar as tarefas:', error);
        res.status(500).send('Erro ao carregar as tarefas.');
    }
};

exports.createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        await Task.create({ title, description, userId: req.user.id });
        res.redirect('/tasks');
    } catch (error) {
        res.status(500).send('Erro ao criar a tarefa.');
    }
};

exports.renderEditPage = async (req, res) => {
    try {
        const task = await Task.findOne({
            where: { id: req.params.id, userId: req.user.id }
        });
        if (!task) {
            return res.status(404).send('Tarefa não encontrada.');
        }
        res.render('tasks/edit-task', { task: task });
    } catch (error) {
        res.status(500).send('Erro ao carregar a página de edição.');
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { title, description, completed } = req.body;
        await Task.update(
            { title, description, completed: completed === 'on' },
            { where: { id: req.params.id, userId: req.user.id } }
        );
        res.redirect('/tasks');
    } catch (error) {
        res.status(500).send('Erro ao atualizar a tarefa.');
    }
};

exports.deleteTask = async (req, res) => {
    try {
        await Task.destroy({ where: { id: req.params.id, userId: req.user.id } });
        res.redirect('/tasks');
    } catch (error) {
        res.status(500).send('Erro ao deletar a tarefa.');
    }
};
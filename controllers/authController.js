const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_super_secret_jwt_key';

exports.renderRegisterPage = (req, res) => {
    res.render('auth/register');
};

exports.registerUser = async (req, res) => {
    const { username, password, name } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, username, password: hashedPassword });
        res.redirect('/login');
    } catch (error) {
        res.status(500).render('auth/register', { error: 'Nome de usuário já existe.' });
    }
};

exports.renderLoginPage = (req, res) => {
    res.render('auth/login');
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).render('auth/login', { error: 'Usuário ou senha incorretos.' });
        }
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/tasks');
    } catch (error) {
        res.status(500).send('Erro no servidor.');
    }
};

exports.logoutUser = (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
};
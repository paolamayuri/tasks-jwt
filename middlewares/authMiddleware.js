const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_super_secret_jwt_key';

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/login');
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Adiciona os dados do usuário à requisição
        next();
    } catch (err) {
        res.clearCookie('token');
        return res.redirect('/login');
    }
};

module.exports = authMiddleware;
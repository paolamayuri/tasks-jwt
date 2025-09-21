const express = require('express');
const db = require('./db');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 3000;

// Configura o EJS como motor de visualização e o diretório de views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Sincroniza o banco de dados e inicia o servidor
db.sync({ force: true }).then(() => {
    console.log('Database synced');
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}).catch(err => {
    console.error('Failed to sync database:', err);
});

// Importa e usa as rotas
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use('/', authRoutes);
app.use('/tasks', taskRoutes);

// Rota padrão
app.get('/', (req, res) => {
    res.redirect('/login');
});
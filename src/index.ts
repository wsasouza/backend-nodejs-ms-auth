import express from 'express';
import errorHandler from 'middlewares/error-handler.middleware';
import statusRoute from 'routes/status.route';
import usersRoute from './routes/users.route';

const app = express();

// Configurações da aplicação
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurações de Rotas
app.use(statusRoute);
app.use(usersRoute);

// Configuração dos Handlers de erro
app.use(errorHandler);

// Inicialização do servidor
app.listen(3000, () => {
    console.log('Server is running on port 3000...');
});
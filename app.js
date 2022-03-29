const express = require('express'); //commons
const cors = require('cors');
const routerBiblioteca = require('./empresaRouter')

const app = express();
app.use(express.json());
app.use(cors());


global.fileName = 'empregados.json';

app.use('/empresa', routerEmpresa);

app.use(2022, () => {
    console.log('ok');
})
const express = require('express'); 
const routerEmpresa = require('./empresaRouter')

const app = express();
app.use(express.json());


global.funcionarios = 'funcionarios.json';
global.setores = 'setores.json';

app.use('/empresa', routerEmpresa);

let port  = 3000
app.listen(port, () => {
    console.log('Porta: ' + port);
})
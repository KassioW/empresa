const fs = require('fs').promises;

const express = require('express');

const router = express.Router();
router.use(express.json());

router.get('/funcionarios', async (req, res) => { // retornar funcionario
   
    const data = await fs.readFile(global.funcionarios, 'utf-8');
   const json = JSON.parse(data)

   const funcionarios = json.funcionarios
    res.send(json.funcionarios)
});

router.get('/setores', async (req, res) => { // retornar setor
    const data = await fs.readFile(global.setores, 'utf-8');
    const json = JSON.parse(data)
 
    const funcionarios = json.funcionarios
     res.send(json.funcionarios)
 });

 router.get('/funcionarios/:name/func', async (req, res) => {
    const data = await fs.readFile(global.fileName, 'utf-8');
    const json = JSON.parse(data)

    const listafuncionarios = json.funcionarios
    const funcionarios = listafuncionarios.filter(a => a.setores == req.params.name)

    if(funcionarios)
      res.send(funcionarios)
    else
     res.status(404).end()
});

router.get('/setores/:name/qnt', async (req, res) => {
    const data = await fs.readFile(global.setores, 'utf-8');
    const json = JSON.parse(data)

    const listafuncionarios = json.funcionarios
    const funcionarios = listafuncionarios.filter(a => a.setores == req.params.nome)

    if(funcionarios){
      res.send(funcionarios,length.toString())
    }
    else
     res.status(404).end()
});


router.get('/funcionarios/:id', async (req, res) => {
    const data = await fs.readFile(global.funcionarios, 'utf-8');
    const json = JSON.parse(data)

    const listafuncionarios = json.funcionarios
    const funcionarios = listafuncionarios.find(a => a.id == req.params.name)

    if(funcionarios)
      res.send(funcionarios)
    else
     res.status(404).end()
});

router.post('/setores', async (req, res) => {// 
    let setores = req.body;

    const data = await fs.readFile(global.setores, 'utf-8');
    let json = JSON.parse(data);

    setores = {id: json.nextId, ...setores};
    json.nextId++;
    json.setores.push(setores)

    await fs.writeFile(global.setores, JSON.stringify(json))
    res.send(json)

});


router.post('/funcionarios', async (req, res) => {// 
    let funcionarios = req.body;

    const data = await fs.readFile(global.funcionarios, 'utf-8');
    let json = JSON.parse(data);

    funcionarios = {id: json.nextId, ...funcionarios};
    json.nextId++;
    json.funcionarios.push(funcionarios)

    await fs.writeFile(global.funcionarios, JSON.stringify(json))
    res.send(json)

});


router.delete('/funcionarios/:id', async (req, res) => {// excluir funcionario
    const data = await fs.readFile(global.funcionarios, 'utf-8');
    let json = JSON.parse(data);

    let listafuncionarios = json.funcionarios
    listafuncionarios = listafuncionarios.filter(a => a.id != req.params.id)

    json.funcionarios = listafuncionarios

    await fs.writeFile(global.funcionarios, JSON.stringify(json))
     
    res.send(json)

});

module.exports = router;


const fs = require('fs').promises;

const express = require('express');

const router = express.Router();
router.use(express.json());

router.get('/:funcionarios', async (req, res) => { // retornar todos
   const data = await fs.readFile(global.fileName, 'utf-8');
   const json = JSON.parse(data)

   const funcionarios = json.funcionarios
    res.send(json.funcionarios)
});

router.get('/setores', async (req, res) => {
    const data = await fs.readFile(global.fileName, 'utf-8');
    const json = JSON.parse(data)

    const listafuncionarios = json.funcionarios
    const funcionarios = listafuncionarios.find(a => a.id == req.params.id)

    if(funcionarios)
      res.send(funcionarios)
    else
     res.status(404).end()
});

router.post('/setor/:nome/Func', async (req, res) => {// cadastrar funcionario
    let funcionarios = req.body;

    const data = await fs.readFile(global.fileName, 'utf-8');
    let json = JSON.parse(data);

    funcionario = {id: json.nextId, ...funcionario};
    json.funcionarios.push(funcionario)
    json.nextId++;

    await fs.writeFile(global.fileName, JSON.stringify(json))

    res.send(json)

});

router.delete('/:id', async (req, res) => {//excluir funcionario
    const data = await fs.readFile(global.fileName, 'utf-8');
    let json = JSON.parse(data);

    let listafuncionarios = json.funcionarios
    listafuncionarios = listafuncionarios.filter(a => a.id != req.params.id)

    json.funcionarios = listafuncionarios

    await fs.writeFile(global.fileName, JSON.stringify(json))
     
    res.send(json)

});


router.put('/:id', async (req, res) => {//atualizacao 
    const data = await fs.readFile(global.fileName, 'utf-8');
    let json = JSON.parse(data);
    
    let listafuncionarios = json.funcionarios
    const index = listafuncionarios.findIndex(a => a.id == req.params.id)
    listafuncionarios[index] = req.body
    json.funcionarios = listafuncionarios
    await fs.writeFile(global.fileName, JSON.stringify(json))
     
    res.send(json)

});

router.get('/funcionario/autor/:nome', async (req, res) => { 
    const data = await fs.readFile(global.fileName, 'utf-8');
    let json = JSON.parse(data);

    const listafuncionarios = json.funcionarios
    const funcionarios = listafuncionarios.find(a => a.id == req.params.id)

    if(funcionarios)
      res.send(funcionarios)
    else
     res.status(404).end()
   
});

router.get('/funcionario/:titulo', async (req, res) => { 
    const data = await fs.readFile(global.fileName, 'utf-8');
    let json = JSON.parse(data);


    
});


router.get('/funcionario/ano/:ano', async (req, res) => { 
    const data = await fs.readFile(global.fileName, 'utf-8');
    let json = JSON.parse(data);


    
});

module.exports = router;

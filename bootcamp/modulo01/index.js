const express = require('express'); //Comando de Import do express

const server = express(); //Instânciando o objeto express

server.use(express.json()); //Import para o uso de JSON

//requisição para o servidor
//req => é todos os dados da requisição
//res => é todas as informações, que são necessarias p/ retornar uma resposta para o cliente



//localhost:3000/teste

/* 
 Exemplo Aula 05 - F2
server.get('/teste', (req,res) =>{
    return res.json({message :  'Hello World'});
})
*/

//Query params = ?teste=1
//Route params = /users/1
//Request body = { "name" : "Diego", "email" : "diego@rocketseat.com.br" }


/*
 Exemplo Aula 06 - F02 - Consumindo Query Params
server.get('/teste', (req, res) => {

    const nome = req.query.nome;

    return res.json({message: `Hello ${nome}`});

}) 
*/


/*
//Exemplo Aula 06 - F02 - Consumindo Rout Params
//localhost:3000/users/1234 => id

server.get('/users/:id', (req,res) => {

    const { id } = req.params;

    return res.json({message:`Buscando o usuário ${id}`});

})
*/


/*
//Exemplo Aula 07 - F2 - Insomnia

const users = ['Diego', 'Robson' , 'Victor'];

server.get('/users/:index', (req,res) =>{
    const { index } = req.params;

    return res.json(users[index]);
})
*/


/*
// Aula 09 - F2 - CRUD
//CRUD - Create, Read, Update, Delete

const users = ['Diego', 'Robson', 'Victor'];


//Rota GET para retornar todos os usuários
server.get('/users', (req, res) => {

    return res.json(users); //Retorna o array de usuários em formato JSON

});

//Rota GET para retornar um usuário específico dentro do array
server.get('/users/:index', (req,res) => {
    const { index} = req.params;

    return res.json(users[index]); //Retorna um usuário específico do array de usuários
});

//Rota POST para adicionar um usuário.
server.post('/users', (req, res) => {
    const { name } =  req.body;

    users.push(name); //Método push para adicionar um "nome" ao array de usuários

    return res.json(users); //Retorna o array de usuários em formato JSON
});

//Rota PUT para editar um usuário
server.put('/users/:index', (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    users[index] = name; 

    return res.json(users);

});

//Rota DEELTE para deletar um usuário.
server.delete('/users/:index', (req, res) => {
    const { index } = req.params;

    users.splice(index, 1 ) //Metódo para deletar um elemento de um array. No caso um elemento do array users.
 
    return res.send();

});

server.listen(3000);

*/

//Aula 10 - Middlewares 

const users = ['Diego', 'Robson', 'Victor'];


//Middleware Global
server.use((req,res, next) => {

    console.time('Request');

    console.log(`Método: ${req.method}; URL: ${req.url}`);
    next(); //Função para a requisição 'passar' do middleware

    console.timeEnd('Request')
});

//Middleware local para checar se nas rotas PUT de editar ou POST de adicionar o usuário na requisição existe existe
function checkUserExists (req, res, next) {
    if(!req.body.name){
        return res.status(400).json({ error: 'User name is required'})
    }

    return next(); //Função para a requisição 'passar' do middleware
}

//Middleware local
function checkUserInArray(req, res, next) {

    const user = users[req.params.index];
    
    if (!user) {
        return res.status(400).json({ error: 'User does not exits' })
    }

    req.user = user;

    return next(); //Função para a requisição 'passar' do middleware

}

server.get('/users', (req,res) => {

    return res.json(users)
});

server.get('/users/:index', checkUserInArray, (req,res) => {

   
    return res.json(req.user);

})

server.post('/users', checkUserExists, (req,res) => {

    const { name } = req.body;

    users.push(name);

    return res.json(users);
})

server.put('/users/:index', checkUserExists, checkUserInArray, (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    users[index] = name;

    return res.json(users);
})

server.delete('users/:index', checkUserInArray, (req,res) => {
    const { index } = req.params;

    users.slice(index, 1);

    return res.send;
})  

server.listen(3000);
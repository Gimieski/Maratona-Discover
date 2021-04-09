// precisamos criar uma conexão entre servidor e banco de dados
const sqlite3=require('sqlite3')
const { open }=require('sqlite')
//Com as chaves, podemos ir la dentro do pacote e pegar algo em especifico

module.exports=()=>{
    open({
    filename:'./database.sqlite',
    driver:sqlite3.Database
});
}
/* open é a função que vai abrir a conexão.Mas nos precisamos exportar para o servidor né, então usamos module exports.
Porem, o opne só aceita ser envolvido por uma função, então usamos arrow function
*/
// filename, ou seja, qual o arquivo do banco de dados?
// drive, ou seja qual serviço de banco de dados?

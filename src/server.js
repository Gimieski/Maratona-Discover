// recebe o express
const express=require("express");
//Armazena a execução do express
const server=express();
// Depois de exportar o arquivo da rota, pegamos ele aqui
const routes=require("./routes.js");

server.set("view engine", 'ejs')

//Cria rotas para cada arquio.habilita arquivos staticos(os publicos)
server.use(express.static("public"));

server.use(routes);
// pra que a organização das rotas funcione, ela executa em todo o server

server.listen(3000,()=>{
    console.log("Server is Runnning");
})
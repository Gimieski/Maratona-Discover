// recebe o express
const { urlencoded } = require("express");
const express=require("express");
//Armazena a execução do express
const server=express();
// Depois de exportar o arquivo da rota, pegamos ele aqui
const routes=require("./routes.js");

// Seta uma configuração em todo o arquivo. Muito similar ao use() que seta um codigo para todo o arquivo
server.set("view engine", 'ejs');

//Com isso, todo o arquivo vai pode usar esses arquivos(os publicos), apartir de rotas
server.use(express.static("public"));

//urlencoded é um middlware(como tudo que é usado no use) que ativa parametros de url, como por ex: Ativa o requisição do body
server.use(express.urlencoded({extended:true}))

server.use(routes);
// pra que a organização das rotas funcione, ela executa em todo o server

server.listen(3000,()=>{
    console.log("Server is Runnning");
})
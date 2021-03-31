const express=require("express")
const routes=express.Router();

const views= __dirname+"/views/"
// pagina inicial, ou seja, não tem arquivo para colocar então é só / . Outro ponto, é que não precisamos do return, o response ja esta retornando algo !

const profile={
   name:'Gabriel',
   avatar:'https://avatars.githubusercontent.com/u/38919411?v=4',
   "monthly-budget":3000,
   "days-per-week":5,
   "hours-per-day":5,
   "vacation-per-year":4
}

// 

routes.get('/',(req,res)=>{
   res.render(views+"index");
})
routes.get('/job',(req,res)=>{
    res.render(views+"job");
 })
 routes.get('/job/edit',(req,res)=>{
    res.render(views+"job-edit");
 })
 routes.get('/profile',(req,res)=>{
    res.render(views+"profile",{profile});
 })


module.exports=routes;
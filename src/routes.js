const express=require("express")
const routes=express.Router();
const ProfileController=require('./controllers/ProfileController')
const JobController=require('./controllers/JobController');
const DashboardController = require("./controllers/DashboardController");
// pagina inicial, ou seja, não tem arquivo para colocar então é só / . Outro ponto, é que não precisamos do return, o response ja esta retornando algo !


routes.get('/',DashboardController.index)

routes.get('/job',JobController.create)

routes.post('/job',JobController.save)

routes.get('/job/:id',JobController.show)
routes.post('/job/:id',JobController.update)

routes.get('/profile',ProfileController.index)

routes.post('/profile',ProfileController.update)

routes.post('/job/delete/:id', JobController.delete)



module.exports=routes;
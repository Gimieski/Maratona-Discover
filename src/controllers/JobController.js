const Job=require('../model/Job')
const Jobutils=require('../utils/jobUtils')
const Profile=require('../model/Profile')
const jobUtils = require('../utils/jobUtils')

module.exports={
    async save(req,res){
      await Job.save({
         name:req.body.name,
         'daily-hours':req.body['daily-hours'], 
         'total-hours': req.body['total-hours'],
         createdAt:Date.now()
         //puxa os dados do formulario e coloca no JOb(isso acontece porque conectamos ele atraves da rpota e mesmo metodo. alem do name do formulario), ai no index vai ter que criar um novo html para ele com essas infromações, pois tem um forEach e escrever para cada itrm
      })     

    return res.redirect("/")

    },
    async show(req,res){
       //Função para job-edit. Ela tem que levar as informações do job atual para a tela de editar 
       const jobId=req.params.id
       const jobs=await Job.get();
       const profile=await Profile.get();

       const job=jobs.find(job=>Number(job.id)===Number(jobId))
       // não colocar chaves
       if(!job){
          return res.send("Job not found!")
       }

       job.budget=jobUtils.calculateBudget(job,profile['value-hour'])
       //ele vai responder com a pagina+os dados do job(porem precisa ser um job especifico, ja que não queremos editar todos(ai informamos pelo id))
       //Para isso, vamos passar o id na rota para pegarmos ele. ent /job/:id e ja troca todos os links. E vamos criar um jeito de identificar o id
       return res.render("job-edit",{job})
    },
    async update(req,res){
       const jobId=req.params.id;

       const UpdatedJob={
          name:req.body.name,
          "total-hours":req.body["total-hours"],
          "daily-hours":req.body["daily-hours"],
       }
// aqui ja alteramos, depois passamos par ao banco de dados
       await Job.update(UpdatedJob, jobId)
       
       res.redirect('/job/'+jobId)

    },
    create(req,res){
       return res.render("job");
    },
    async delete(req,res){
       const jobId=req.params.id;

       await Job.delete(jobId);

    //filter(filtrar)ele filtra a condição falsa. No caso eu quero um diferente do id. O id digitado é diferente do id da rota? não ent filtra
       return res.redirect('/')
    }
}
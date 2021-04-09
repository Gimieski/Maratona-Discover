const Job=require('../model/Job')
const Jobutils=require('../utils/jobUtils')
const Profile=require('../model/Profile')
const jobUtils = require('../utils/jobUtils')

module.exports={
    save(req,res){
       const jobs=Job.get()
       const lastId=jobs[jobs.length -1]?.id || 0
       //ele pega os elementos dentro de jobs e então da -1 ja que começa de 0 e então pega o id desse elemento(pega o ultimo elemento dai)
       
       Job.save({
         id:lastId +1,
         name:req.body.name,
         'daily-hours':req.body['daily-hours'], 
         'total-hours': req.body['total-hours'],
         createdAt:Date.now()
         //puxa os dados do formulario e coloca no JOb(isso acontece porque conectamos ele atraves da rpota e mesmo metodo. alem do name do formulario), ai no index vai ter que criar um novo html para ele com essas infromações, pois tem um forEach e escrever para cada itrm
      })     

    return res.redirect("/")

    },
    show(req,res){
       //Função para job-edit. Ela tem que levar as informações do job atual para a tela de editar 
       const jobId=req.params.id
       const jobs=Job.get();
       const profile=Profile.get();

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
    update(req,res){
       const jobId=req.params.id;
       const jobs=Job.get();
       const job=jobs.find(job=> Number(job.id)===Number(jobId))

       if(!job){
          return res.send("Job not found")
       }

       const UpdatedJob={
          ...job,
          name:req.body.name,
          "total-hours":req.body["total-hours"],
          "daily-hours":req.body["daily-hours"],
       }

       const newJobs=jobs.map(job=>{
          if(Number(job.id)=== Number(jobId)){
             job=UpdatedJob
          }
          return job
       })

       Job.update(newJobs)
       
       res.redirect('/')

    },
    create(req,res){
       return res.render("job");
    },
    delete(req,res){
       const jobId=req.params.id;

       Job.delete(jobId);

    //filter(filtrar)ele filtra a condição falsa. No caso eu quero um diferente do id. O id digitado é diferente do id da rota? não ent filtra
       return res.redirect('/')
    }
}
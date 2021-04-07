const express=require("express")
const routes=express.Router();

const views= __dirname+"/views/"
// pagina inicial, ou seja, não tem arquivo para colocar então é só / . Outro ponto, é que não precisamos do return, o response ja esta retornando algo !

const Profile={
   data:{
   name:'Gabriel',
   avatar:'https://avatars.githubusercontent.com/u/77447947?v=4',
   "monthly-budget":3000,
   "days-per-week":5,
   "hours-per-day":5,
   "vacation-per-year":4,
   "value-hour":75
   },
   controllers:{
      index(req,res){
         return res.render(views+"profile",{profile:Profile.data});
         // ele renderiza os dados do profile, por issoq aundo colocamos no index, ele consegue adapta
      },
      update(req,res){
         // req.body: pega quantas semans quero de ferias
         const data=req.body;
         // definir quantas semnas por ano
         const weeksPerYear=52;
         // remover semanas de ferias, para pegar quantas semanas tem em 1 mês 
         const weeksPerMouth=(weeksPerYear -data["vacation-per-year"]) /12 

         // "quantas horas por semana" vamos fazer o calculo onde horas por dia vezes dias de semana, ai conseguiremos quanto trabalharemos por semena
         const weekTotalHours=data["hours-per-day"]*data["days-per-week"]
         // horas trabalhadas no mes
         const monthlyTotalHours=weekTotalHours*weeksPerMouth
           
         // 40 horas por mes / 3000 mil reais que quero ganhar, então é 75 horas por mes
         const valueHour=data["monthly-budget"]/monthlyTotalHours
         
         Profile.data={
           ...Profile.data,
           ...req.body,
           "value-hour":valueHour
         }   
         
         return res.redirect('/profile')   
      }
      
   }
}

const Job={
   data:[
      {
         id:1, 
         name:"Pizzaria Guloso",
         'daily-hours':2, 
         'total-hours': 10,
         createdAt:Date.now()
       },
       {
         id:2, 
         name:"OneTwo Project",
         'daily-hours':3, 
         'total-hours': 47,
         createdAt:Date.now()
       }
   ],
   controllers:{
      index(req,res){
            //Vamos fazer os calculos aqui, pois sempre que atualizarmos a pagina podemos mostrar um calculo novo quando editado
            const updatedJobs=Job.data.map((job)=>{
            //pega o valor do formulario de total de horas, dividido pelas horas por dia. Usaremos isso para somar pela data do projeto
                  const remaining=Job.services.remainingDays(job) 
                  const status=remaining<=0 ? 'done' : 'progress'
            
                  return {
                     ...job,
                     remaining,
                     status,
                     budget:Job.services.calculateBudget(job,Profile.data['value-hour'])
                  }
               })
               
            res.render(views+"index",{jobs:updatedJobs});
      },
      save(req,res){
         const lastId=Job.data[Job.data.length -1]?.id || 0
      //ele pega os elementos dentro de jobs e então da -1 ja que começa de 0 e então pega o id desse elemento(pega o ultimo elemento dai)
         Job.data.push({
            id:lastId +1,
            name:req.body.name,
            'daily-hours':req.body['daily-hours'], 
            'total-hours': req.body['total-hours'],
            createdAt:Date.now()
      //puxa os dados do formulario e coloca no JOb, ai no index vai ter que criar um novo html para ele com essas infromações, pois tem um forEach e escrever para cada itrm
         })
      return res.redirect("/")

      },
      show(req,res){
         //Função para job-edit. Ela tem que levar as informações do job atual para a tela de editar 
         const jobId=req.params.id

         const job=Job.data.find(job=>Number(job.id)===Number(jobId))
         // não colocar chaves
         if(!job){
            return res.send("Job not found!")
         }

         job.budget=Job.services.calculateBudget(job,Profile.data['value-hour'])
         //ele vai responder com a pagina+os dados do job(porem precisa ser um job especifico, ja que não queremos editar todos(ai informamos pelo id))
         //Para isso, vamos passar o id na rota para pegarmos ele. ent /job/:id e ja troca todos os links. E vamos criar um jeito de identificar o id
         return res.render(views+"job-edit",{job})
      },
      update(req,res){
         const jobId=req.params.id
         const job=Job.data.find(job=> Number(job.id)===Number(jobId))

         if(!job){
            return res.send("Job not found")
         }

         const UpdatedJob={
            ...job,
            name:req.body.name,
            "total-hours":req.body["total-hours"],
            "daily-hours":req.body["daily-hours"],
         }

         Job.data=Job.data.map(job=>{
            if(Number(job.id)=== Number(jobId)){
               job=UpdatedJob
            }
            return job
         })
         
         res.redirect('/')

      },
      create(req,res){
         return res.render(views+"job");
      },
      delete(req,res){
         const jobId=req.params.id

         Job.data=Job.data.filter(job=> Number(job.id) !== Number(jobId))

      //filter(filtrar)ele filtra a condição falsa. No caso eu quero um diferente do id. O id digitado é diferente do id da rota? não ent filtra
         return res.redirect('/')
      }
   },
   services:{
      remainingDays(job){
         const remainingDays=(job['total-hours'] / job['daily-hours']).toFixed( )
         /*toFixed fixa um valor inteiro.Obs: Vai retorna um obj. Dias restantes porque com o total de horas dividido por horas por dia, conseguimos 
         calcular o tempo que vai demorar. Porque por ex: 2 horas, no total de 20horas é 10 dias! porque precisaremos de 10 dias
         */
               const createdDate=new Date(job.createdAt)
         // vai cirar uma data de acordo com a data que foi criada a data do projeto(ja que foi date.now la)
               
               const dueDay=createdDate.getDate()+Number(remainingDays)
         //dia para vencimento do projeto. Ele vai pega a data criada do projeto mais o dias estimada(que ai o criador era para acabar)
               const dueDateInMS=createdDate.setDate(dueDay)
         //aplicamos a cadat de vencimento. Isso retornará os milissegundos la
         
               const timeDiffInMs=dueDateInMS-Date.now()
      
         //transofrmar mili em dias. Onde pegamos os milisegundos, pegamos os segundos e minutos e dias e multuiplicamos
               const dayInMs=1000*60*60*24
               const dayDiff=Math.floor(timeDiffInMs / dayInMs)
              
               // restam tais dias
               return dayDiff
      },
      calculateBudget:(job,valueHour)=>valueHour * job["total-hours"]
      // um serviço para calcular o valor da hora
   }
}


routes.get('/',Job.controllers.index)

routes.get('/job',Job.controllers.create)

routes.post('/job',Job.controllers.save)

routes.get('/job/:id',Job.controllers.show)
routes.post('/job/:id',Job.controllers.update)

routes.get('/profile',Profile.controllers.index)

routes.post('/profile',Profile.controllers.update)

routes.post('/job/delete/:id', Job.controllers.delete)



module.exports=routes;
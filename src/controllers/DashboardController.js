const Job=require("../model/Job");
const Profile=require("../model/Profile");
const Jobutils=require("../utils/jobUtils");

module.exports={
    index(req,res){
      const jobs=Job.get()
      const profiles=Profile.get()
      //Vamos fazer os calculos aqui, pois sempre que atualizarmos a pagina podemos mostrar um calculo novo quando editado
      
      let statusCount={
        progress:0,
        done:0,
        total:jobs.length
      }
      // total de horas de cada porjeto em progress
      
      let jobTotalHours=0;

      const updatedJobs=jobs.map((job)=>{
      //pega o valor do formulario de total de horas, dividido pelas horas por dia. Usaremos isso para somar pela data do projeto
            const remaining=Jobutils.remainingDays(job) 
            const status=remaining<=0 ? 'done' : 'progress'

            // statusCount[done] tem porpriedade DONE
            // Somando a quantidade de status
            statusCount[status]+=1;
            // passando o status como referencia. Ou seja, quando statusCount for done, ele vai ver qual propriedade tem done no nome e adiciona +1 ai vai subir o valor
            // jobTotalHours=status=='progress'? jobTotalHours+=Number(job['daily-hours']) : jobTotalHours
            // condição+simbolo de if(?) se não(:)
            if(status=='progress'){
              jobTotalHours+=Number(job['daily-hours'])
            }

            return {
               ...job,
               remaining,
               status,
               budget:Jobutils.calculateBudget(job,profiles['value-hour']) 
            }
        })

        // precisamos saber o total de horas de cada job e quantas horas eu quero trabalhar por dia(profile) para saber quantas horas eu tenho no dia
        // com isso, vamos subtrair esses valores(menos os encerrados)
        
        const freeHours=profiles['hours-per-day'] - jobTotalHours
         
        res.render("index",{jobs:updatedJobs,profile:profiles, statusCount:statusCount, freeHours:freeHours});
    }
}
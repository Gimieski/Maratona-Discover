module.exports={
    remainingDays(job){
      const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
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
             const dayDiff=Math.ceil(timeDiffInMs / dayInMs)
            
             // restam tais dias
             return dayDiff
    },
    calculateBudget:(job,valueHour)=>valueHour * job["total-hours"]
    // um serviço para calcular o valor da hora
 }
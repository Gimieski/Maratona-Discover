const Profile=require('../model/Profile')

module.exports={
    index(req,res){
       return res.render("profile",{profile:Profile.get()});
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
       
       Profile.update({
            ...Profile.get(),
         ...req.body,
         "value-hour":valueHour
       })
    
       return res.redirect('/profile')   
    }
    
 }
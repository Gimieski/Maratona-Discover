const Database=require("../db/config");


module.exports= {
    async get(){
        const db=await Database();  

        const data=await db.get(`SELECT * FROM profile`)

        await db.close()

        return {
            name:data.name,
            avatar:data.avatar,
            "monthly-budget":data.monthly_budget,
            "days-per-week":data.days_per_week,
            "hours-per-day":data.hours_per_day,
            "vacation-per-year":data.vacation_per_year,
            "value-hour":data.value_hour
        }

        
    },
    // newProfile pega os dados
    async update(newProfile){
        const db=await Database();

        db.run(`UPDATE profile SET 
        name="${newProfile.name}",
        avatar="${newProfile.avatar}",
        monthly_budget=${newProfile["monthly-budget"]},
        days_per_week=${newProfile["days-per-week"]},
        hours_per_day=${newProfile["hours-per-day"]},
        vacation_per_year=${newProfile["vacation-per-year"]},
        value_hour=${newProfile["value-hour"]}
        `)

        await db.close()
    //    pega os dados e substitui pelos outros dados
    }
}
const Database=require('../db/config')

 module.exports={
    async get(){
        const db=await Database();

        const jobs=await db.all(`SELECT * FROM jobs`);

        await db.close()

        //Usamos o map, pois recebemos um array. E com isso vamos executar para cada item
        return jobs.map(job=>({
                id:job.id,
                name:job.name,
                "daily-hours":job.daily_hours,
                "total-hours":job.total_hours,
                createdAt:job.createdAt
                // return anonimo
            }
        ))
    },
    async update(UpdatedJob,jobId){
        const db=await Database();

        await db.run(`UPDATE jobs SET 
        name="${UpdatedJob.name}",
        daily_hours=${UpdatedJob["daily-hours"]},
        total_hours=${UpdatedJob["total-hours"]}
        WHERE id = ${jobId}
        `)

        await db.close()
    },
    async delete(id){
       const db=await Database()
    
       await db.run(`DELETE FROM jobs WHERE id = ${id}`)
    },
    async save(newJob){
        const db= await Database();

        await db.run(`INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            createdAt
        ) VALUES (
            "${newJob.name}",
            ${newJob["daily-hours"]},
            ${newJob["total-hours"]},
            ${newJob.createdAt}
        )`);

        await db.close()
        
    }
 }
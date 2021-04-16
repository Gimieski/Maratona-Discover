//setar coisas para iniciar.Obs: só inicia uma vez
const Database=require('./config');
// a gente pego o open, que criou esse config.No caso a conexão

const initDb={
    async init(){

const db=await Database();
// abrindo a conexão, e espera abrir a conexão(que vai ficar criar o arquivo database.sql e ativar o driver)e depois vai por proximo codigo

// executa as tabelas,diz pro proximo codigo esperar acabar para executar
await db.exec(`CREATE TABLE profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    avatar TEXT,
    monthly_budget INT,
    days_per_week INT,
    hours_per_day INT,
    vacation_per_year INT,
    value_hour INT
)`)

await db.exec(`CREATE TABLE jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    daily_hours INT,
    total_hours INT,
    createdAt DATETIME
)`)
// database exec executa as tabelas, onde ele identifica uma tabel com craze(``) e CREATE TABLE

//Rodar as tabelas
await db.run(`INSERT INTO profile (name,
    avatar,
    monthly_budget,
    days_per_week,
    hours_per_day,
    vacation_per_year,
    value_hour
)VALUES(
    "Gabriel",
    "https://avatars.githubusercontent.com/u/77447947?s=400&v=4",
    3000,
    5,
    5,
    4,
    70
);`)

await db.run(`INSERT INTO jobs(
    name,
    daily_hours,
    total_hours,
    createdAt
)VALUES(
    "Pizzaria Guloso",
    2,
    1,
    1617514376018
);`)

await db.run(`
INSERT INTO jobs(
    name,
    daily_hours,
    total_hours,
    createdAt
)VALUES(
    "OneTwo Projects",
    3,
    47,
    1617514376018
);`)



await db.close();
    }
}

initDb.init()
// como o js le sempre primeiro as funçoes, ele viu que tem que executar o init
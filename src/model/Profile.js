let data={
    name:'Gabriel',
    avatar:'https://avatars.githubusercontent.com/u/77447947?v=4',
    "monthly-budget":3000,
    "days-per-week":5,
    "hours-per-day":5,
    "vacation-per-year":4,
    "value-hour":75
}


module.exports={
    get(){
        return data
    },
    // newProfile pega os dados
    update(newProfile){
       data=newProfile
    //    pega os dados e substitui pelos outros dados
    }
}
function getTime(input){
    let createdTime = input.updatedAt
    let nowTime = new Date()
    let selisihHari = nowTime.getDay() - createdTime.getDay()
    let selisihJam = nowTime.getHours() - createdTime.getHours()
    let selisihMenit = nowTime.getMinutes() - createdTime.getMinutes()
    
    if(selisihHari === 1  && selisihJam > 0){
        return `${selisihHari} day ago`
    }
    else if(selisihHari === 1  && selisihJam < 0){
        return `${selisihJam + 24} hours ago`
    }
    else if(selisihHari > 1){
        return `${selisihHari} day ago`
    }
    
    if(selisihJam === 1 && selisihMenit < 0 && selisihHari === 0){
        return `${selisihMenit + 60} minutes ago`
    }
    else if(selisihJam === 1 && selisihMenit >= 0 && selisihHari === 0){
        return `${selisihJam} hours ago`
    }
    else if(selisihJam === 0 && selisihHari === 0){
        return `${selisihMenit} minutes ago`
    }
    else if(selisihJam > 1 && selisihHari === 0){
        return `${selisihJam} hours ago`
    }
}

module.exports = getTime
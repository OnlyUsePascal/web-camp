function getDate(){
    let weekDay = new Date().getDay();
    let dayList = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let dayOptions = {
        year: 'numeric',
        day: 'numeric',
        month: 'long',
    };
    
    return (new Date()).toLocaleDateString('en-US', dayOptions);
    
}

function getDay(){
    let weekDay = new Date().getDay();
    let dayList = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let dayOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
    };
    
    return (new Date()).toLocaleDateString('en-US', dayOptions);
}

exports.getDate = getDate;
exports.getDay = getDay;

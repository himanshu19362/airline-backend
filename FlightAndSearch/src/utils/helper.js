const compareTime = (dateTime1 , dateTime2)=>{
    let date1 = new Date(dateTime1).getTime();
    let date2 = new Date(dateTime2).getTime();
    return date1 < date2;
}

module.exports = {
    compareTime
}
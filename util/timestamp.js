module.exports = () => {
    let d = new Date();
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"
        , "Aug", "Sept", "Oct", "Nov", "Dec"];
    let day = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    let date = d.getDate();
    let short = date == 1 ? "st '" : date == 2 ? "nd '" : date == 3 ? "rd '" : "th '";
    const timeStamp = day[d.getDay()] + "," + months[d.getMonth()] + " " +
        date + short + d.getFullYear().toString().slice(2, 4);
    return timeStamp;
}
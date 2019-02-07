module.exports = {

  getKoreanDate: (timestamp) => {
    const time = new Date(timestamp);
    let hour = time.getHours();
    const AMPM = hour >= 12 ? '오전' : '오후';
    hour = hour % 12;
    const minute = time.getMinutes();
    const fullTime = AMPM + " " + hour + ":" + (minute <= 10 ? '0' + minute : minute);

    return fullTime;
  } 
}
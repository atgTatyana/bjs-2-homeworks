class AlarmClock {
  constructor() {
    this.alarmCollection = [];
    this.intervalId = null;
  }
  
  addClock(time, callback) {
    if (!time || !callback) {
      throw new Error('Отсутствуют обязательные аргументы');
    }
    if (this.alarmCollection.some(alarm => alarm.time === time)) {
      console.warn('Уже присутствует звонок на это же время');
    }
    this.alarmCollection.push({
      callback,
      time,
      canCall: true
    });
  }
  
  removeClock(time) {
    this.alarmCollection = this.alarmCollection.filter(alarm => alarm.time !== time);
  }
  
  getCurrentFormattedTime() {
    let nowDate = new Date();
    let min = nowDate.getMinutes().toString().length === 1 ? '0' + nowDate.getMinutes() : nowDate.getMinutes();
    let hour = nowDate.getHours().toString().length === 1 ? '0' + nowDate.getHours() : nowDate.getHours();
    return hour + ':' + min;
  }
  
  start() {
    if (this.intervalId) {
      return;
    }
    this.intervalId = setInterval(() => {
      this.alarmCollection.forEach(alarm => {
        if (alarm.time === this.getCurrentFormattedTime() && alarm.canCall === true) {
          alarm.canCall = false;
          alarm.callback();
        }
      })
    }, 1000);
  }
  
  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }
  
  resetAllCalls() {
    this.alarmCollection.forEach(alarm => alarm.canCall = true);
  }
  
  clearAlarms() {
    this.stop();
    this.alarmCollection = [];
  }
}


// let alarmFunction = () => console.log('alarm');
// let alarm = new AlarmClock();
// alarm.addClock('15:29', alarmFunction);
// alarm.addClock('22:00', alarmFunction);
// console.log(alarm);
// alarm.removeClock('22:00');
// console.log(alarm);
// console.log(alarm.getCurrentFormattedTime());
// alarm.start();
// alarm.stop();
// alarm.resetAllCalls();
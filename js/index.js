$(document).ready(function(){
  var isCountingDown = false;
  var timeinterval;
  var activeSession='Session';

  $('#reduceBreak').on('click',function(){
    if(isCountingDown===false){
      var breakLength = $('#breakLength').html();
      if(breakLength>1){
        breakLength--;
      }
      $('#breakLength').html(breakLength);
      if(activeSession==='Break'){
        $('#countdownText').html(breakLength);
      }
    }
  });

  $('#addBreak').on('click',function(){
    if(isCountingDown===false){
      var breakLength = $('#breakLength').html();
      breakLength++;
      $('#breakLength').html(breakLength);
      if(activeSession==='Break'){
        $('#countdownText').html(breakLength);
      }
    }
  });

  $('#reduceSession').on('click',function(){
    if(isCountingDown===false){
      var sessionLength = $('#sessionLength').html();
      if(sessionLength>1){
        sessionLength--;
      }
      $('#sessionLength').html(sessionLength);
      if(activeSession==='Session'){
        $('#countdownText').html(sessionLength);
      }
    }
  });

  $('#addSession').on('click',function(){
    if(isCountingDown===false){
      var sessionLength = $('#sessionLength').html();
      sessionLength++;
      $('#sessionLength').html(sessionLength);

      if(activeSession==='Session'){
        $('#countdownText').html(sessionLength);
      }

    }
  });

  $('#sessionCountdown').on('click',function(){
    if(isCountingDown===true){
      if(timeinterval){
        clearInterval(timeinterval);
      }
      isCountingDown=false;
    }else{
      initializeClock();
      isCountingDown = true;
    }
  });

  function switchCountdown(){
    console.log($('#sessionType').val());
    if($('#sessionType').html()==='Session'){
      $('#sessionType').html('Break!');
      $('#countdownText').html($('#breakLength').html());
      activeSession='Break';
      initializeClock();
    }else{
      $('#sessionType').html('Session');
      $('#countdownText').html($('#sessionLength').html());
      activeSession='Session';
      initializeClock();
    }
  }

  function getTimeRemaining(endTime){
    var t = Date.parse(endTime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      'total':t,
      'days':days,
      'hours':hours,
      'minutes':minutes,
      'seconds':seconds
    };
  }

  function initializeClock() {
    var currentTime = new Date();
    var hours = getRemainingHours();
    var minutes = getRemainingMinutes();
    var seconds = getRemainingSeconds();
    var endtime = addHours(currentTime,hours);
    endtime = addMinutes(endtime,minutes);
    endtime = addSeconds(endtime,seconds);
    function updateClock() {
      var t = getTimeRemaining(endtime);
      var hrs = ('0' + t.hours).slice(-2);
      var min =('0' + t.minutes).slice(-2);
      var secs = ('0' + t.seconds).slice(-2);

      if(t.hrs>0){
        $('#countdownText').html(hrs + ':' + min + ':' + secs);
      }else{
        $('#countdownText').html(min + ':' + secs);
      }

      if (t.total <= 0) {
        clearInterval(timeinterval);
        switchCountdown();
      }
    }

    updateClock();
    timeinterval = setInterval(updateClock, 1000);
  }

  function getRemainingHours(){
    var remainingTime = $('#countdownText').html();
    if(remainingTime.indexOf(':')===-1){
      return 0;
    }else{
      var colonCount=0;
      for(i=0;i<remainingTime.length;i++){
        if(remainingTime.charAt(i)===':'){
          colonCount++;
        }
      }
      if(colonCount===2){
        return remainingTime.substr(0,remainingTime.indexOf(':'));
      }else{
        return 0;
      }
    }
  }

  function getRemainingMinutes(){
    var remainingTime = $('#countdownText').html();
    if(remainingTime.indexOf(':')===-1){
      return remainingTime;
    }else{
      var colonCount=0;
      for(i=0;i<remainingTime.length;i++){
        if(remainingTime.charAt(i)===':'){
          colonCount++;
        }
      }
      if(colonCount==1){
        return remainingTime.substr(0,remainingTime.indexOf(':'));
      }else{
        return remainingTime.substr(remainingTime.indexOf(':')+1,2);
      }
    }
  }

  function getRemainingSeconds(){
    var remainingTime = $('#countdownText').html();
    if(remainingTime.indexOf(':')===-1){
      return 0;
    }else{
      return remainingTime.substr(remainingTime.lastIndexOf(':') + 1);
    }
  }

  function addHours(date,hours){
    date.setHours(date.getHours() + Number(hours));
    return date;
  }

  function addMinutes(date,minutes){
    date.setMinutes(date.getMinutes() + Number(minutes));
    return date;
  }

  function addSeconds(date,seconds){
    date.setSeconds(date.getSeconds() + Number(seconds));
    return date;
  }

});
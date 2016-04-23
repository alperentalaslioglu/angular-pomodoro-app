app.controller('TimerController',['$scope','$interval',function($scope,$interval){

  // Properties of progress circle
  $scope.size = 300;
  $scope.progress = 1;
  $scope.strokeWidth = 20;
  $scope.stroke = '#fff';
  $scope.counterClockwise = true;

  // Initial Counter values
  $scope.counter = 25 * 60;
  $scope.initVal = 25 * 60;

  // How many pomodoro and break taken
  $scope.takenPomodoros = 0;
  $scope.takenShortBreaks = 0;
  $scope.takenLongBreaks = 0;

  // Current pomodoro
  $scope.current = "pomodoro";

  // starts the timer
  $scope.start = function() {
    // stops any running interval to avoid two intervals running at the same time
    $scope.stop();
    // timer promise
    timer = $interval(function() {
      $scope.counter--;
      $scope.progress = $scope.counter / $scope.initVal;
      if($scope.counter === 0){
        $scope.stop();
        $scope.progress = 1;
        var audio = new Audio('assets/sound/bell.mp3');
        audio.play();
        $scope.updateCounters();
      }
    }, 1000);
  };

  // stops the timer
  $scope.stop = function() {
    $interval.cancel(timer);
  };

  // reset the timer
  $scope.reset = function(){
    $scope.stop();
    $scope.counter = $scope.initVal;
    $scope.progress = 1;
  };

  // pomodoro choices
  $scope.startTimer = function(time,timerType) {
    $scope.current = timerType;
    $scope.stop();
    $scope.counter = time * 60;
    $scope.initVal = time * 60;
    $scope.progress = 1;
    $scope.start();
  };

  $scope.updateCounters = function(){
    if($scope.current === "pomodoro"){
      $scope.takenPomodoros++;
    }else if($scope.current === "short-break"){
      $scope.takenShortBreaks++;
    }else if($scope.current === "long-break"){
      $scope.takenLongBreaks++;
    }
  };

}]);


// Filtering seconds to minute:second format
app.filter('timeFilter', function () {
  return function (seconds) {
      var minutes = parseInt(seconds / 60);
      seconds %= 60;
      // digit check for counter
      seconds = (seconds < 10 ? 0 + "" + seconds : seconds)
      minutes = (minutes < 10 ? 0 + "" + minutes : minutes)
      return minutes + ":" + seconds;
  };
});

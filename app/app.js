var app = angular.module('pomodoroApp',['ngRoute']);

app.config(['$routeProvider',function($routeProvider){
	$routeProvider
	.when('/',{templateUrl: 'app/views/timer.html',controller: 'TimerController'})
	.otherwise({redirectTo: '/'});
}]);

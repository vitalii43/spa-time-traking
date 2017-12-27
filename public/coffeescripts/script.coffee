
scotchApp = angular.module('scotchApp', ['ngRoute',"chart.js"]);

scotchApp.config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider)->
  $locationProvider.html5Mode({
    enabled: true
    requireBase: false
  });

  $routeProvider
  .when('/', {
    templateUrl : 'pages/home.html'
    controller  : 'mainController'
  })

  .when('/settings', {
    templateUrl : 'pages/settings.html'
    controller  : 'settingsController'
  })

  .when('/analytics', {
    templateUrl : 'pages/analytics.html'
    controller  : 'analyticsController'
  });

]);

S4=-> (((1+Math.random())*0x10000)|0).toString(16).substring(1);
guid=-> (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());

randomDate=(start=new Date(2011, 0, 1), end=new Date()) -> new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
getMembers=->
  arrMembers=[]
  for i in [0...localStorage.length]
    if localStorage.key(i).indexOf('member')!=-1
      arrMembers.push JSON.parse(localStorage.getItem(localStorage.key(i)))
  arrMembers

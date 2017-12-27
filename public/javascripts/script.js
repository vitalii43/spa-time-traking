var S4, getMembers, guid, randomDate, scotchApp;

scotchApp = angular.module('scotchApp', ['ngRoute', "chart.js"]);

scotchApp.config([
  '$routeProvider',
  '$locationProvider',
  function($routeProvider,
  $locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
    return $routeProvider.when('/',
  {
      templateUrl: 'pages/home.html',
      controller: 'mainController'
    }).when('/settings',
  {
      templateUrl: 'pages/settings.html',
      controller: 'settingsController'
    }).when('/analytics',
  {
      templateUrl: 'pages/analytics.html',
      controller: 'analyticsController'
    });
  }
]);

S4 = function() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

guid = function() {
  return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
};

randomDate = function(start = new Date(2011, 0, 1), end = new Date()) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

getMembers = function() {
  var arrMembers, i, j, ref;
  arrMembers = [];
  for (i = j = 0, ref = localStorage.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
    if (localStorage.key(i).indexOf('member') !== -1) {
      arrMembers.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    }
  }
  return arrMembers;
};

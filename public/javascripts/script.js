var S4, getMembers, guid, randomDate, scotchApp;

S4 = function() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

guid = function() {
  return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
};

scotchApp = angular.module('scotchApp', ['ngRoute']);

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
    }).when('/about',
  {
      templateUrl: 'pages/about.html',
      controller: 'aboutController'
    }).when('/contact',
  {
      templateUrl: 'pages/contact.html',
      controller: 'contactController'
    });
  }
]);

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

scotchApp.controller('mainController', function($scope, $route) {
  var list;
  list = ['vova', 'vasya', 'dffd', 'dffdfd'];
  $scope.listMembers = getMembers();
  $scope.deleteMember = function(key) {
    localStorage.removeItem(key);
    return $route.reload();
  };
  return $scope.addMember = function() {
    var key, member, name;
    name = document.querySelector("#nameMember").value;
    if (name) {
      key = `member${guid()}`;
      member = {};
      member.name = name;
      member.id = key;
      member.dateStart = randomDate().toDateString();
      localStorage.setItem(key, JSON.stringify(member));
      return $route.reload();
    } else {
      console.log("empty name");
    }
  };
});

scotchApp.controller('aboutController', function($scope) {
  return $scope.message = 'Look! I am an about page.';
});

scotchApp.controller('contactController', function($scope) {
  return $scope.message = 'Contact us! JK. This is just a demo.';
});

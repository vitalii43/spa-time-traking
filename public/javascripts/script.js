var S4, clearCalendar, getMembers, guid, randomDate, scotchApp;

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
  //list=['vova','vasya','dffd','dffdfd']
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

clearCalendar = function() {
  return pickmeup('.date').clear();
};

scotchApp.controller('settingsController', function($scope) {
  var element;
  $scope.listMembers = getMembers();
  console.log(getMembers());
  element = document.querySelector(".date");
  pickmeup(element, {
    flat: true,
    mode: 'multiple'
  });
  return element.addEventListener('pickmeup-change', function(e) {
    var key, member;
    key = $("#selMember option:selected").attr('data-id');
    member = JSON.parse(localStorage.getItem(key));
    localStorage.removeItem(key);
    if (document.querySelector('#selDay').value === 'Відпрацьовані') {
      member.working = e.detail.date;
      localStorage.setItem(key, JSON.stringify(member));
    } else {
      member.notworking = e.detail.date;
      localStorage.setItem(key, JSON.stringify(member));
    }
    return console.log(e.detail.date);
  });
});

scotchApp.controller('analyticsController', function($scope) {
  return $scope.message = 'Contact us! JK. This is just a demo.';
});

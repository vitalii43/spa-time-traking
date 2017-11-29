var S4, clearCalendar, getDatesData, getMembers, guid, randomDate, scotchApp;

S4 = function() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

guid = function() {
  return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
};

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

getDatesData = function(member, months) {
  var arr, countNotWorking, countWorking, item, j, k, len, len1, notworkingArr, notworkingDay, notworkingMonth, workingArr, workingDay, workingMonth;
  workingArr = JSON.parse(member).working;
  notworkingArr = JSON.parse(member).notworking;
  workingDay = (function() {
    var j, len, results;
    results = [];
    for (j = 0, len = workingArr.length; j < len; j++) {
      item = workingArr[j];
      results.push(new Date(item));
    }
    return results;
  })();
  arr = (function() {
    var j, len, results;
    results = [];
    for (j = 0, len = workingDay.length; j < len; j++) {
      item = workingDay[j];
      results.push(months[item.getMonth()]);
    }
    return results;
  })();
  workingMonth = arr.filter(function(elem, index, self) {
    return index === self.indexOf(elem);
  });
  countWorking = (function() {
    var j, results;
    results = [];
    for (j = 0; j <= 11; j++) {
      results.push(0);
    }
    return results;
  })();
  for (j = 0, len = workingDay.length; j < len; j++) {
    item = workingDay[j];
    countWorking[item.getMonth()]++;
  }
  notworkingDay = (function() {
    var k, len1, results;
    results = [];
    for (k = 0, len1 = notworkingArr.length; k < len1; k++) {
      item = notworkingArr[k];
      results.push(new Date(item));
    }
    return results;
  })();
  arr = (function() {
    var k, len1, results;
    results = [];
    for (k = 0, len1 = notworkingDay.length; k < len1; k++) {
      item = notworkingDay[k];
      results.push(months[item.getMonth()]);
    }
    return results;
  })();
  notworkingMonth = arr.filter(function(elem, index, self) {
    return index === self.indexOf(elem);
  });
  countNotWorking = (function() {
    var k, results;
    results = [];
    for (k = 0; k <= 11; k++) {
      results.push(0);
    }
    return results;
  })();
  for (k = 0, len1 = notworkingDay.length; k < len1; k++) {
    item = notworkingDay[k];
    countNotWorking[item.getMonth()]++;
  }
  console.log(countNotWorking, countWorking);
  return {
    "working": countWorking,
    "notWorking": countNotWorking
  };
};

scotchApp.controller('analyticsController', function($scope, $route) {
  var member, memberData, months;
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  member = localStorage.getItem($("#selMem option:selected").attr('data-id')) || JSON.stringify(getMembers()[0]);
  console.log(member);
  memberData = getDatesData(member, months);
  $scope.labels = months;
  $scope.series = ['Відпрацьовані', 'Пропущені і вихідні'];
  $scope.options = {
    legend: {
      display: true
    }
  };
  $scope.listMembers = getMembers();
  $scope.data = [memberData.working, memberData.notWorking];
  return $("#selMem").change(function() {
    member = localStorage.getItem($("#selMem option:selected").attr('data-id'));
    console.log(member);
    memberData = getDatesData(member, months);
    $scope.data[0] = memberData.working;
    $scope.data[1] = memberData.notWorking;
  });
});

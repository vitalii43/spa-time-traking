var getDatesData;

getDatesData = function(member, months) {
  var arr, countNotWorking, countWorking, i, item, j, len, len1, notworkingArr, notworkingDay, notworkingMonth, workingArr, workingDay, workingMonth;
  countWorking = (function() {
    var i, results;
    results = [];
    for (i = 0; i <= 11; i++) {
      results.push(0);
    }
    return results;
  })();
  if (JSON.parse(member) && JSON.parse(member).working) {
    workingArr = JSON.parse(member).working;
    workingDay = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = workingArr.length; i < len; i++) {
        item = workingArr[i];
        results.push(new Date(item));
      }
      return results;
    })();
    arr = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = workingDay.length; i < len; i++) {
        item = workingDay[i];
        results.push(months[item.getMonth()]);
      }
      return results;
    })();
    workingMonth = arr.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    });
    for (i = 0, len = workingDay.length; i < len; i++) {
      item = workingDay[i];
      countWorking[item.getMonth()]++;
    }
  }
  countNotWorking = (function() {
    var j, results;
    results = [];
    for (j = 0; j <= 11; j++) {
      results.push(0);
    }
    return results;
  })();
  if (JSON.parse(member) && JSON.parse(member).notworking) {
    notworkingArr = JSON.parse(member).notworking;
    notworkingDay = (function() {
      var j, len1, results;
      results = [];
      for (j = 0, len1 = notworkingArr.length; j < len1; j++) {
        item = notworkingArr[j];
        results.push(new Date(item));
      }
      return results;
    })();
    arr = (function() {
      var j, len1, results;
      results = [];
      for (j = 0, len1 = notworkingDay.length; j < len1; j++) {
        item = notworkingDay[j];
        results.push(months[item.getMonth()]);
      }
      return results;
    })();
    notworkingMonth = arr.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    });
    for (j = 0, len1 = notworkingDay.length; j < len1; j++) {
      item = notworkingDay[j];
      countNotWorking[item.getMonth()]++;
    }
  }
  return {
    "working": countWorking,
    "notWorking": countNotWorking
  };
};

scotchApp.controller('analyticsController', function($scope, $route) {
  var member, memberData, months;
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  member = JSON.stringify(getMembers()[0]);
  console.log(getMembers()[0].name);
  $(document).ready(function() {
    return document.querySelector("button.list-group-item").classList.add('active');
  });
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
  return $scope.change = function(id, $event) {
    document.querySelectorAll("button.list-group-item").forEach(function(element, index, array) {
      return element.classList.remove('active');
    });
    console.log($event);
    $event.target.className += " active";
    member = localStorage.getItem(id);
    memberData = getDatesData(member, months);
    $scope.data[0] = memberData.working;
    $scope.data[1] = memberData.notWorking;
  };
});

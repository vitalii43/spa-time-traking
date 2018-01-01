(function() {
  return angular.module("scotchApp").service("Guid", function() {
    var S4;
    S4 = function() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    this.getGuid = function() {
      return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
    };
    return this;
  }).service("RandomDate", function() {
    this.getRandomDate = function(start = new Date(2011, 0, 1), end = new Date()) {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    };
    return this;
  }).service("Members", function() {
    this.getMembers = function() {
      var arrMembers, i, j, ref;
      arrMembers = [];
      for (i = j = 0, ref = localStorage.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        if (localStorage.key(i).indexOf('member') !== -1) {
          arrMembers.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
      }
      return arrMembers;
    };
    return this;
  }).service("DatesData", function() {
    this.getDatesData = function(member, months) {
      var arr, countNotWorking, countWorking, item, j, k, len, len1, notworkingArr, notworkingDay, notworkingMonth, workingArr, workingDay, workingMonth;
      months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      countWorking = (function() {
        var j, results;
        results = [];
        for (j = 0; j <= 11; j++) {
          results.push(0);
        }
        return results;
      })();
      if (JSON.parse(member) && JSON.parse(member).working) {
        workingArr = JSON.parse(member).working;
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
        for (j = 0, len = workingDay.length; j < len; j++) {
          item = workingDay[j];
          countWorking[item.getMonth()]++;
        }
      }
      countNotWorking = (function() {
        var k, results;
        results = [];
        for (k = 0; k <= 11; k++) {
          results.push(0);
        }
        return results;
      })();
      if (JSON.parse(member) && JSON.parse(member).notworking) {
        notworkingArr = JSON.parse(member).notworking;
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
        for (k = 0, len1 = notworkingDay.length; k < len1; k++) {
          item = notworkingDay[k];
          countNotWorking[item.getMonth()]++;
        }
      }
      return {
        "working": countWorking,
        "notWorking": countNotWorking
      };
    };
    return this;
  });
})();

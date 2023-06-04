(function() {
  var DatesDataService, GuidService, MembersService, RandomDateService;
  GuidService = function() {
    var S4;
    S4 = function() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    this.getGuid = function() {
      return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
    };
    return this;
  };
  RandomDateService = function() {
    this.getRandomDate = function(start = new Date(2011, 0, 1), end = new Date()) {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    };
    return this;
  };
  DatesDataService = function() {
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
  };
  MembersService = function() {
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
    this.setDefaultMembers = function() {
      localStorage.setItem('member343a2ad8-b900-bb60-ac97-4685cbbc4f10', '{"name":"Андрій","id":"member343a2ad8-b900-bb60-ac97-4685cbbc4f10","dateStart":"Fri Jan 16 2015","working":["2017-11-28T22:00:00.000Z","2017-11-18T22:00:00.000Z","2017-11-25T22:00:00.000Z","2017-11-17T22:00:00.000Z","2017-11-10T22:00:00.000Z","2017-11-04T22:00:00.000Z","2017-10-21T21:00:00.000Z","2017-10-14T21:00:00.000Z","2017-09-30T21:00:00.000Z","2017-10-13T21:00:00.000Z","2017-10-20T21:00:00.000Z","2017-09-22T21:00:00.000Z","2017-09-16T21:00:00.000Z","2017-09-08T21:00:00.000Z","2017-09-15T21:00:00.000Z","2017-09-09T21:00:00.000Z","2017-08-17T21:00:00.000Z","2017-08-10T21:00:00.000Z","2017-08-03T21:00:00.000Z","2017-08-08T21:00:00.000Z","2017-08-15T21:00:00.000Z","2017-08-21T21:00:00.000Z","2017-08-30T21:00:00.000Z","2017-08-25T21:00:00.000Z","2017-08-19T21:00:00.000Z"],"notworking":["2017-11-04T22:00:00.000Z","2017-11-25T22:00:00.000Z","2017-11-17T22:00:00.000Z","2017-11-03T22:00:00.000Z","2017-11-11T22:00:00.000Z","2017-10-07T21:00:00.000Z","2017-10-13T21:00:00.000Z","2017-10-27T21:00:00.000Z","2017-10-14T21:00:00.000Z","2017-10-10T21:00:00.000Z","2017-10-16T21:00:00.000Z","2017-10-12T21:00:00.000Z","2017-09-22T21:00:00.000Z","2017-09-15T21:00:00.000Z","2017-09-14T21:00:00.000Z","2017-09-11T21:00:00.000Z","2017-09-19T21:00:00.000Z","2017-09-20T21:00:00.000Z","2017-09-28T21:00:00.000Z","2017-09-29T21:00:00.000Z","2017-08-16T21:00:00.000Z","2017-08-10T21:00:00.000Z","2017-08-18T21:00:00.000Z","2017-08-11T21:00:00.000Z","2017-08-12T21:00:00.000Z","2017-08-22T21:00:00.000Z","2017-08-21T21:00:00.000Z","2017-08-07T21:00:00.000Z","2017-08-09T21:00:00.000Z"]}');
      localStorage.setItem('memberbef29298-f25e-6bab-2708-214718bd8e26', '{"name":"Віталій","id":"memberbef29298-f25e-6bab-2708-214718bd8e26","dateStart":"Tue Oct 22 2013","working":["2017-11-18T22:00:00.000Z","2017-11-17T22:00:00.000Z","2017-11-24T22:00:00.000Z","2017-11-11T22:00:00.000Z","2017-11-03T22:00:00.000Z","2017-10-14T21:00:00.000Z","2017-10-06T21:00:00.000Z","2017-10-20T21:00:00.000Z","2017-10-28T21:00:00.000Z","2017-10-21T21:00:00.000Z","2017-09-22T21:00:00.000Z","2017-09-16T21:00:00.000Z","2017-09-09T21:00:00.000Z","2017-09-06T21:00:00.000Z","2017-09-21T21:00:00.000Z","2017-10-05T21:00:00.000Z","2017-09-19T21:00:00.000Z","2017-08-25T21:00:00.000Z","2017-08-18T21:00:00.000Z","2017-08-12T21:00:00.000Z","2017-08-05T21:00:00.000Z","2017-08-26T21:00:00.000Z","2017-08-11T21:00:00.000Z","2017-08-03T21:00:00.000Z","2017-08-04T21:00:00.000Z"],"notworking":["2017-11-18T22:00:00.000Z","2017-11-11T22:00:00.000Z","2017-11-04T22:00:00.000Z","2017-11-25T22:00:00.000Z","2017-11-17T22:00:00.000Z","2017-11-10T22:00:00.000Z","2017-11-03T22:00:00.000Z","2017-11-09T22:00:00.000Z","2017-10-19T21:00:00.000Z","2017-10-07T21:00:00.000Z","2017-10-21T21:00:00.000Z","2017-10-28T21:00:00.000Z","2017-10-20T21:00:00.000Z","2017-10-13T21:00:00.000Z","2017-09-14T21:00:00.000Z","2017-09-15T21:00:00.000Z","2017-09-16T21:00:00.000Z","2017-09-09T21:00:00.000Z","2017-09-22T21:00:00.000Z","2017-09-28T21:00:00.000Z","2017-09-20T21:00:00.000Z","2017-09-13T21:00:00.000Z","2017-08-08T21:00:00.000Z","2017-08-09T21:00:00.000Z","2017-08-17T21:00:00.000Z","2017-08-25T21:00:00.000Z","2017-08-26T21:00:00.000Z","2017-08-12T21:00:00.000Z"]}');
      localStorage.setItem('membercb14e30e-94cf-7a00-0196-3225b3a705bc', '{"name":"Іван","id":"membercb14e30e-94cf-7a00-0196-3225b3a705bc","dateStart":"Wed Jul 11 2012","working":["2017-01-18T22:00:00.000Z","2017-01-20T22:00:00.000Z","2017-01-09T22:00:00.000Z","2017-01-15T22:00:00.000Z","2017-01-24T22:00:00.000Z","2017-01-25T22:00:00.000Z","2017-01-19T22:00:00.000Z","2017-01-05T22:00:00.000Z","2017-01-03T22:00:00.000Z","2017-01-11T22:00:00.000Z","2017-01-23T22:00:00.000Z","2017-02-09T22:00:00.000Z","2017-02-02T22:00:00.000Z","2017-02-13T22:00:00.000Z","2017-02-21T22:00:00.000Z","2017-02-08T22:00:00.000Z","2017-02-15T22:00:00.000Z","2017-02-07T22:00:00.000Z","2017-01-31T22:00:00.000Z","2017-02-01T22:00:00.000Z","2017-02-23T22:00:00.000Z","2017-02-17T22:00:00.000Z","2017-02-10T22:00:00.000Z","2017-02-05T22:00:00.000Z","2017-03-09T22:00:00.000Z","2017-03-14T22:00:00.000Z","2017-03-06T22:00:00.000Z","2017-03-07T22:00:00.000Z","2017-02-28T22:00:00.000Z","2017-03-01T22:00:00.000Z","2017-03-08T22:00:00.000Z","2017-03-22T22:00:00.000Z","2017-03-29T21:00:00.000Z","2017-03-28T21:00:00.000Z","2017-03-21T22:00:00.000Z","2017-03-20T22:00:00.000Z","2017-03-27T21:00:00.000Z","2017-03-19T22:00:00.000Z","2017-03-26T21:00:00.000Z","2017-03-12T22:00:00.000Z","2017-03-13T22:00:00.000Z","2017-04-13T21:00:00.000Z","2017-04-19T21:00:00.000Z","2017-04-18T21:00:00.000Z","2017-04-09T21:00:00.000Z","2017-04-11T21:00:00.000Z","2017-04-04T21:00:00.000Z","2017-04-03T21:00:00.000Z","2017-04-23T21:00:00.000Z","2017-04-17T21:00:00.000Z","2017-04-26T21:00:00.000Z","2017-04-28T21:00:00.000Z"],"notworking":["2017-04-15T21:00:00.000Z","2017-04-13T21:00:00.000Z","2017-04-06T21:00:00.000Z","2017-04-12T21:00:00.000Z","2017-04-18T21:00:00.000Z","2017-04-09T21:00:00.000Z","2017-04-03T21:00:00.000Z","2017-04-04T21:00:00.000Z","2017-04-05T21:00:00.000Z","2017-03-29T21:00:00.000Z","2017-03-23T22:00:00.000Z","2017-03-13T22:00:00.000Z","2017-03-07T22:00:00.000Z","2017-03-01T22:00:00.000Z","2017-03-09T22:00:00.000Z","2017-02-23T22:00:00.000Z","2017-02-16T22:00:00.000Z","2017-02-07T22:00:00.000Z","2017-02-13T22:00:00.000Z","2017-02-14T22:00:00.000Z","2017-02-03T22:00:00.000Z","2017-02-17T22:00:00.000Z","2017-01-19T22:00:00.000Z","2017-01-16T22:00:00.000Z","2017-01-17T22:00:00.000Z","2017-01-11T22:00:00.000Z"]}');
      localStorage.setItem('key', true);
    };
    return this;
  };
  return angular.module("scotchApp").service("GuidService", GuidService).service("RandomDateService", RandomDateService).service("MembersService", MembersService).service("DatesDataService", DatesDataService);
})();

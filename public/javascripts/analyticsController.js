(function() {
  var AnalyticsController;
  AnalyticsController = function($scope, $route, MembersService, DatesDataService) {
    var change, getDatesData, init, member, memberData, months, vm;
    vm = this;
    init = function() {
      vm.labels = months;
      vm.series = ['Відпрацьовані', 'Пропущені і вихідні'];
      vm.options = {
        legend: {
          display: true
        }
      };
      vm.listMembers = MembersService.getMembers();
      vm.data = [memberData.working, memberData.notWorking];
      vm.change = change;
      vm.buttonActive = 1;
    };
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    member = JSON.stringify(MembersService.getMembers()[0]);
    memberData = DatesDataService.getDatesData(member, months);
    getDatesData = DatesDataService.getDatesData;
    change = function(id, $event) {
      vm.buttonActive = $event.currentTarget.attributes.number.value;
      member = localStorage.getItem(id);
      memberData = getDatesData(member, months);
      vm.data[0] = memberData.working;
      vm.data[1] = memberData.notWorking;
    };
    init();
  };
  return angular.module("scotchApp").controller('AnalyticsController', AnalyticsController);
})();

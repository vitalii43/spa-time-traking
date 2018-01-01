(function() {
  var AnalyticsController;
  AnalyticsController = function($scope, $route, Members, DatesData) {
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
      vm.listMembers = Members.getMembers();
      vm.data = [memberData.working, memberData.notWorking];
      return vm.change = change;
    };
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    member = JSON.stringify(Members.getMembers()[0]);
    memberData = DatesData.getDatesData(member, months);
    angular.element(document).ready(function() {
      return document.querySelector("button.list-group-item").classList.add('active');
    });
    getDatesData = DatesData.getDatesData;
    change = function(id, $event) {
      document.querySelectorAll("button.list-group-item").forEach(function(element, index, array) {
        return element.classList.remove('active');
      });
      //console.log($event)
      $event.target.className += " active";
      member = localStorage.getItem(id);
      memberData = getDatesData(member, months);
      vm.data[0] = memberData.working;
      vm.data[1] = memberData.notWorking;
    };
    init();
  };
  return angular.module("scotchApp").controller('AnalyticsController', AnalyticsController);
})();

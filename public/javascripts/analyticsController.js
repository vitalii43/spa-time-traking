(function() {
  return angular.module("scotchApp").controller('AnalyticsController', function($scope, $route, Members, DatesData) {
    var getDatesData, member, memberData, months;
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    member = JSON.stringify(Members.getMembers()[0]);
    memberData = DatesData.getDatesData(member, months);
    $scope.labels = months;
    $scope.series = ['Відпрацьовані', 'Пропущені і вихідні'];
    $scope.options = {
      legend: {
        display: true
      }
    };
    $scope.listMembers = Members.getMembers();
    $scope.data = [memberData.working, memberData.notWorking];
    angular.element(document).ready(function() {
      return document.querySelector("button.list-group-item").classList.add('active');
    });
    getDatesData = DatesData.getDatesData;
    $scope.change = function(id, $event) {
      document.querySelectorAll("button.list-group-item").forEach(function(element, index, array) {
        return element.classList.remove('active');
      });
      //console.log($event)
      $event.target.className += " active";
      member = localStorage.getItem(id);
      memberData = getDatesData(member, months);
      $scope.data[0] = memberData.working;
      return $scope.data[1] = memberData.notWorking;
    };
  });
})();

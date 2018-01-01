(function() {
  return angular.module("scotchApp").controller('SettingsController', function($scope, Members) {
    var element;
    $scope.listMembers = Members.getMembers();
    $scope.selectedMemb = Members.getMembers()[0].name;
    $scope.WorkingOrHoliday = "Відпрацьовані";
    element = document.querySelector(".date");
    pickmeup(element, {
      flat: true,
      mode: 'multiple'
    });
    element.addEventListener('pickmeup-change', function(e) {
      var key, member;
      key = $("#selMember option:selected").attr('data-id');
      member = JSON.parse(localStorage.getItem(key));
      localStorage.removeItem(key);
      if (document.querySelector('#selDay').value === 'Відпрацьовані') {
        member.working = e.detail.date;
        return localStorage.setItem(key, JSON.stringify(member));
      } else {
        member.notworking = e.detail.date;
        return localStorage.setItem(key, JSON.stringify(member));
      }
    });
    return $scope.clearCalendar = function() {
      return pickmeup('.date').clear();
    };
  });
})();

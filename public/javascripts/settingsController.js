(function() {
  var SettingsController;
  SettingsController = function($scope, Members) {
    var clearCalendar, element, init, vm;
    vm = this;
    init = function() {
      vm.listMembers = Members.getMembers();
      vm.selectedMemb = Members.getMembers()[0].name;
      vm.WorkingOrHoliday = "Відпрацьовані";
      vm.clearCalendar = clearCalendar;
    };
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
    clearCalendar = function() {
      return pickmeup('.date').clear();
    };
    init();
  };
  return angular.module("scotchApp").controller('SettingsController', SettingsController);
})();

(function() {
  var SettingsController;
  SettingsController = function($scope, MembersService) {
    var clearCalendar, init, vm;
    vm = this;
    init = function() {
      vm.listMembers = MembersService.getMembers();
      vm.selectedMemb = MembersService.getMembers()[0].name;
      vm.WorkingOrHoliday = "Відпрацьовані";
      vm.clearCalendar = clearCalendar;
    };
    clearCalendar = function() {
      return pickmeup('.date').clear();
    };
    init();
  };
  return angular.module("scotchApp").controller('SettingsController', SettingsController);
})();

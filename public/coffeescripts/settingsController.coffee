(->
  SettingsController=($scope,MembersService)->
    vm=@;
    init=()->
      vm.listMembers=MembersService.getMembers();
      vm.selectedMemb=MembersService.getMembers()[0].name;
      vm.WorkingOrHoliday="Відпрацьовані";
      vm.clearCalendar=clearCalendar;
      return   
    clearCalendar=()-> pickmeup('.date').clear();
    init();
    return;
    
  angular
    .module("scotchApp")
    .controller('SettingsController', SettingsController);
)()
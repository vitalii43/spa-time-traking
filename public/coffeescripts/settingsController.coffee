(->
  SettingsController=($scope,Members)->
    vm=@;
    init=()->
      vm.listMembers=Members.getMembers();
      vm.selectedMemb=Members.getMembers()[0].name;
      vm.WorkingOrHoliday="Відпрацьовані";
      vm.clearCalendar=clearCalendar;
      return

    element=document.querySelector(".date")

    pickmeup(element, {
      flat : true,
      mode : 'multiple'
    })

    element.addEventListener('pickmeup-change', (e) ->
      key=$("#selMember option:selected").attr('data-id')
      member=JSON.parse(localStorage.getItem(key))
      localStorage.removeItem(key)

      if document.querySelector('#selDay').value=='Відпрацьовані'
        member.working=e.detail.date
        localStorage.setItem(key,JSON.stringify(member))
      else
        member.notworking=e.detail.date
        localStorage.setItem(key,JSON.stringify(member))
    )      
    clearCalendar=()-> pickmeup('.date').clear();
    init();
    return;
    
  angular
    .module("scotchApp")
    .controller('SettingsController', SettingsController);
)()
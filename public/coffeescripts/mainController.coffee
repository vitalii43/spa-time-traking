(->
  MainController=($scope,$route,$state,Guid,MembersService,RandomDateService)->
    vm=@;
    init=()->
      vm.listMembers=MembersService.getMembers();
      vm.deleteMember=deleteMember;
      vm.addMember=addMember;
      return

    if !localStorage.getItem('key') 
      MembersService.setDefaultMembers()
     
    deleteMember=(key)->
      localStorage.removeItem(key)
      $state.reload();

    addMember=->
      name=document.querySelector("#nameMember").value
      if name
        key="member#{Guid.getGuid()}"
        member={}
        member.name=name
        member.id=key;
        member.dateStart=RandomDateService.getRandomDate().toDateString()
        localStorage.setItem(key,JSON.stringify(member))
        $state.reload();
      else
        console.log "empty name"; 
      return;
    init()
    return;  
  MainController.$inject=['$scope','$route','$state',"GuidService","MembersService","RandomDateService"] 
    
  angular
    .module("scotchApp")
    .controller('MainController', MainController);
)()

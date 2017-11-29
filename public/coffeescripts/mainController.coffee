scotchApp.controller('mainController', ($scope,$route)->
#list=['vova','vasya','dffd','dffdfd']
  $scope.listMembers=getMembers();
  $scope.deleteMember=(key)->
    localStorage.removeItem(key)
    $route.reload();

  $scope.addMember=->
    name=document.querySelector("#nameMember").value

    if name
      key="member#{guid()}"
      member={}
      member.name=name
      member.id=key;
      member.dateStart=randomDate().toDateString()
      localStorage.setItem(key,JSON.stringify(member))
      $route.reload();
    else
      console.log "empty name"; return;
);


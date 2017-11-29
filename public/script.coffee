S4=-> (((1+Math.random())*0x10000)|0).toString(16).substring(1);
guid=-> (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());

scotchApp = angular.module('scotchApp', ['ngRoute',"chart.js"]);

scotchApp.config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider)->
  $locationProvider.html5Mode({
    enabled: true
    requireBase: false
  });

  $routeProvider
  .when('/', {
    templateUrl : 'pages/home.html'
    controller  : 'mainController'
  })

  .when('/settings', {
    templateUrl : 'pages/settings.html'
    controller  : 'settingsController'
  })

  .when('/analytics', {
    templateUrl : 'pages/analytics.html'
    controller  : 'analyticsController'
  });

]);
randomDate=(start=new Date(2011, 0, 1), end=new Date()) -> new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
getMembers=->
  arrMembers=[]
  for i in [0...localStorage.length]
    if localStorage.key(i).indexOf('member')!=-1
      arrMembers.push JSON.parse(localStorage.getItem(localStorage.key(i)))
  arrMembers

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
clearCalendar=-> pickmeup('.date').clear();

scotchApp.controller('settingsController', ($scope)->
  $scope.listMembers=getMembers();
  console.log(getMembers())

  element=document.querySelector(".date")
  pickmeup(element,{
    flat : true,
    mode : 'multiple'
  });
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
    console.log(e.detail.date)
  )
);
getDatesData=(member,months)->
  workingArr=JSON.parse(member).working
  notworkingArr=JSON.parse(member).notworking

  workingDay=(new Date(item) for item in workingArr)
  arr=(months[item.getMonth()] for item in workingDay)
  workingMonth= arr.filter((elem, index, self)-> index == self.indexOf(elem))
  countWorking=(0 for [0..11])
  countWorking[item.getMonth()]++ for item in workingDay

  notworkingDay=(new Date(item) for item in notworkingArr)
  arr=(months[item.getMonth()] for item in notworkingDay)
  notworkingMonth= arr.filter((elem, index, self)-> index == self.indexOf(elem))
  countNotWorking=(0 for [0..11])
  countNotWorking[item.getMonth()]++ for item in notworkingDay
  console.log(countNotWorking,countWorking)

  {"working":countWorking,"notWorking":countNotWorking}

scotchApp.controller('analyticsController', ($scope,$route)->

  months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  member=localStorage.getItem($("#selMem option:selected").attr('data-id')) || JSON.stringify(getMembers()[0])
  console.log(member)
  memberData=getDatesData(member,months)

  $scope.labels = months
  $scope.series = ['Відпрацьовані', 'Пропущені і вихідні'];
  $scope.options = { legend: { display: true}}
  $scope.listMembers=getMembers();
  $scope.data = [
    memberData.working,
    memberData.notWorking]
  $("#selMem").change(()->

    member=localStorage.getItem($("#selMem option:selected").attr('data-id'))
    console.log(member)
    memberData=getDatesData(member,months)
    $scope.data[0]= memberData.working
    $scope.data[1]=memberData.notWorking
    return
  )

);

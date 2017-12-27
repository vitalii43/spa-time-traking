getDatesData=(member,months)->

  countWorking=(0 for [0..11])
  if JSON.parse(member) && JSON.parse(member).working
    workingArr=JSON.parse(member).working
    workingDay=(new Date(item) for item in workingArr)
    arr=(months[item.getMonth()] for item in workingDay)
    workingMonth= arr.filter((elem, index, self)-> index == self.indexOf(elem))
    countWorking[item.getMonth()]++ for item in workingDay

  countNotWorking=(0 for [0..11])
  if JSON.parse(member)&&JSON.parse(member).notworking
    notworkingArr=JSON.parse(member).notworking
    notworkingDay=(new Date(item) for item in notworkingArr)
    arr=(months[item.getMonth()] for item in notworkingDay)
    notworkingMonth= arr.filter((elem, index, self)-> index == self.indexOf(elem))
    countNotWorking[item.getMonth()]++ for item in notworkingDay

  {"working":countWorking,"notWorking":countNotWorking}

scotchApp.controller('analyticsController', ($scope,$route)->

  months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  member= JSON.stringify(getMembers()[0])
  console.log(getMembers()[0].name)

  angular.element(document).ready(->
    document.querySelector("button.list-group-item").classList.add('active')
  )

  memberData=getDatesData(member,months)
  $scope.options =  {
    responsive: false,
    maintainAspectRatio: false
  }

  $scope.labels = months
  $scope.series = ['Відпрацьовані', 'Пропущені і вихідні'];
  $scope.options = { legend: { display: true}}
  $scope.listMembers=getMembers();

  $scope.data = [
    memberData.working,
    memberData.notWorking]

  $scope.change=(id,$event)->
    document.querySelectorAll("button.list-group-item").forEach (element,index, array)->
      element.classList.remove('active')
    #console.log($event)
    $event.target.className+=" active"

    member=localStorage.getItem(id)
    memberData=getDatesData(member,months)
    $scope.data[0]=memberData.working
    $scope.data[1]=memberData.notWorking
    return
);

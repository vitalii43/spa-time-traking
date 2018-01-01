(->
  AnalyticsController=($scope,$route,Members,DatesData)->  
    vm=@;
    init=()->
      vm.labels = months
      vm.series = ['Відпрацьовані', 'Пропущені і вихідні'];
      vm.options = { legend: { display: true}}
      vm.listMembers=Members.getMembers();
      vm.data = [
        memberData.working,
        memberData.notWorking]
      vm.change=change

    months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    member= JSON.stringify(Members.getMembers()[0]) 
    memberData=DatesData.getDatesData(member,months)    
      
    angular.element(document).ready(->
      document.querySelector("button.list-group-item").classList.add('active')
    )
    getDatesData=DatesData.getDatesData;
    change=(id,$event)->
      document.querySelectorAll("button.list-group-item").forEach (element,index, array)->
        element.classList.remove('active')
      #console.log($event)
      $event.target.className+=" active"

      member=localStorage.getItem(id)
      memberData=getDatesData(member,months)
      vm.data[0]=memberData.working
      vm.data[1]=memberData.notWorking
      return;
    init();
    return;  

  angular
    .module("scotchApp")
    .controller('AnalyticsController',AnalyticsController);
)()
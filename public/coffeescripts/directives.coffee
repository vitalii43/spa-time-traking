(->
  calendarDirective=()->
    compile=(element,attr)->       
     
      cal=document.querySelector(".date")

      pickmeup(cal, {
        flat : true,
        mode : 'multiple'
      })

      cal.addEventListener('pickmeup-change', (e) ->
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
      link=(scope,element,attr)->               
      return link;
    directive=
      restrict: 'EA'
      templateUrl:'pages/calendarDirective.html'
      compile:compile
    return directive
  
  angular
    .module("scotchApp")
    .directive('calendarDirective',calendarDirective)
    
)()
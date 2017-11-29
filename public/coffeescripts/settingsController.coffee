scotchApp.controller('settingsController', ($scope)->
  $scope.listMembers=getMembers();

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
);


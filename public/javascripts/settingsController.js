scotchApp.controller('settingsController', function($scope) {
  var element;
  $scope.listMembers = getMembers();
  element = document.querySelector(".date");
  pickmeup(element, {
    flat: true,
    mode: 'multiple'
  });
  return element.addEventListener('pickmeup-change', function(e) {
    var key, member;
    key = $("#selMember option:selected").attr('data-id');
    member = JSON.parse(localStorage.getItem(key));
    localStorage.removeItem(key);
    if (document.querySelector('#selDay').value === 'Відпрацьовані') {
      member.working = e.detail.date;
      return localStorage.setItem(key, JSON.stringify(member));
    } else {
      member.notworking = e.detail.date;
      return localStorage.setItem(key, JSON.stringify(member));
    }
  });
});

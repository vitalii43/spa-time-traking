scotchApp.controller('mainController', function($scope, $route) {
  //list=['vova','vasya','dffd','dffdfd']
  $scope.listMembers = getMembers();
  $scope.deleteMember = function(key) {
    localStorage.removeItem(key);
    return $route.reload();
  };
  return $scope.addMember = function() {
    var key, member, name;
    name = document.querySelector("#nameMember").value;
    if (name) {
      key = `member${guid()}`;
      member = {};
      member.name = name;
      member.id = key;
      member.dateStart = randomDate().toDateString();
      localStorage.setItem(key, JSON.stringify(member));
      return $route.reload();
    } else {
      console.log("empty name");
    }
  };
});

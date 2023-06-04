(function() {
  var MainController;
  MainController = function($scope, $route, $state, Guid, MembersService, RandomDateService) {
    var addMember, deleteMember, init, vm;
    vm = this;
    init = function() {
      vm.listMembers = MembersService.getMembers();
      vm.deleteMember = deleteMember;
      vm.addMember = addMember;
    };
    if (!localStorage.getItem('key')) {
      MembersService.setDefaultMembers();
    }
    deleteMember = function(key) {
      localStorage.removeItem(key);
      return $state.reload();
    };
    addMember = function() {
      var key, member, name;
      name = document.querySelector("#nameMember").value;
      if (name) {
        key = `member${Guid.getGuid()}`;
        member = {};
        member.name = name;
        member.id = key;
        member.dateStart = RandomDateService.getRandomDate().toDateString();
        localStorage.setItem(key, JSON.stringify(member));
        $state.reload();
      } else {
        console.log("empty name");
      }
    };
    init();
  };
  MainController.$inject = ['$scope', '$route', '$state', "GuidService", "MembersService", "RandomDateService"];
  return angular.module("scotchApp").controller('MainController', MainController);
})();

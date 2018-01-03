(function() {
  var calendarDirective;
  calendarDirective = function() {
    var compile, directive;
    compile = function(element, attr) {
      var cal, link;
      cal = document.querySelector(".date");
      pickmeup(cal, {
        flat: true,
        mode: 'multiple'
      });
      cal.addEventListener('pickmeup-change', function(e) {
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
      link = function(scope, element, attr) {};
      return link;
    };
    directive = {
      restrict: 'EA',
      templateUrl: 'pages/calendarDirective.html',
      compile: compile
    };
    return directive;
  };
  return angular.module("scotchApp").directive('calendarDirective', calendarDirective);
})();

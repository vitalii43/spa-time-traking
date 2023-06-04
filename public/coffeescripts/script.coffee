(->
  angular
    .module('scotchApp', [
      'ui.router',
      'ngResource',
      "chart.js",
      "ngRoute"
    ])
    .config(['$stateProvider','$urlRouterProvider', ($stateProvider,$urlRouterProvider)->      
      $stateProvider
        .state("analytics",{
          url:"/analytics"
          templateUrl : 'pages/analytics.html'
          controller  : 'AnalyticsController'
          controllerAs: 'vm'
        })
        .state("main",{
          url:"/main"
          templateUrl : 'pages/home.html'
          controller  : 'MainController'
          controllerAs: 'vm'
        })
        .state("settings",{
          url:"/settings"
          templateUrl : 'pages/settings.html'
          controller  : 'SettingsController'
          controllerAs: 'vm'
        })        
      $urlRouterProvider.otherwise('main');
    ]);
)()
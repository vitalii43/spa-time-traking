do ->
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
        })
        .state("main",{
          url:"/main"
          templateUrl : 'pages/home.html'
          controller  : 'MainController'
        })
        .state("settings",{
          url:"/settings"
          templateUrl : 'pages/settings.html'
          controller  : 'SettingsController'
        })        
      $urlRouterProvider.otherwise('main');
    ]);

angular.module('midwinter', ['ui.router'])

//Routing Code
.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /home
  $urlRouterProvider.otherwise("/home");
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "templates/home.html"
    })
    .state('about', {
      url: "/about",
      templateUrl: "templates/about.html"
    })
    .state('contact', {
      url: "/contact",
      templateUrl: "templates/contact.html"
    })
})

//Controllers
.controller('appCtrl',function($scope){
    'ngInject';

    $scope.showMenuPanel = false;

    $scope.menuPanelHandler = function(){

        $scope.showMenuPanel = !$scope.showMenuPanel;

    }
})

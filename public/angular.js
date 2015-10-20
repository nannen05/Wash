var app = angular.module('carApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when("/login", {
      templateUrl: '../views/userviews.html',
      controller: 'UserController',
      controllerAs: 'user'
    }).
        otherwise({
          redirectTo: '/'
        });
  }]);
//
app.controller('UserController', function($scope, $http) {
  $http.get('/view/NickAnnen').success(function(data) {
    $scope.user = data;
  });
});

app.controller('DetailerList', function($scope, $http) {
  $http.get('/show-detailers').success(function(data) {
    $scope.detailers = data;

  });

});


var app = angular.module('carApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when("/login", {
      templateUrl: '../views/userviews.html',
      controller: 'UserController',
      controllerAs: 'usershow'
    }).
        otherwise({
          redirectTo: '/'
        });
  }]);
//
app.controller('UserController', function($scope, $http) {
  $http.get('/view/NickAnnen').success(function(data) {
    $scope.username = data[0].username;
    $scope.name = data[0].first_name;
    $scope.city = data[0].city;
  });
});

app.controller('DetailerList', function($scope, $http) {
  $http.get('/show-detailers').success(function(data) {
    $scope.detailers = data;

  });

});


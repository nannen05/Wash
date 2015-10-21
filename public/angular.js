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
    $scope.rating = data[0].rating;
    $scope.basicwash = data[0].basic_wash;
    $scope.superwash = data[0].super_wash;
    $scope.deluxewash = data[0].deluxe_wash;
  });
});

app.controller('PostUserController', function($scope, $http) {
  $scope.updatedUser = {};
  $scope.submit = function () {
    $http({
      method: 'POST',
      url: '/update/NickAnnen',
      data: $scope.updatedUser,
      headers : {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data))

  };
});

app.controller('DetailerList', function($scope, $http) {
  $http.get('/show-detailers').success(function(data) {
    $scope.detailers = data;
  });
});


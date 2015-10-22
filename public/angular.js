var app = angular.module('carApp', ['ngRoute', 'angular.filter', 'ui.bootstrap']);

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

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
      .when("/more-info", {
        templateUrl: '../views/modal.html',
        controller: 'DetailerListController'
        //controllerAs: 'usershow'
      }).
      otherwise({
        redirectTo: '/'
      });
}]);

app.controller('UserController', function($scope, $http) {
  var name = $scope.loginuser;
  $http({
    method: 'GET',
    url: '/view/',
    params: {username: name}
    }).success(function(data) {
      if (data[0].username === name) {
      $scope.updatedUser = {
      username : data[0].username,
      firstname : data[0].first_name,
      city : data[0].city,
      rating : data[0].rating,
      basicwash : data[0].basic_wash,
      superwash : data[0].super_wash,
      deluxewash : data[0].deluxe_wash
      };
      $scope.submit = function () {
        $http({
          method: 'POST',
          url: '/update/',
          params: {username: name},
          data: JSON.stringify($scope.updatedUser)
          //headers : {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data) {})
        };
      } else {
        alert('No User');
      }
  });
});

app.controller('DetailerListController', function($scope, $http) {
  $http.get('/show-detailers').success(function(data) {
    console.log(data)
    $scope.detailers = data;

  });
  //$timeout(function(){
  //  $dialog.dialog({}).open('../views/modal.html');
  //}, 3000);

});


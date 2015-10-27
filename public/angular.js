var app = angular.module('carApp', ['ngRoute', 'angular.filter', 'ui.bootstrap']);

app.directive('filename', ['$timeout', function ($timeout) {
  return {
    link: function (scope, element, attrs) {
      element.on('change', function  (evt) {
        var files = evt.target.files;


      });
    }
  }
}]);

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
      deluxewash : data[0].deluxe_wash,
      img: data[0].img
      };
      $scope.submit = function () {
        $http({
          method: 'POST',
          url: '/update/',
          params: {username: name},
          data: JSON.stringify($scope.updatedUser)
         }).success(function(data) {})
        };
      } else {
        alert('No User');
      }
  });
});

app.controller('AddDetailerController', function($scope, $http) {
  var input = document.querySelector('input[type=file]');
  var image = '';
  $(input).change(function() {
    image = $(this).val();
    console.log(image);
    $scope.formData.image = image;
    });
  $scope.formData = {};
  $scope.submitForm = function() {
    $http({
      method: 'POST',
      url: '/add-detailers',
      data: JSON.stringify($scope.formData)
     }).success(function(data) {
      console.log(data);
    });
  };
});

app.controller('DetailerListController', function($scope, $http) {
  $http.get('/show-detailers').success(function(data) {
    $scope.detailers = data;
  });
});







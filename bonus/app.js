(function() {
  var app = angular.module('hoover', []);

  app.controller('HooverCtrl', function($http,$scope){
    var hoover;
    this.hoover = 'doof';
    $http.get('api/hoover').success(function(data){
      console.dir(data);
      hoover = data;
      console.dir(this.hoover);
      $scope.hoover = data;

      data.processInstruction();

    });
  });
})();

'use strict';

/**
 * @ngdoc function
 * @name erpProjApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the erpProjApp
 */
angular.module('erpProjApp')
  .controller('LoginCtrl', ['$scope', 'httpService', '$location', '$localStorage', function ($scope, httpService,$location ,$localStorage) {

    $scope.userName = '';
    $scope.password = '';
    $scope.isSubmit = false;

    $scope.userLogin = function(){
      $scope.isSubmit = true;

      var data = {
        name : $scope.userName,
        password : $scope.password
      }

      httpService.sendRequest('userLogin', {data : data})
        .then(function(data){
          console.log(data,'XD')
          if(data==='S01'){
            $localStorage.erpUser = $scope.userName;
            $location.path('/');            
          }
        })

    }

  }]);

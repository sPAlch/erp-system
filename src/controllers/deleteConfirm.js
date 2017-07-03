'use strict';

/**
 * @ngdoc function
 * @name erpProjApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the erpProjApp
 */
angular.module('erpProjApp')
  .controller('DeleteConfirmCtrl', ['$scope', '$modalInstance', 'params' ,function ($scope, $modalInstance, params) {

    $scope.delete = function(){
      $modalInstance.close(true);
    };

    $scope.keep = function () {
      $modalInstance.dismiss('cancel');
    };

  }]);

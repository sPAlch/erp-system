'use strict';

/**
 * @ngdoc function
 * @name erpProjApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the erpProjApp
 */
angular.module('erpProjApp')
  .controller('DeleteConfirmCtrl', ['$scope', '$uibModalInstance', 'items' ,function ($scope, $uibModalInstance, items) {

    $scope.delete = function(){
      $uibModalInstance.close(true);
    };

    $scope.keep = function () {
      $uibModalInstance.dismiss('cancel');
    };

  }]);

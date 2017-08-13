'use strict';

/**
 * @ngdoc function
 * @name erpProjApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the erpProjApp
 */
angular.module('erpProjApp')
  .controller('CustomerCtrl', ['$scope', '$uibModal', 'httpService',function ($scope, $uibModal, httpService) {

    var newCustomerData = {
      'number' : '',
      'name': '',
      'full_name': '',
      'receipt': '',
      'mailing_address': '',
      'established_address': '',
      'owner': '',
      'contact_name': '',
      'contact_job_title':'',
      'contact_tel': '',
      'contact_mobile': '',
      'contact_email': '',
      'contact_fax': '',
      'remark': '',
      'checkout': '',
      'pay_condition': '',
      'capital': '',
      'employee_number': '',
      'established_time' : new Date().getTime(),
      'tax' : 1
    },
    selectedCustomerNo = 0;

    //var apiUrl = 'erpApi';
    var apiUrl = 'http://spalch.net/erpsystem';

    $scope.content = angular.copy(newCustomerData);
    $scope.isLoading = false;
    $scope.isDeleting = false;
    $scope.isDuplicate = false;
    $scope.datePicker = {
      isOpen : false
    };
    $scope.viewMode = 0;
    $scope.customerData = [];

  	$scope.init = function(){ 
      getListData();
    }
    $scope.openDatePicker = function($event){
      $event.preventDefault();
      $event.stopPropagation();
      $scope.datePicker.isOpen = !$scope.datePicker.isOpen;
    }
    $scope.editCustomer = function(customer){

      customer.established_time = parseInt(customer.established_time)*1000;

      _.defer(function(){
          $scope.$apply(function () {
            selectedCustomerNo = customer.no;
            $scope.isDuplicate = false;
            $scope.viewMode = 1;
            $scope.content = angular.copy(customer);
          });
      });

    };

    $scope.addCustomer = function(){
      _.defer(function(){
          $scope.$apply(function () {
            selectedCustomerNo = -1;
            $scope.isDuplicate = false;
            $scope.viewMode = 2;
            $scope.content = angular.copy(newCustomerData);
          });
      });
    }

    $scope.saveCustomer = function(){

      var customerNo = selectedCustomerNo,
          data = angular.copy($scope.content);

      $scope.isLoading = true;
      data.established_time= new Date($scope.content.established_time).getTime()/1000

      var method = $scope.viewMode === 1 ? 'updateCustomer' : 'createCustomer',
          data = {
            data : data,
            urlParams : $scope.viewMode === 1 ? customerNo : undefined
          };

      httpService.sendRequest(method,data)
            .then(function(data){

              _.defer(function(){
                $scope.$apply(function () {
                  $scope.isLoading = false;
                  if(parseInt(data)>-1){
                    $scope.isDuplicate = false;
                    backToList();
                  }else{
                    $scope.isDuplicate = true;
                  }
                });
              });

            });
    }


    $scope.backToList = function(){
      backToList();
    }

    $scope.deleteCustomer = function(){
        var modalInstance = $uibModal.open({
                template: require('../views/deleteConfirm.html'),
                controller: 'DeleteConfirmCtrl',
                size: 'sm',
                resolve: {
                    items: function(){                        
                        return true;
                    }
                }
            });

        modalInstance.result.then(function(result) {
          deleteCustomer();
        },function () {
          console.log('Modal dismissed at: ' + new Date());
        });
    }

    var deleteCustomer = function(){
      $scope.isDeleting = true;
      httpService.sendRequest('deleteCustomer',{urlParams : selectedCustomerNo})
            .then(function(data){
                $scope.isDeleting = false;
                backToList();
            });
    }
    var backToList = function(){
        $scope.viewMode = 0;
        getListData();      
    }
    var getListData = function(){

      $scope.isLoading = true;
      
      httpService.sendRequest('getCustomerList')
            .then(function(data){
                console.log(data);
                $scope.customerData = _.sortBy(data, 'number');
                $scope.isLoading = false;
            });
    }

  }]);

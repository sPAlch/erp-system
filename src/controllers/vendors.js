'use strict';

/**
 * @ngdoc function
 * @name erpProjApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the erpProjApp
 */
angular.module('erpProjApp')
  .controller('VendorsCtrl', ['$scope', '$uibModal', 'httpService',function ($scope, $uibModal, httpService) {

    var newVendorData = {
        'number' : '',
        'name':'',
        'full_name':'',
        'receipt':'',
        'mailing_address': '',
        'established_address': '',
        'owner':'',
        'contact_name':'',
        'contact_job_title':'',
        'contact_tel':'',
        'contact_mobile':'',
        'contact_email':'',
        'contact_fax':'',
        'remark':'',
        'category_array':[],
        'bank':'',
        'bank_account':'',
        'established_time' : new Date().getTime(),
        'tax' : 1
    },
    newSelectedVendorsType = [],
    selectedVendorNo = 0;

    //var apiUrl = 'erpApi';
    var apiUrl = 'http://spalch.net/erpsystem';

    $scope.content = angular.copy(newVendorData);
    $scope.isLoading = false;
    $scope.isDeleting = false;
    $scope.isDuplicate = false;
    $scope.datePicker = {
      isOpen : false
    };
    $scope.viewMode = 0;
    $scope.vendorsData = [];
    $scope.selectedVendorsType = [];

  	$scope.init = function(){ 
      getVendorsCategory();
      getListData();
    }
    $scope.openDatePicker = function($event){
      $event.preventDefault();
      $event.stopPropagation();
      $scope.datePicker.isOpen = !$scope.datePicker.isOpen;
    }
    $scope.editVendor = function(vendor){

      var vendorCategory = vendor.category_array !== null ? vendor.category_array.split(',') : [],
          selectedVendorsType = angular.copy(newSelectedVendorsType),
          vendorData = angular.copy(newVendorData);

      vendor.established_time = parseInt(vendor.established_time)*1000;

      _.each(selectedVendorsType,function(type,i){
        type.checked = vendorCategory.indexOf(type.no)!== -1;
      });

      _.defer(function(){
          $scope.$apply(function () {
            selectedVendorNo = vendor.no;
            $scope.isDuplicate = false;
            $scope.viewMode = 1;
            $scope.selectedVendorsType = angular.copy(selectedVendorsType);
            $scope.content = angular.copy(vendor);
          });
      });
    };

    $scope.addVendor = function(){
      _.defer(function(){
          $scope.$apply(function () {
            selectedVendorNo = -1;
            $scope.isDuplicate = false;
            $scope.viewMode = 2;
            $scope.selectedVendorsType = angular.copy(newSelectedVendorsType);
            $scope.content = angular.copy(newVendorData);
          });
      });
    }

    $scope.saveVendor = function(){

      var vendorNo = selectedVendorNo,
          vendorCategory = [],
          data = angular.copy($scope.content);

      data.established_time= new Date($scope.content.established_time).getTime()/1000

      $scope.isLoading = true;
      _.each($scope.selectedVendorsType,function(type,i){
        if(type.checked){
          vendorCategory.push(type.no);
        }
      });

      data['category_array'] = vendorCategory.join();


      var method = $scope.viewMode === 1 ? 'updateVendor' : 'createVendor',
          data = {
            data : data,
            urlParams : $scope.viewMode === 1 ? vendorNo : undefined
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

    $scope.deleteVendor = function(){
        var modalInstance = $uibModal.open({
                template: require('../views/deleteConfirm.html'),
//                templateUrl: 'views/deleteConfirm.html',
                controller: 'DeleteConfirmCtrl',
                size: 'sm',
                resolve: {
                    params: function(){                        
                        return true;
                    }
                }
            });

        modalInstance.result.then(function(result) {
          deleteVendor();
        },function () {
          console.log('Modal dismissed at: ' + new Date());
        });
    }

    var deleteVendor = function(){

      $scope.isDeleting = true;
      httpService.sendRequest('deleteVendor',{urlParams : selectedVendorNo})
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
      httpService.sendRequest('getVendorList')
            .then(function(data){
                console.log(data);
                $scope.vendorsData = _.sortBy(data, 'number');
                $scope.isLoading = false;
            });
    }

    var getVendorsCategory = function(){

      httpService.sendRequest('getVendorsCategory')
            .then(function(data){
              newSelectedVendorsType = [];
              _.each(data,function(category,i){
                newSelectedVendorsType.push({
                  no : category.no,
                  name : category.name,
                  checked : false
                });
              });
              $scope.selectedVendorsType = angular.copy(newSelectedVendorsType);
            });
    }

  }]);

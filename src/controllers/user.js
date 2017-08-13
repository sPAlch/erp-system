'use strict';

/**
 * @ngdoc function
 * @name erpProjApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the erpProjApp
 */
angular.module('erpProjApp')
  .controller('UserCtrl', ['$scope', '$uibModal', 'httpService',function ($scope, $uibModal, httpService) {

    $scope.userData = [];

    $scope.changePassword = false;
    $scope.isPasswordEmpty = false;
    $scope.isLoading = false;
    $scope.isDeleting = false;
    $scope.viewMode = 0;
    $scope.userCategory = {
      isOpen : false,
      list : [
              { id : 1, label : '管理者'},
              { id : 2, label : '業務'},
              { id : 3, label : '生管'},
              { id : 4, label : '會計'},
              { id : 5, label : '設計'},
              { id : 6, label : '客戶'}
            ]
    };
    $scope.selectedUser = {};

    var newUser = {
          name: '',
          display_name: '',
          password: '',
          cat : {
            id : 1, label : '管理者'
          },
          remark: null,
          password : '',
          passwordConfirm : ''
    },
    selectedUserNo = -1;

  	$scope.init = function(){
      getListData();
    }

    $scope.openMenu = function($event){
      $event.preventDefault();
      $event.stopPropagation();
      $scope.userCategory['isOpen'] = true;
    }
    $scope.setCat = function(cat){
      //console.log(cat);
      $scope.selectedUser.cat = angular.copy(cat);
    }

    $scope.editUser = function(user){

      console.log(user);
      user['password'] = '';
      user['newPassword'] = '';
      user['passwordConfirm'] = '';

      _.defer(function(){
          $scope.$apply(function () {
            selectedUserNo = user.no;
            $scope.viewMode = 1;
            $scope.selectedUser = angular.copy(user);
          });
      });

    };

    $scope.addUser = function(){
      _.defer(function(){
          $scope.$apply(function () {
            selectedUserNo = -1;
            $scope.viewMode = 2;
            $scope.selectedUser = angular.copy(newUser);
          });
      });
    }

    $scope.saveUser = function(){

      if(($scope.viewMode === 2 && $scope.selectedUser['password']==='') || 
        ($scope.viewMode === 1 && $scope.selectedUser['newPassword']==='' && $scope.changePassword)){

        $scope.isPasswordEmpty = true;

      }else{

        $scope.isPasswordEmpty = false;

        var userNo = selectedUserNo,
            data = {};

        $scope.isLoading = true;

        data['name'] = $scope.selectedUser['name'];
        data['display_name'] = $scope.selectedUser['display_name'];
        data['category'] = $scope.selectedUser['cat'].id;
        data['remark'] = $scope.selectedUser['remark'];

        if($scope.viewMode === 2){
          data['password'] = $scope.selectedUser['password'];
        }
        if($scope.viewMode === 1 && $scope.changePassword){
          data['password'] = $scope.selectedUser['newPassword'];
        }

        var method = $scope.viewMode === 1 ? 'updateUser' : 'createUser',
            data = {
              data : data,
              urlParams : $scope.viewMode === 1 ? userNo : undefined
            };

        httpService.sendRequest(method,data)
              .then(function(data){

                _.defer(function(){
                  $scope.$apply(function () {
                    $scope.isLoading = false;
                    backToList();
                  });
                });

              });
      }
    }

    $scope.deleteUser = function(){
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
          deleteUser();
        },function () {
          console.log('Modal dismissed at: ' + new Date());
        });
    }
    var deleteUser = function(){
      $scope.isDeleting = true;
      httpService.sendRequest('deleteUser',{urlParams : selectedUserNo})
            .then(function(data){
                $scope.isDeleting = false;
                backToList();
            });
    }

    $scope.backToList = function(){
      backToList();
    }

    var getUserCat = function(catId){
      for(var i=0;i<$scope.userCategory.list.length;i++){
        if($scope.userCategory.list[i].id === parseInt(catId)){
          return $scope.userCategory.list[i];
        }
      }
    }

    var backToList = function(){
        $scope.viewMode = 0;
        $scope.changePassword = false;
        getListData();      
    }

    var getListData = function(){

      $scope.isLoading = true;
      httpService.sendRequest('getUserList')
            .then(function(data){
                _.each(data,function(singleData,i){
                  singleData['cat'] = getUserCat(singleData.category);
                })
                $scope.isLoading = false;
                $scope.userData = data;
            });
    }

  }]);

'use strict';

/**
 * @ngdoc function
 * @name erpProjApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the erpProjApp
 */
angular.module('erpProjApp')
  .controller('PaymentCtrl', ['$scope', 'httpService',function ($scope, httpService) {

    var selectedPayNo = 0;

    $scope.content = {};
    $scope.isLoading = false;
    $scope.isDeleting = false;
    $scope.isDuplicate = false;
    $scope.datePicker = {
      isOpen : false
    };
    $scope.viewMode = 0;
    $scope.payListData = [];
    $scope.currentList = [];
    $scope.vendorsData = {
      isOpen : false,
      defaultData : {no : -1, name : '全部'},
      list : []      
    };

    $scope.payCondition = {
      isOpen : false,
      list : [
              { no : 0, name : '未付款'},
              { no : 1, name : '應付款'},
              { no : 2, name : '已付款'}
            ]
    };

    $scope.invoiceCondition = {
      isOpen : false,
      list : [
              { no : 0, name : '未開發票'},
              { no : 1, name : '已開發票'}
            ]
    }

    $scope.pageSetting = {
      perPage : 10,
      perPageSet : [10,20,50],
      perPageMenuOpen : false,
      maxPageSize : 10,
      currentPage : 1,
      offset : 0,
      totalCount : 0,
      totalSum : 0,
      payCondition : $scope.payCondition.list[0],
      vendor : $scope.vendorsData.defaultData,
      ticketNo : ''
    };

  	$scope.init = function(){ 
      getVendorsData();
    }
    $scope.editPay = function(pay){

      _.defer(function(){
          $scope.$apply(function () {
            selectedPayNo = pay.no;
            $scope.content = pay;
            $scope.viewMode = 1;
          });
      });
    };

    $scope.savePay = function(){

      var payNo = selectedPayNo,
          data = {
            data : {
//              ticket_detail_no : $scope.content.ticket_detail_no,
//              target : $scope.content.target,
//              monthly_payment : $scope.content.monthly_payment,
//              after_tax : $scope.content.after_tax,              
              payment_total : $scope.content.payment_total.toString(),
              payment_condition : $scope.content.pay_condition.no.toString(),
              statement : $scope.content.statement,
              invoice : $scope.content.invoice_condition.no.toString()
            },
            urlParams : payNo
          };

      httpService.sendRequest('updatePay',data)
            .then(function(data){

              $scope.isLoading = false;
              backToList();

            });

    }

    $scope.setCondtiion = function(condition){
      $scope.content.pay_condition = angular.copy(condition);      
    }
    $scope.setDataTargetVendor = function(vendor){
      $scope.pageSetting.vendor = angular.copy(vendor);            
    }
    $scope.setDataPayCondtiion = function(condition){
      $scope.pageSetting.payCondition = angular.copy(condition);      
    }
    $scope.setInvoice = function(invoice){
      $scope.content.invoice_condition = angular.copy(invoice);            
    }

    $scope.backToList = function(){
      backToList();
    }

    $scope.getPageData = function(){
      setPageData();
    }
    $scope.setItemsPerPage = function(num){
      $scope.pageSetting.perPageMenuOpen = false;
      $scope.pageSetting.perPage = num;
      $scope.isLoading = true;
      $scope.pageSetting.currentPage = 1;
      $scope.pageSetting.offset = 0;
      getListData();
    }
    $scope.searchData = function(){
      $scope.pageSetting.currentPage = 1;
      $scope.pageSetting.offset = 0;
      $scope.isLoading = true;
      getListData();      
    }

    var backToList = function(){
        $scope.viewMode = 0;
        getListData();      
    }

    var getVendorsData = function(){
      $scope.isLoading = true;
      httpService.sendRequest('getVendorList')
            .then(function(data){
                $scope.vendorsData.list = _.sortBy(data, 'number');
                getListData();
            });
    }

    var getListName = function(no,list){
      if(list.length>0){
        if(no!==null){
          for(var i = 0; i<list.length; i++){
            if(no.toString()===list[i].no.toString()){
              return list[i].name;
            }
          }        
        }
        return list[0].name;          
      }
    }

    var getListData = function(){

      var params = {
            limit : $scope.pageSetting.maxPageSize*$scope.pageSetting.perPage,
            payment_condition : $scope.pageSetting.payCondition.no.toString(),
            //target : '3',
            //ticket_detail_no : '201703001',
            offset : $scope.pageSetting.offset
          };

      if($scope.pageSetting.vendor.no > -1) params['target'] = $scope.pageSetting.vendor.no.toString();
      if($scope.pageSetting.ticketNo.toString().length > 0) params['ticket_no'] = $scope.pageSetting.ticketNo.toString();

      $scope.isLoading = true;
      httpService.sendRequest('getPayList', {params : params})
            .then(function(data){
                $scope.pageSetting.totalCount = data.info[0].total_count;
                $scope.pageSetting.totalSum = data.info[0].total_sum;
                _.each(data.data,function(singleData,i){
                  singleData['vendor'] = {  no:singleData.target, name:getListName(singleData.target,$scope.vendorsData.list)};
                  singleData['pay_condition'] = {  
                    no:singleData.payment_condition !== null ? singleData.payment_condition : 0, 
                    name:getListName(singleData.payment_condition,$scope.payCondition.list)
                  };
                  singleData['invoice_condition'] = {  
                    no:singleData.invoice !== null ? singleData.invoice : 0, 
                    name:getListName(singleData.invoice,$scope.invoiceCondition.list)
                  };
                })
                $scope.payListData = data.data;
                $scope.isLoading = false;
                setPageData();
            });
    }

    var setPageData = function(){
      var startIndex = $scope.pageSetting.perPage*($scope.pageSetting.currentPage-1) - $scope.pageSetting.offset,
          endIndex = $scope.pageSetting.perPage*($scope.pageSetting.currentPage) - $scope.pageSetting.offset,
          offset = $scope.pageSetting.perPage*$scope.pageSetting.maxPageSize*Math.floor(($scope.pageSetting.currentPage-1)/$scope.pageSetting.maxPageSize);

      if($scope.pageSetting.offset === offset){
        $scope.currentList = $scope.payListData.slice(startIndex,endIndex);
      }else{
        $scope.pageSetting.offset = offset;
        $scope.isLoading = true;
        getListData();
      }

    }

  }]);

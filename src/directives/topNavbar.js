'use strict';

let $ = require("jquery");

angular.module('erpProjApp')
    .directive('topNavbar', ['$location' , '$localStorage', 'httpService', function ($location,$localStorage,httpService) {
        return {
            template: require('../views/topNavbar.html'),
            restrict: 'E',
            link: function($scope, element, attrs) {

              $scope.navMenu = [
                { name : '工單', route : 'job', isActive : false },
                { name : '客戶', route : 'customer', isActive : false },
                { name : '廠商', route : 'vendors', isActive : false },
                { name : '使用者', route : 'users', isActive : false },
                { name : '付款', route : 'payment', isActive : false },
                { name : '請款', route : 'bill', isActive : false }
              ];

              $scope.$localStorage = $localStorage;

              $scope.$watch(function(){

                var pathRoute = $location.path();
                var path = pathRoute.split('/')[1].length>0 ? pathRoute.split('/')[1] : 'job' ;


                $('body').removeClass(function (index, className) {
                    return (className.match (/(^|\s)page-\S+/g) || []).join(' ');
                }).addClass('page-'+path);

                _.each($scope.navMenu,function(singleNav,i){
                    singleNav.isActive = path === singleNav.route;        
                })

              });

              $scope.activeNav = function(nav){
                _.each($scope.navMenu,function(singleNav,i){
                    singleNav.isActive = nav.name === singleNav.name;        
                })
              }

              $scope.userLogout = function(){

                httpService.sendRequest('userLogout')
                  .then(function(data){
                    if(data==='S02'){
                      console.log(data)
                      delete $localStorage.erpUser;
                      $location.path('/login');            
                    }
                  })

              }
            }

        };
    }]);

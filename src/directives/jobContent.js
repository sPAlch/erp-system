'use strict';

angular.module('erpProjApp')
    .directive('jobContent', [function () {
        return {
            template: require('../views/jobContent.html'),
            restrict: 'E',
            scope:{
                content : '=',
                jobOption : '=',
                salesList : '=',
                customerList : '='
            },
            link: function(scope, element, attrs) {

                scope.deadlineDatePickerOpen = false;
                scope.setJobOption=function(option,indexName,subIndex){
                    scope.jobOption[indexName]['isOpen'] = false;
                    scope.content.jobOption[indexName] = option;
                    console.log(scope.content);
                }
                scope.jobDatePicker = function($event){
                  $event.preventDefault();
                  $event.stopPropagation();
                  scope.deadlineDatePickerOpen = !scope.deadlineDatePickerOpen;
                }

                scope.countTotal = function(data){
                    if(data.price.edit){
                        return true;
                    }else{
                        data.price.total = data.amount*data.price.unit;
                        return false;
                    }
                }

            }
        };
    }]);

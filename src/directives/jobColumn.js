'use strict';

angular.module('erpProjApp')
    .directive('jobColumn', [function () {
        return {
            template: require('../views/jobColumn.html'),
            restrict: 'E',
            scope:{
                jobDivision : '=',
                companyList : '=',
                companyCatList : '=',
                companySelectedList : '=',
                unitList : '=',
            },
            link: function(scope, element, attrs) {
                var divisionSample = {
                    company : {
                        id : -1,
                        name : '選擇廠商'
                    },
                    subType : {id:0},
                    versionNo : '',
                    titel : '',
                    content : '',
                    spec : '',
                    quantity : {
                        loss : 0,
                        total : 0
                    },
                    unit : {
                        name : '',
                        edit : false
                    },
                    price : {
                        unit : 0,
                        total : 0
                    },
                    nextStep : {
                        id : -1
                    }
                }

                scope.addDivision = function(){
                    var newDivision = checkDivisionListData(angular.copy(divisionSample));
                    scope.jobDivision.list.push(newDivision);                    
                };
                scope.setCompany = function(selectedCompany,data){
                    data['menuOpen']['company'] = false;
                    data['company'] = selectedCompany;
                    scope.$emit('updateCompanySelectedList');
                };
                scope.setNextCompany = function(selectedCompany,data){
                    data['menuOpen']['selectedCompany'] = false;
                    data['nextStep'] = selectedCompany;
                };
                scope.setSubType = function(setSubType,data){
                    data['menuOpen']['subType'] = false;
                    data['subType'] = setSubType;
                };
                scope.setUnit = function(unit,data){
                    data['unit']['name'] = unit.unit;
                    data['unit']['unit_no'] = unit.unit_no;
                    data['unit']['edit'] = false;                   
                };
                scope.checkUnit = function(data){
                    if(!data.unit.edit){
                        var unitName = angular.copy(data.unit.name),
                            isDuplicate = false;

                        _.each(scope.unitList,function(data,i){
                            if(data.unit === unitName){
                                isDuplicate = true;
                            }
                        });

                        if(!isDuplicate){
                            data['unit']['unit_no'] = -1;
                            scope.unitList.push({
                                unit : unitName,
                                unit_no : -1
                            });
                        }
                    }
                }
                scope.checkSelectedCompany =  function(selectedCompany){
                    for(var i = 0; i<scope.companySelectedList.length;i++){
                        if(selectedCompany.id == scope.companySelectedList[i].id){
                            return true;
                        }
                    }
                    return false;
                };
                scope.countTotalCost = function(){
                    var totalCost = 0;
                    _.each(scope.jobDivision.list,function(data,i){
                        totalCost+=data.price.total;
                    });
                    scope.jobDivision.totalCost = totalCost;
                    return totalCost;
                }
                scope.countTotal = function(data){
                    if(data.price.edit){
                        return true;
                    }else{
                        data.price.total = data.quantity.total*data.price.unit;
                        return false;
                    }
                }
                scope.priceTotalEditable = function(data){
                    console.log(data.price.edit);
                }

                var initialSetting = function(){
                    if(scope.jobDivision.list.length === 0){
                        //scope.addDivision();
                    }
                }
                var getCompanyDetail = function(id,data,dataColumn,list){
                    for(var i = 0; i<list.length; i++ ){
                        if(list[i].id===id){
                            data[dataColumn] = list[i];
                            return
                        }
                    }
                    data[dataColumn] = list[0];
                }
                var getSubTypeName = function(id,data){
                    for(var i = 0; i<scope.jobDivision.subType.length; i++ ){
                        if(scope.jobDivision.subType[i].id===id){
                            data['subType'] = scope.jobDivision.subType[i];
                            return
                        }
                    }
                }
                var getUnitName = function(unit_no){

                    for(var i=0;i<scope.unitList.length;i++){
                        if(scope.unitList[i].unit_no === unit_no){
                            return scope.unitList[i].unit;
                        }
                    }
                    return '';
                };

                var checkDivisionListData = function(singleData){

                    getSubTypeName(singleData.subType.id,singleData);
                    getCompanyDetail(singleData.company.id,singleData,'company',scope.companyCatList[scope.jobDivision.type][singleData.subType.id]);
                    getCompanyDetail(singleData.nextStep.id,singleData,'nextStep',scope.companySelectedList);

                    singleData.unit.name = getUnitName(singleData.unit.unit_no);
                    if(singleData.unit.name === ''){
                        singleData.unit.name = scope.unitList[0].unit;
                        singleData.unit.unit_no = scope.unitList[0].unit_no;
                    }

                    return singleData;
                }

                initialSetting();
                _.each(scope.jobDivision.list,function(data,i){
                    data = checkDivisionListData(data);
                });
                scope.$emit('updateCompanySelectedList');
            }
        };
    }]);

'use strict';

/**
 * @ngdoc function
 * @name erpProjApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the erpProjApp
 */
angular.module('erpProjApp')
  .controller('JobCtrl', ['$scope', 'httpService', function ($scope, httpService) {

    var companySelectedDefault = [{
        id : -1,
        name : '無下一站',
        phone : ''
      }],
      currenDate = new Date();

    $scope.jobList = [];
    $scope.customerData = [];
    $scope.currentList = [];
    $scope.userData = [];
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

    $scope.pageSetting = {
      perPage : 10,
      perPageSet : [10,20,50],
      perPageMenuOpen : false,
      maxPageSize : 10,
      currentPage : 1,
      offset : 0,
      totalCount : 5
    };
    $scope.searchRange = {
      startDate : new Date(currenDate.getFullYear(), currenDate.getMonth()).getTime(),
      startDatePickerOpen : false,
      endDate : new Date().getTime(),
      endDateDatePickerOpen : false,
      keyWordType : [
        { label: '編號', val : 'no'},
        { label: '名稱', val : 'name'},
        { label: '客戶', val : 'customer'}
      ],
      keyWordVal : '',
      selectedCustomer : {},
      keyWordTypeMenuOpen : false,
      selectKeyWordType : { label: '名稱', val : 'name'}
    }
    $scope.viewMode = 0;
    $scope.printMode = false;

    $scope.jobSample = {
      content : {
        id : 0,
        name : '專案名稱',
        spec : '',
        quantity : 0,
        price : {
          unit:0,
          total:0
        },
        created_date : new Date().getTime(),
        deadline : new Date().getTime(),
        progress : '',
        jobOption : {
          customer : {id:0},
          sales : {id:0},
          status : {id:0},
          printVer : {id:0},
          printType : {id:0},
          printColor : {id:0}
        }
      },
      jobDivision : [
        {
          type : 0,
          subType : [
            {id : 0, name : '製版'}
          ],
          label : '製版',
          list : [],
          note : '',
          totalCost : 0
        },
        {
          type : 1,
          subType : [
            {id : 0, name : '紙品'}
          ],
          label : '紙品',
          list : [],
          note : '',
          totalCost : 0
        },
        {
          type : 1,
          subType : [
            {id : 0, name : '印刷'}
          ],
          label : '印刷',
          list : [],
          note : '',
          totalCost : 0
        },
        {
          type : 3,
          subType : [
            {id:0,name:'上光'},
            {id:1,name:'裁摺'},
            {id:2,name:'裝訂'},
            {id:3,name:'軋型'},
            {id:4,name:'刀模'},
            {id:5,name:'燙金'},
            {id:6,name:'運輸'},
            {id:7,name:'糊工'},
            {id:8,name:'其他'}
          ],
          label : '後加工',
          list : [],
          note : '',
          totalCost : 0
        }
      ]
    };

    $scope.selectedData = {
      index : -1,
      title : ''
    };
    $scope.jobContent = {
      content : {
        id : 0,
        name : '專案名稱',
        spec : '',
        quantity : 0,
        price : {
          unit:0,
          total:0
        },
        created_date : new Date().getTime(),
        deadline : new Date().getTime(),
        progress : '',
        jobOption : {
          customer : {id:0},
          sales : {id:0},
          status : {id:0},
          printVer : {id:0},
          printVerOther : '',
          printType : {id:0},
          printColor : {id:0}
        }
      },
      jobDivision : [
        {
          type : 0,
          subType : [
            {id : 0, name : '製版'}
          ],
          label : '製版',
          list : [],
          note : '',
          totalCost : 0
        },
        {
          type : 1,
          subType : [
            {id : 0, name : '紙品'}
          ],
          label : '紙品',
          list : [],
          note : '',
          totalCost : 0
        },
        {
          type : 1,
          subType : [
            {id : 0, name : '印刷'}
          ],
          label : '印刷',
          list : [],
          note : '',
          totalCost : 0
        },
        {
          type : 3,
          subType : [
            {id:0,name:'上光'},
            {id:1,name:'裁摺'},
            {id:2,name:'裝訂'},
            {id:3,name:'軋型'},
            {id:4,name:'刀模'},
            {id:5,name:'燙金'},
            {id:6,name:'運輸'},
            {id:7,name:'糊工'},
            {id:8,name:'其他'}
          ],
          label : '後加工',
          list : [],
          note : '',
          totalCost : 0
        }
      ]
    };

    $scope.jobDivision = [];

    var jobDivisionSample = [
        {
          type : 0,
          subType : [
            {id : 0, name : '製版'}
          ],
          label : '製版',
          list : [],
          note : '',
          totalCost : 0
        },
        {
          type : 1,
          subType : [
            {id : 0, name : '紙品'}
          ],
          label : '紙品',
          list : [],
          note : '',
          totalCost : 0
        },
        {
          type : 1,
          subType : [
            {id : 0, name : '印刷'}
          ],
          label : '印刷',
          list : [],
          note : '',
          totalCost : 0
        },
        {
          type : 3,
          subType : [
            {id:0,name:'上光'},
            {id:1,name:'裁摺'},
            {id:2,name:'裝訂'},
            {id:3,name:'軋型'},
            {id:4,name:'刀模'},
            {id:5,name:'燙金'},
            {id:6,name:'運輸'},
            {id:7,name:'糊工'},
            {id:8,name:'其他'}
          ],
          label : '後加工',
          list : [],
          note : '',
          totalCost : 0
        }
    ],jobSample = {
        'name' : '',
        'customer_no': '',
        'owner_no': '',
        'delivery_date': new Date().getTime()/1000,
        'status': '',
        'format': '',
        'amount': 0,
        'unit_no': '',
        'price': 0,
        'total_price': 0,
        'print_version': '',
        'print_sample': '',
        'brush_color': '',
        'schedule': '',
        'jobOption' : {},
        'detail' : {
          1 : { data : [], remark : '' },
          2 : { data : [], remark : '' },
          3 : { data : [], remark : '' },
          4 : { data : [], remark : '' }
        }
    };

    $scope.jobOption = {
      status : {
          list:[
              {no:0,name:'進行中'},
              {no:1,name:'已完成'}
          ],
          isOpen : false
      },
      printVer : {
          list:[
              {no:0,name:'新版'},
              {no:1,name:'舊版'},
              {no:2,name:'其他'}
          ],
          isOpen : false
      },
      printType : {
          list:[
              {no:0,name:'數位樣'},
              {no:1,name:'成品樣'},
              {no:2,name:'色樣'}
          ],
          isOpen : false
      },
      printColor : {
          list:[
              {no:0,name:'依樣'},
              {no:1,name:'業務看色'},
              {no:2,name:'客戶看色'}
          ],
          isOpen : false
      }
    };
    $scope.salesList= [];
    $scope.customerList= [];
    $scope.companyList = [{ id : -1, name : '選擇廠商' }];
    $scope.companyCatList = { 
      0:{ 0 : [{ id : -1, name : '選擇廠商' }] }, 
      1:{ 0 : [{ id : -1, name : '選擇廠商' }] }, 
      2:{ 0 : [{ id : -1, name : '選擇廠商' }] }, 
      3:{ 
        0 : [{ id : -1, name : '選擇廠商' }],
        1 : [{ id : -1, name : '選擇廠商' }],
        2 : [{ id : -1, name : '選擇廠商' }],
        3 : [{ id : -1, name : '選擇廠商' }],
        4 : [{ id : -1, name : '選擇廠商' }],
        5 : [{ id : -1, name : '選擇廠商' }],
        6 : [{ id : -1, name : '選擇廠商' }],
        7 : [{ id : -1, name : '選擇廠商' }],
        8 : [{ id : -1, name : '選擇廠商' }]
      }
    };
    var compareList = {
      1 : [0,0],
      2 : [1,0],
      3 : [2,0],
      4 : [3,0],
      5 : [3,1],
      6 : [3,2],
      7 : [3,3],
      8 : [3,4],
      9 : [3,5],
      10 : [3,6],
      11 : [3,7],
      12 : [3,8]
    }

    $scope.unitList = [];
    $scope.companySelectedList = companySelectedDefault;
    $scope.costDetailList = false;

    var nextJobId = $scope.pageSetting.totalCount + 1;

    $scope.$on('updateCompanySelectedList',function (event, data) {
      updateCompanySelectedList();
    });

    $scope.countCost = function(){
      var totalCost = 0;
      _.each($scope.jobDivision,function(data,i){
          totalCost += data.totalCost;
      });
      return totalCost;
    }
    $scope.showCostDetailList = function(){
      $scope.costDetailList = !$scope.costDetailList;
    }

    $scope.init = function(){
      getCustomersData();
      //setPageData();
    };
    $scope.getPageData = function(){
      setPageData();
    }
    $scope.setItemsPerPage = function(num){
      $scope.pageSetting.perPageMenuOpen = false;
      $scope.pageSetting.perPage = num;
      $scope.isLoading = true;
      $scope.pageSetting.currentPage = 1;
      $scope.pageSetting.offset = 0;
      getJobListData();
      //setPageData();
    }
    $scope.cancel = function(){
        $scope.viewMode = 0;
        //backToList();
    }
    $scope.addNewJob = function(){
        var newJob = angular.copy(jobSample);
        $scope.jobContent = transJobDataContent(newJob);
        $scope.jobDivision = setJobDivision(newJob.detail);
        $scope.selectedData.title = '新增工單';
        $scope.viewMode = 1;
    }
    $scope.addToList = function(){
        var newJob = angular.copy($scope.jobContent);
        newJob.content.id = '01608' + Math.floor(nextJobId/1000) + Math.floor(nextJobId%1000/100) + Math.floor(nextJobId%100/10) + Math.floor(nextJobId%10);
        $scope.jobList.push(newJob);
        $scope.viewMode = 0;
        nextJobId++;
        setPageData();
    }
    $scope.viewJob = function(job,index){
        $scope.viewMode = 2;
        $scope.selectedData.index = index;
        $scope.selectedData.title = job.name;
        $scope.jobContent = angular.copy(job);

        getSingleJobContent(job.no);
    }
    $scope.saveJob = function(){
      $scope.isLoading = true;
      checkUnitListData();
    }

    var saveJob = function(){
      var data = angular.copy($scope.jobContent),
          jobNo = $scope.jobContent.no;

      var saveData = {
        'no' : data.no,
        'name' : data.name,
        'customer_no': data.jobOption.customer.no,
        'owner_no': data.jobOption.sales.no,
        'delivery_date': data.delivery_date,
        'status': data.jobOption.status.no.toString(),
        'format': data.format,
        'amount': data.amount,
        'unit_no': data.unit_no,
        'price': data.price.unit,
        'total_price': data.price.total,
        'print_version': data.print_version,
        'print_sample': data.print_sample,
        'brush_color': data.brush_color,
        'schedule': data.schedule,
        'detail' : {
          'data' : [],
          'remark' : []
        }      
      }

      _.each($scope.jobDivision,function(division,i){

        var type = i+1;

        saveData.detail.remark.push({
          'type' : type,
          'remark' : division.note !== undefined ? division.note : ''
        });

        _.each(division.list,function(list,j){
            var listData = {
            'type' : type,
            'tickets_no' : jobNo,
            'vendor_no' : list.company.id,
            'name' : list.title,
            'content' : list.content,
            'size' : list.spec,
            'amount' : list.quantity.total,
            'unit_no' : getUnitNo(list.unit.name),
            'loss' : list.quantity.loss,
            'price' : list.price.unit,
            'next_stop' : list.nextStep.id,
            'subtotal' : list.price.total,
            'version' : list.versionNo,
            'category' : list.subType.id,
            'extend_no': null
          }

          if($scope.viewMode === 2){
            if(list['no']!==undefined){
              listData['no'] = list['no'];
            }else{
              listData['insert'] = 1;
            }            
          }

          saveData.detail.data.push(listData);
        })

      })

      var method = $scope.viewMode === 1 ? 'createJob' : 'updateJob',
          data = {
            data : saveData,
            urlParams : $scope.viewMode === 1 ? undefined : jobNo
          };

      httpService.sendRequest(method,data)
            .then(function(respData){

              if( method==='updateJob' && saveData.status==='1'){
                createBill(saveData);
                _.each(saveData.detail.data,function(vendorData,i){
                  createPay(saveData,vendorData);
                })
              }
              _.defer(function(){
                $scope.$apply(function () {
                  $scope.isLoading = false;
                  backToList();
                });
              });

            },function(){});      
    }

    var createPay = function(ticketData,vendorData){

      var data = {
            data:{
              "ticket_no": ticketData.no.toString(),
              "payment_total": vendorData.subtotal.toString(),
              "target": vendorData.vendor_no.toString(),
              "monthly_payment": '0',
              "after_tax": vendorData.subtotal.toString(),
              "payment_condition": null,
              "statement": '0',
              "invoice": '0'
            }
          }

      httpService.sendRequest('createPay',data)
            .then(function(respData){
            },function(){});

    }

    var createBill = function(ticketData){

      var data = {
            data:{
              "ticket_no": ticketData.no.toString(),
//              "ticket_detail_no": ticketData.no.toString(),
              "payment_total": ticketData.total_price.toString(),
              "target": ticketData.customer_no.toString(),
              "monthly_payment": '0',
              "after_tax": ticketData.total_price.toString(),
              "payment_condition": null,
              "statement": '0',
              "invoice": '0'
            }
          }

      httpService.sendRequest('createBill',data)
            .then(function(respData){
            },function(){});

    }

    $scope.openDatePicker = function($event,type){
      $event.preventDefault();
      $event.stopPropagation();
      if(type>0){
        $scope.searchRange.endDateDatePickerOpen = !$scope.searchRange.endDateDatePickerOpen;
      }else{
        $scope.searchRange.startDatePickerOpen = !$scope.searchRange.startDatePickerOpen;
      }
    }
    $scope.searchTickets = function(){
      $scope.pageSetting.currentPage = 1;
      $scope.pageSetting.offset = 0;
      $scope.isLoading = true;
      getJobListData();
    }
    $scope.setKeyWordType = function(type){
      $scope.searchRange.keyWordTypeMenuOpen = false;
      $scope.searchRange.selectKeyWordType = type;
    }
    $scope.setSelectedCustomer = function(customer){
      $scope.searchRange.selectedCustomer = customer;
    }

    var getCustomersData = function(){

      $scope.isLoading = true;
      httpService.sendRequest('getCustomerList')
            .then(function(data){
                //console.log(data);
                $scope.customerData = _.sortBy(data, 'number');
                $scope.searchRange.selectedCustomer = $scope.customerData[0];
                getUsersData();
            });
    }

    var getUserCat = function(catId){
      for(var i=0;i<$scope.userCategory.list.length;i++){
        if($scope.userCategory.list[i].id === parseInt(catId)){
          return $scope.userCategory.list[i];
        }
      }
    }

    var getUsersData = function(){

      httpService.sendRequest('getUserList')
            .then(function(data){
                $scope.salesList = [];
                _.each(data,function(singleData,i){
                  singleData['cat'] = getUserCat(singleData.category);
                  if(singleData['cat'].id===1 || singleData['cat'].id===2){
                    $scope.salesList.push(singleData);
                  }
                })
                $scope.userData = data;
                getVendorsData();
            });
    }
    var getVendorsData = function(){

      httpService.sendRequest('getVendorList')
            .then(function(data){
                $scope.vendorsData = _.sortBy(data, 'number');
                _.each($scope.vendorsData,function(vendor,i){
                  var singleCompany = {
                    id : vendor.no,
                    name : vendor.name,
                    phone : vendor.contact_mobile,
                    cat : vendor.category_array.split(',')
                  }

                  _.each(singleCompany.cat,function(cat,i){
                    var mainCat = compareList[cat][0],
                        subCat = compareList[cat][1]
                    $scope.companyCatList[mainCat][subCat].push(singleCompany);

                  })
                  $scope.companyList.push(singleCompany);

                })
                getTicketsUnitData();

            });
    }
    var getTicketsUnitData = function(needSave){

      httpService.sendRequest('getTicketsUnits')
            .then(function(data){
                needRelodaUnit = false;
                $scope.unitList = data;
                if(needSave){
                  saveJob();
                }else{
                  getJobListData();
                }
            });
    }

    var newUnit = 0,
        needRelodaUnit = false;

    var getUnitNo = function(unitName){
      for(var i =0 ;i<$scope.unitList.length;i++){
        if($scope.unitList[i].unit===unitName){
          return $scope.unitList[i].unit_no;
        }
      }
      return $scope.unitList[0].unit_no;      
    }

    var checkUnitListData = function(){
      newUnit = 0;
      needRelodaUnit=false;

      var newUnitObj = {};

      _.each($scope.jobDivision,function(division,i){
        _.each(division.list,function(list,j){
          if(list.unit.unit_no.toString()==='-1'){
            newUnitObj[list.unit.name] = true;
          }
        })

      })
      _.each($scope.unitList,function(unitData,i){
        if(unitData.unit_no.toString()==='-1' && newUnitObj[unitData.unit]){
          addTicketsUnitsData(unitData.unit);
          needRelodaUnit = true;
          newUnit++;
        }
      })
      checkIfNoNewUnitData();
    }
    var checkIfNoNewUnitData = function(){
      if(newUnit===0){
        if(needRelodaUnit){
          getTicketsUnitData(true);
        }else{
          saveJob();
        }
      }
    }

    var addTicketsUnitsData = function(unitName){
      var data = {data:{unit:unitName}}

      httpService.sendRequest('addTicketsUnits',data)
            .then(function(data){
              newUnit--;
              checkIfNoNewUnitData();
            });

    }

    var getSingleJobContent = function(jobNo){

      $scope.isLoading = true;
      httpService.sendRequest('getSingleJobContent', {urlParams:jobNo})
            .then(function(data){
              $scope.isLoading = false;
              $scope.jobContent = angular.copy(transJobDataContent(data));
              $scope.jobDivision = setJobDivision(data.detail);
            });

    }

    var setJobDivision = function(divisionList){

      var newJobDivision = angular.copy(jobDivisionSample);

      _.each(divisionList,function(detailContent,key){

        var divisionIndex = parseInt(key)-1;
        newJobDivision[divisionIndex].note = detailContent['remark'];
        _.each(detailContent.data,function(data,i){
            var listData = {
                  no : data.no,
                  company : {
                      id : data.vendor_no,
                      name : '選擇廠商'
                  },
                  subType : { id : data.category !== null ? parseInt(data.category) : 0},
                  versionNo : data.version !== null ? data.version : '',
                  title : data.name,
                  content : data.content,
                  spec : data.size !== null ? data.size : '',
                  quantity : {
                      loss : data.loss !== null ? parseInt(data.loss) : 0,
                      total : data.amount !== null ? parseInt(data.amount) : 0
                  },
                  unit : {
                      name : '',
                      unit_no : data.unit_no,
                      edit : false
                  },
                  price : {
                      unit : data.price !== null ? parseInt(data.price) : 0,
                      total : data.subtotal !== null ? parseInt(data.subtotal) : 0
                  },
                  nextStep : {
                      id : data.next_stop !== null ? data.next_stop : -1
                  }
              };

            newJobDivision[divisionIndex].list.push(listData);
        })

      })

      return newJobDivision;

    }

    var transJobDataContent = function(singleJob){

      if(!singleJob['total_price']){ singleJob['total_price'] = singleJob.amount*singleJob.price; }
      if(!singleJob['status']){ singleJob['status'] = 0; }
      singleJob['amount'] = parseInt(singleJob.amount);
      singleJob['createtime'] = parseInt(singleJob.createtime)*1000;
      singleJob['delivery_date'] = parseInt(singleJob.delivery_date)*1000;

      singleJob['jobOption'] = {
        customer : {  no:singleJob.customer_no, name:getListName(singleJob.customer_no,$scope.customerData)},
        sales : {  no:singleJob.owner_no, name:getListName(singleJob.owner_no,$scope.userData)},
        status : {  no:singleJob.status, name:getListName(singleJob.status,$scope.jobOption['status'].list)},
        printVer : {  no:singleJob.print_version, name:getListName(singleJob.print_version,$scope.jobOption['printVer'].list)},
        printVerOther : '',
        printType : {  no:singleJob.print_sample, name:getListName(singleJob.print_sample,$scope.jobOption['printType'].list)},
        printColor : {  no:singleJob.brush_color, name:getListName(singleJob.brush_color,$scope.jobOption['printColor'].list)}
      };


      singleJob['price'] = {
                            unit:parseInt(singleJob.price),
                            total:parseInt(singleJob.total_price)
                          };

      return singleJob;

    }

    var getJobListData = function(){

      var params = {
            stime : Math.floor(new Date($scope.searchRange.startDate).getTime()/1000),
            etime : Math.floor(new Date($scope.searchRange.endDate).getTime()/1000),
            limit : $scope.pageSetting.maxPageSize*$scope.pageSetting.perPage,
            status : 0,
            offset : $scope.pageSetting.offset
          };

      if($scope.searchRange.keyWordVal!=='' && $scope.searchRange.selectKeyWordType.val!=='customer'){
        params[$scope.searchRange.selectKeyWordType.val] = $scope.searchRange.keyWordVal;
      }

      if($scope.searchRange.selectKeyWordType.val==='customer'){
        params[$scope.searchRange.selectKeyWordType.val] = $scope.searchRange.selectedCustomer.no;        
      }

      httpService.sendRequest('getJobList', {params : params})
            .then(function(data){
                $scope.isLoading = false;
                $scope.pageSetting.totalCount = data.info[0].total;
                $scope.jobList = [];
                _.each(data.data,function(singleJob,i){
                  if(typeof singleJob === "object"){
                    singleJob = transJobDataContent(singleJob);
                    $scope.jobList.push(singleJob);
                  }
                })
                //$scope.jobList = data;
                setPageData();
            });
    }

    var setPageData = function(){
      var startIndex = $scope.pageSetting.perPage*($scope.pageSetting.currentPage-1) - $scope.pageSetting.offset,
          endIndex = $scope.pageSetting.perPage*($scope.pageSetting.currentPage) - $scope.pageSetting.offset,
          offset = $scope.pageSetting.perPage*$scope.pageSetting.maxPageSize*Math.floor(($scope.pageSetting.currentPage-1)/$scope.pageSetting.maxPageSize);

      if($scope.pageSetting.offset === offset){
        $scope.currentList = $scope.jobList.slice(startIndex,endIndex);
      }else{
        $scope.pageSetting.offset = offset;
        $scope.isLoading = true;
        getJobListData();
      }

    }

    var updateCompanySelectedList = function(){
      var selectedList = [];
      _.each($scope.jobDivision,function(singleDivision,i){
        _.each(singleDivision.list,function(data,i){
          if(parseInt(data.company.id)!==-1){selectedList.push(data.company)};
        })
      })

      $scope.companySelectedList = _.union(companySelectedDefault,selectedList);
      $scope.companySelectedList.sort(function(a, b){return a.id-b.id});

    }

    var setSelectedJobOptionName = function(job){
      _.each(job.content.jobOption,function(option,i){
        if(i !== 'customer' && i !== 'sales' ){
          option['name'] = getListName(option.id,$scope.jobOption[i].list);
        }
      });

      job.content.jobOption.customer['name'] = getListName(job.content.jobOption.customer.id,$scope.customerList);
      job.content.jobOption.sales['name'] = getListName(job.content.jobOption.sales.id,$scope.salesList);

    }
    var getListName = function(no,list){
      if(list.length>0){
        for(var i = 0; i<list.length; i++){
          if(no.toString()===list[i].no.toString()){
            return list[i].name;
          }
        }        
        return list[0].name;
      }
    }

    var backToList = function(){
      $scope.viewMode = 0;
      $scope.isLoading = true;
      getTicketsUnitData();      
    }

  }]);

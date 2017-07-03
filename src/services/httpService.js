'use strict';

let $ = require("jquery");

angular.module('erpProjApp')
    .factory('httpService', ['$http', '$q', '$location', function ($http, $q, $location) {
        //var baseUrl = "http://spalch.net/erpsystem",
        var baseUrl = "erpApi",
            serverApi = {
                'getCustomerList': {
                    method: 'GET',
                    url: baseUrl + '/api.php/customers/'
                },
                'createCustomer': {
                    method: 'POST',
                    url: baseUrl + '/api.php/customers/'
                },
                'updateCustomer': {
                    method: 'PUT',
                    url: baseUrl + '/api.php/customers/'
                },
                'deleteCustomer': {
                    method: 'DELETE',
                    url: baseUrl + '/api.php/customers/'
                },
                'getVendorsCategory': {
                    method: 'GET',
                    url: baseUrl + '/api.php/vendors_category/'
                },
                'getVendorList': {
                    method: 'GET',
                    url: baseUrl + '/api.php/vendors/'
                },
                'createVendor': {
                    method: 'POST',
                    url: baseUrl + '/api.php/vendors/'
                },
                'updateVendor': {
                    method: 'PUT',
                    url: baseUrl + '/api.php/vendors/'
                },
                'deleteVendor': {
                    method: 'DELETE',
                    url: baseUrl + '/api.php/vendors/'
                },
                'getUserList': {
                    method: 'GET',
                    url: baseUrl + '/api.php/users/'
                },
                'createUser': {
                    method: 'POST',
                    url: baseUrl + '/api.php/users/'
                },
                'updateUser': {
                    method: 'PUT',
                    url: baseUrl + '/api.php/users/'
                },
                'deleteUser': {
                    method: 'DELETE',
                    url: baseUrl + '/api.php/users/'
                },
                'getJobList': {
                    method: 'GET',
                    url: baseUrl + '/api.php/tickets/'
                },
                'getSingleJobContent': {
                    method: 'GET',
                    url: baseUrl + '/api.php/tickets/'
                },
                'createJob': {
                    method: 'POST',
                    url: baseUrl + '/api.php/tickets/'
                },
                'updateJob': {
                    method: 'PUT',
                    url: baseUrl + '/api.php/tickets/'
                },
                'getTicketsUnits': {
                    method: 'GET',
                    url: baseUrl + '/api.php/tickets_unit/'
                },
                'addTicketsUnits': {
                    method: 'POST',
                    url: baseUrl + '/api.php/tickets_unit/'
                },
                'getPayList': {
                    method: 'GET',
                    url: baseUrl + '/api.php/payment/'
                },
                'createPay': {
                    method: 'POST',
                    url: baseUrl + '/api.php/payment/'
                },
                'updatePay': {
                    method: 'PUT',
                    url: baseUrl + '/api.php/payment/'
                },
                'getBillList': {
                    method: 'GET',
                    url: baseUrl + '/api.php/requirement/'
                },
                'createBill': {
                    method: 'POST',
                    url: baseUrl + '/api.php/requirement/'
                },
                'updateBill': {
                    method: 'PUT',
                    url: baseUrl + '/api.php/requirement/'
                },
                'userLogin': {
                    method: 'POST',
                    url: baseUrl + '/login.php'
                },
                'userLogout': {
                    method: 'POST',
                    url: baseUrl + '/logout.php?mod=signout'
                },
            };

        return {
            sendRequest: function(apikey, config){
                var defered = $q.defer(),
                    promise = defered.promise,
                    httpParams = angular.extend({
                            headers: {
                                'Pragma': 'no-cache',
                                'Cache-Control': 'no-cache',
                                'Expires': -1
                            },
                            method: null,
                            url: null,
                            data: null,
                            params: null
                        }, serverApi[apikey]);

                if ( config !== null && config !== undefined ) {
                    httpParams.data = config.data;
                    httpParams.params = config.params;
                    if (config.urlParams !== undefined) {
                        httpParams.url += config.urlParams;
                    }
                    if (config.beforeSend !== undefined) { config.beforeSend();}
                }

                if(apikey==='userLogin'){
                    httpParams['headers']['Content-Type'] = 'application/x-www-form-urlencoded';
                    httpParams['data'] = $.param(config.data);
                }

                $http(httpParams)
                    .then(function(data){

                        if(data.data==='-1'){
                            $location.path('/login');
                        }else{
                            defered.resolve(data.data);
                        }

                    });

                return promise;
            }
        };
    }]);

import './styles/main.scss';
import 'ngstorage'
import 'angular-ui-bootstrap'

import angular from 'angular'
import ngRoute from 'angular-route'
import ngTouch from 'angular-touch'
import ngAnimate from 'angular-animate'
//import ngResource from'ng-resource'

import accordion from 'angular-ui-bootstrap/src/accordion';
import datepicker from 'angular-ui-bootstrap/src/datepicker';
import dropdown from 'angular-ui-bootstrap/src/dropdown';
import modal from 'angular-ui-bootstrap/src/modal';


angular
  .module('erpProjApp', [
    ngRoute,
    ngTouch,
    ngAnimate,
    'ui.bootstrap',
    'ngStorage'
  ])
  .config(['$routeProvider','$locationProvider',function ($routeProvider,$locationProvider) {
  	$locationProvider.hashPrefix('');
    $routeProvider
		.when('/', {
			template: require('./views/job.html'),
	        controller: 'JobCtrl',
	        controllerAs: 'job'
		})
		.when('/login', {
			template: require('./views/login.html'),
	        controller: 'LoginCtrl',
	        controllerAs: 'login'
		})
		.when('/users', {
			template: require('./views/user.html'),
	        controller: 'UserCtrl',
	        controllerAs: 'user'
		})
		.when('/vendors', {
			template: require('./views/vendors.html'),
	        controller: 'VendorsCtrl',
	        controllerAs: 'vendors'
		})
	  	.when('/customer', {
			template: require('./views/customer.html'),
	        controller: 'CustomerCtrl',
	        controllerAs: 'vendors'
		})
	  	.when('/payment', {
			template: require('./views/payment.html'),
	        controller: 'PaymentCtrl',
	        controllerAs: 'payment'
		})
	  	.when('/bill', {
			template: require('./views/bill.html'),
	        controller: 'BillCtrl',
	        controllerAs: 'bill'
		})
	    .otherwise({
    	    redirectTo: '/'
      	});
  }]);

require('./services');
require('./directives');
require('./controllers');
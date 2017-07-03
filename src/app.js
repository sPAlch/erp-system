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


angular
  .module('erpProjApp', [
    ngRoute,
    ngTouch,
    ngAnimate,
	accordion,
	datepicker,
	dropdown,
    'ui.bootstrap',
    'ngStorage'
  ])
  .config(function ($routeProvider) {
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
      .otherwise({
        redirectTo: '/'
      });
  });

require('./controllers');
require('./directives');
require('./services');
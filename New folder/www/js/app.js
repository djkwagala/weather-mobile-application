// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers' ,'ngStorage','angularSoundManager'])

//creating a factory for the application to run
.factory('StorageService', function($localStorage){
	//initiallizing the localstorage space
	$localStorage = $localStorage.$default({
		cart_items:[]
	})
	


	var _getAll = function(){
		return $localStorage.cart_items;

	}

//adding items
	var _add = function(thing){
		return $localStorage.cart_items.push(thing);

	}
//removing the items from the storage
	var _remove = function(thing){
		return $localStorage.cart_items.splice($local_storage.cart_items.inexOf(thing));
	}
	
	return{
	getAll:_getAll,
	add:_add,
	remove:_remove
	
	};
	
})



.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.common_items', {
    url: '/common_items',
    views: {
      'menuContent': {
        templateUrl: 'templates/common_items.html',
		controller: 'common_products_controller'
      }
    }
  })

  .state('app.laundry', {
      url: '/laundry',
      views: {
        'menuContent': {
          templateUrl: 'templates/laundry.html',
		   controller: 'common_products_controller'
        }
      }
    })
	.state('app.scholastics', {
      url: '/scholastics',
      views: {
        'menuContent': {
          templateUrl: 'templates/Scholastics.html',
		   controller: 'common_products_controller'
        }
      }
    })
	.state('app.snack', {
      url: '/snack',
      views: {
        'menuContent': {
          templateUrl: 'templates/snack.html',
		   controller: 'common_products_controller'
        }
      }
    })
    .state('app.utensils', {
      url: '/utensils',
      views: {
        'menuContent': {
          templateUrl: 'templates/utensils.html',
		   controller: 'common_products_controller'
        }
      }
    })
    .state('app.vegetables', {
      url: '/vegetables',
      views: {
        'menuContent': {
          templateUrl: 'templates/vegetables.html',
          controller: 'common_products_controller'
        }
      }
    })

  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/common_items');
});

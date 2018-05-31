angular.module('starter.controllers', ['angularSoundManager'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('common_products_controller', function($scope, $compile, StorageService) {

//getting the elements in the local storage
$scope.cart_items = StorageService.getAll();

//adding elements to the local storage
$scope.add = function(new_thing){
StorageService.add(new_thing);
}

//removing elements from  the local storage
$scope.remove = function(new_thing){
StorageService.remove(new_thing);
}


//array for keeping common_items
 $scope.common_items =[
{category: "milk", image: "img/milk.jpg"},
{category: "bread", image: "img/bread.jpg"},
{category: "youghurt", image: "img/yoghurt.jpg"},
{category: "Blue band", image: "img/blueband.jpg"},
{category: "omo", image: "img/omo.jpg"},
{category: "milk", image: "img/milk.jpg"},
{category: "milk", image: "img/milk.jpg"},
{category: "bread", image: "img/bread.jpg"},
{category: "yorghurt", image: "img/yoghurt.jpg"},
{category: "blue band", image: "img/blueband.jpg"},
{category: "omo", image: "img/omo.jpg"},
{category: "milk", image: "img/milk.jpg"}
]
//array for keeping the laundry items
 $scope.laundry =[
{category: "milk", image: "img/milk.jpg"},
{category: "bread", image: "img/bread.jpg"},
{category: "youghurt", image: "img/yoghurt.jpg"},
{category: "Blue band", image: "img/blueband.jpg"},
{category: "omo", image: "img/omo.jpg"},
{category: "milk", image: "img/milk.jpg"},
{category: "milk", image: "img/milk.jpg"},
{category: "bread", image: "img/bread.jpg"},
{category: "yorghurt", image: "img/yoghurt.jpg"},
{category: "blue band", image: "img/blueband.jpg"},
{category: "omo", image: "img/omo.jpg"},
{category: "milk", image: "img/milk.jpg"}
]
//array for keeping the scholastics
 $scope.scholarstics =[
{category: "milk", image: "img/milk.jpg"},
{category: "bread", image: "img/bread.jpg"},
{category: "youghurt", image: "img/yoghurt.jpg"},
{category: "Blue band", image: "img/blueband.jpg"},
{category: "omo", image: "img/omo.jpg"},
{category: "milk", image: "img/milk.jpg"},
{category: "milk", image: "img/milk.jpg"},
{category: "bread", image: "img/bread.jpg"},
{category: "yorghurt", image: "img/yoghurt.jpg"},
{category: "blue band", image: "img/blueband.jpg"},
{category: "omo", image: "img/omo.jpg"},
{category: "milk", image: "img/milk.jpg"}
]
//array for keeping the snacks
 $scope.snacks =[
{category: "milk", image: "img/milk.jpg"},
{category: "bread", image: "img/bread.jpg"},
{category: "youghurt", image: "img/yoghurt.jpg"},
{category: "Blue band", image: "img/blueband.jpg"},
{category: "omo", image: "img/omo.jpg"},
{category: "milk", image: "img/milk.jpg"},
{category: "milk", image: "img/milk.jpg"},
{category: "bread", image: "img/bread.jpg"},
{category: "yorghurt", image: "img/yoghurt.jpg"},
{category: "blue band", image: "img/blueband.jpg"},
{category: "omo", image: "img/omo.jpg"},
{category: "milk", image: "img/milk.jpg"}
]
//array for keeping the utensils
 $scope.utensils =[
{category: "milk", image: "img/milk.jpg"},
{category: "bread", image: "img/bread.jpg"},
{category: "youghurt", image: "img/yoghurt.jpg"},
{category: "Blue band", image: "img/blueband.jpg"},
{category: "omo", image: "img/omo.jpg"},
{category: "milk", image: "img/milk.jpg"},
{category: "milk", image: "img/milk.jpg"},
{category: "bread", image: "img/bread.jpg"},
{category: "yorghurt", image: "img/yoghurt.jpg"},
{category: "blue band", image: "img/blueband.jpg"},
{category: "omo", image: "img/omo.jpg"},
{category: "milk", image: "img/milk.jpg"}
]
//array for keeping the vegetables
 $scope.vegetables =[
{category: "milk", image: "img/milk.jpg"},
{category: "bread", image: "img/bread.jpg"},
{category: "youghurt", image: "img/yoghurt.jpg"},
{category: "Blue band", image: "img/blueband.jpg"},
{category: "omo", image: "img/omo.jpg"},
{category: "milk", image: "img/milk.jpg"},
{category: "milk", image: "img/milk.jpg"},
{category: "bread", image: "img/bread.jpg"},
{category: "yorghurt", image: "img/yoghurt.jpg"},
{category: "blue band", image: "img/blueband.jpg"},
{category: "omo", image: "img/omo.jpg"},
{category: "milk", image: "img/milk.jpg"}
]

//the broadened all items
$scope.all_items =[
{category: "milk", image: "img/milk.jpg", name:"jesa", price:2000, measure:"1 litre"},
{category: "bread", image: "img/bread.jpg", name :"kiddawalime", price:4000, measure: "1 loaf" },
{category: "youghurt", image: "img/yoghurt.jpg", name: "jesa", price: 2000, measure: "500 mls"},
{category: "Blue band", image: "img/blueband.jpg",name: "blueband white", price: 1000, measure: "250g"},
{category: "omo", image: "img/omo.jpg",name: "omo", price: 500, measure: "250g"},
{category: "milk", image: "img/milk.jpg",name: "fresh diary", price: 2000, measure: "1 litre"},
{category: "milk", image: "img/milk.jpg",name: "mama", price: 2000, measure: "1 litre"},
{category: "bread", image: "img/bread.jpg", name: "denovo", price: 4000, measure:"1 loaf"},
{category: "yorghurt", image: "img/yoghurt.jpg",name: "kanyake", price: 2000, measure: "500 mls"},
{category: "blue band", image: "img/blueband.jpg", name: "magarine", price: 1000, measure:"250g"},
{category: "omo", image: "img/omo.jpg", name: "aerial", price:500, measure:"250g"},
{category: "milk", image: "img/milk.jpg", name: "mega", price:2000, measure:"500 mls"}

]
//function to show the common items when back button is pressed
$scope.showOptionMenu = function(){
	$("#common_itemsx").show();
	$("#item_selectedx").hide();
	$("#cart_addition").hide();
	$("#back_button").hide();
}


var name="";
//function to show list of items in a given sub category selected
	$scope.openCustom = function (name_of_item){
	$("#common_itemsx").hide()
	$("#cart_addition").hide()
	
	$("#item_selectedx").show()
	
		for(i =0; i< $scope.all_items.length; i++){
					if($scope.all_items[i].category == name_of_item){
					$scope.selectedItemx.push({image:$scope.all_items[i].image,name:$scope.all_items[i].name, measure:$scope.all_items[i].measure, price:$scope.all_items[i].price});
				}
	
	}
	
	var contente_to_add= '<div style=" width:100%;">'+
							'<table style="text-align:center">'+
							'<thead>'+
							'<th style="text-align:center; width:10%;" ng-click="showOptionMenu()"><button style="font-size:20px; background:transparent; border:0px; "><span style="font-size:20px; margin-top:40px;" class="icon icon ion-arrow-left-c" ></span></button</th>'+
							'<th style="font-size:15px; text-align:center;width:80%;">'+name_of_item+'</th>'+
							'<th style="text-align:center; width:10%;"></th>'+
							' </thead>'+
							'</table>'+
							' </div>';
							
			contente_to_add += '<div><ion-list >';
					//var name = $scope.all_items[i].image;
					contente_to_add +=	' <ion-item class ="item item-avatar" ng-repeat="n in selectedItemx" ng-click ="add_to_cart_item(n)">'+

							' <img src ="{{n.image}}"/>'+

							'<p style="color:#434343; margin-top:-2px;">{{n.name}}</p>'+
							' <p style="color:#A2A2A2; margin-top:7px;">{{n.measure}} = {{n.price}}</p>'+
							
							'</ion-item>';
							
					
					
			
			
			contente_to_add +=' </ion-list></div>';
					
		
		
		
				
							
				
	
	document.getElementById("item_selectedx").innerHTML=contente_to_add;

$compile(document.getElementById("item_selectedx"))($scope);
	
	}

$scope.items ={
	item_name: "",
	price: null,
	quantity: null,
	measure: "",
	getPrice: function(){
	var itemsobject;
	itemsobject = $scope.items;
	return itemsobject.price*itemsobject.quantity;
	
	},
	setPrice: function(n){
	var itemsobject;
	itemsobject = $scope.items;
	itemsobject.price = n;
	
	return itemsobject.price;
	
	},
	setName: function(nl){
	var itemsobjectc;
	itemsobjectc = $scope.items;
	itemsobjectc.item_name = nl;
	
	return itemsobjectc.item_name;
	
	},
	setMeasure: function(nl){
	var itemsobjectc;
	itemsobjectc = $scope.items;
	itemsobjectc.measure = nl;
	
	return itemsobjectc.measure;
	
	}


}	
	
	
//function to add an element to a cart	
$scope.add_to_cart_item = function(name_of_the_item_selected){

	$("#common_itemsx").hide()
	$("#item_selectedx").hide()
	$("#cart_addition").show()
	$("#cart_contents").hide()
	
	var contente ='<div class="card">'+
			'<div class="item item-avatar">'+
			'<img src="'+name_of_the_item_selected.image+'">'+
			'<h2  ng-model="items.item_name">{{items.setName("'+name_of_the_item_selected.name+'")}}</h2>'+ 
			'</div>'+
			'<div class="item item-body">'+
			'<div class="list">'+
			'<label class="item item-input"><span class="input-label"> item measure</span>'+
			'<span class="input-label" ng-model="items.measure" >{{items.setMeasure("'+name_of_the_item_selected.measure+'")}}</span>'+
			'</label>'+
			'<label class="item item-input"><span class="input-label"> item price</span>'+
		    '<span class="input-label" ng-model="items.price">{{items.setPrice('+name_of_the_item_selected.price+')}}</span>'+
			'</label>'+
			'<label class="item item-input">'+
			'<span class="input-label">enter quantity</span>'+
			'<input type="number" id="quant" ng-model="items.quantity" placeholder="1" >'+
		 		   '</label>'+
				   '<label class="item item-input">'+
			'<span class="input-label">TOTAL : {{items.getPrice()}}</span>'+
				   '</label>'+
			
			'</div><button class="btn-primary" ng-click="juju()">cancel</button><br/>'+
			'<button class="btn-success" ng-click="add_to_cart()">Add to cart </button>'+
			  
			'</div></div>';
	
	

document.getElementById("cart_addition").innerHTML=contente;

$compile(document.getElementById("cart_addition"))($scope);



}	


//function to move back to list items menu	
$scope.juju =function(){
	
	$("#ading_to_car").hide();
	$("#common_itemsx").hide();
	$("#cart_addition").hide();
	$("#item_selectedx").show();
	//alert($scope.cart_items);
	
} 

//function to add element to cart
$scope.elements_array =[]

$scope.add_to_cart = function(){

$scope.elements_array.push({name:$scope.items.item_name, measure:$scope.items.measure, price:$scope.items.price, quantity:$scope.items.quantity, total:$scope.items.getPrice()});
	$("#ading_to_car").hide();
	$("#common_itemsx").hide();
	$("#cart_addition").hide();
	$("#item_selectedx").show();
if(!$scope.elements_array.length== 0){
document.getElementById("place_order").disabled=false;
document.getElementById("cart_button").disabled=false;
}	
}


$scope.calculateTotal = function(){
	var sum =0;
	for(i =0; i< $scope.elements_array.length; i++){
					
	
	sum+= $scope.elements_array[i].total;
	
	}

	return sum;

}


$scope.open_cart_contents = function(){
$("#cart_addition").hide();
$("#common_itemsx").hide();
$("#item_selectedx").hide();
$("#back_button").show();
	
$("#cart_contents").show();

	var selectEd ='<div class="card"><div class="item item-divider">Items in the cart</div><div class="item item-text-wrap"><table class="table" style="margin-top:-5px;"><thead><tr><th>Name</th><th>Measure</th><th>Quantity</th><th>Total</th></tr></thead>'+
	'<tr ng-repeat="n in elements_array" ng-click="add_to_cart_item(n); elements_array.splice(elements_array.inexOf(n))"><td>{{n.name}}</td><td>{{n.measure}}</td><td>{{n.quantity}}</td><td>{{n.total}}</td></tr>'+
	'</table></div><div class="item item-divider">TOTAL<span style="float:right; color:red; right:5%;">{{calculateTotal()}}</span></div></div>';
 
document.getElementById("cart_contents").innerHTML=selectEd;

$compile(document.getElementById("cart_contents"))($scope);
		
}
$scope.returnToAdding = function(){
$("#cart_addition").hide();
	$("#common_itemsx").show();
	$("#item_selectedx").hide();
	$("#back_button").hide();
	$("#cart_contents").hide();
}

$scope.selectedItemx = [];


$scope.onload = function(){
if($scope.elements_array.length== 0){
document.getElementById("place_order").disabled=true;
document.getElementById("cart_button").disabled=true;
}
$("#back_button").hide();
$("#cart_addition").hide();
}


$scope.songs = [
            {
                id: 'one',
                title: 'Rain',
                artist: 'Drake',
                url: 'http://www.schillmania.com/projects/soundmanager2/demo/_mp3/rain.mp3'
            },
            {
                id: 'two',
                title: 'Walking',
                artist: 'Nicki Minaj',
                url: 'http://www.schillmania.com/projects/soundmanager2/demo/_mp3/walking.mp3'
            },
            {
                id: 'three',
                title: 'Barrlping with Carl (featureblend.com)',
                artist: 'Akon',
                url: 'http://www.freshly-ground.com/misc/music/carl-3-barlp.mp3'
            },
            {
                id: 'four',
                title: 'Angry cow sound?',
                artist: 'A Cow',
                url: 'http://www.freshly-ground.com/data/audio/binaural/Mak.mp3'
            },
            {
                id: 'five',
                title: 'Things that open, close and roll',
                artist: 'Someone',
                url: 'http://www.freshly-ground.com/data/audio/binaural/Things%20that%20open,%20close%20and%20roll.mp3'
            }
        ];
});


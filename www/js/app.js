var db = null;
var observDataFetched = [];
var metarDataFetched = [];
var moreDataFetched = [];

var stationnamefetched = "";
var stationnumberfetched = "";
var OriginalUserName ="";
var Latitude = "";
var Longitude = "";
var stationnumberfetched = "";
var firstLogin =false;

angular.module('wimeaApp',['ionic','ionic.contrib.drawer', 'ngCordova'])
.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }


   db = window.openDatabase("my.db", '1', 'my', 1024 * 1024 * 100);

  //db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
  // db = window.sqlitePlugin.openDatabase("my.db");

   $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS usersDetailsTab(username, password, stationName,stationNumber,lat,long)");
   $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS metarData (Date,StationName, StationNumber, TIME, METARSPECI, CCCC, YYGGgg, Dddfffmfm, WWorCOVAK, W1W1, NlCCNmCCNhCC, Air_temperature, Dew_temperature, Wet_bulb, TTTdTd, Qnhhpa, Qnhin, Qfehpa, Qfein, REW1W1, CreationDate, SubmittedBy)");
   $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS moreFormTable (Date, StationName, StationNumber, TIME, UnitOfWindSpeed, IndOrOmissionOfPrecipitation, TypeOfStation_Present_Past_Weather, HeightOfLowestCloud, StandardIsobaricSurface, GPM, DurationOfPeriodOfPrecipitation, Past_Weather, GrassMinTemp, CI_OfPrecipitation, BE_OfPrecipitation, IndicatorOfTypeOfIntrumentation, DurationOfSunshine, SignOfPressureChange, Supp_Info, VapourPressure, Wind_Run, T_H_Graph,SubmittedBy, CreationDate)");
   $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS observation_detail_Table(Date,  StationName,  StationNumber,  TIME,SPECITIME,  TotalAmountOfAllClouds, TotalAmountOfLowClouds, TypeOfLowClouds, OktasOfLowClouds, HeightOfLowClouds, CLCODEOfLowClouds, TypeOfMediumClouds, OktasOfMediumClouds, HeightOfMediumClouds, CLCODEOfMediumClouds,TypeOfHighClouds, OktasOfHighClouds, HeightOfHighClouds, CLCODEOfHighClouds, TypeOfLowClouds2, OktasOfLowClouds2, HeightOfLowClouds2, CLCODEOfLowClouds2,     TypeOfMediumClouds2,"+
   "OktasOfMediumClouds2, HeightOfMediumClouds2, CLCODEOfMediumClouds2,TypeOfHighClouds2, OktasOfHighClouds2, HeightOfHighClouds2, CLCODEOfHighClouds2, TypeOfLowClouds3, OktasOfLowClouds3, HeightOfLowClouds3, CLCODEOfLowClouds3, TypeOfMediumClouds3, OktasOfMediumClouds3, HeightOfMediumClouds3, CLCODEOfMediumClouds3,TypeOfHighClouds3, OktasOfHighClouds3, HeightOfHighClouds3, CLCODEOfHighClouds3,"+
   "CloudSearchLightReading, Rainfall,Dry_Bulb, Wet_Bulb, Max_Read, Max_Reset,Min_Read,  Min_Reset,Piche_Read,Piche_Reset,TimeMarksThermo,TimeMarksHygro,TimeMarksRainRec , Present_Weather,Visibility,Wind_Direction,Wind_Speed ,Gusting,windrun,sunshineduration,AttdThermo,PrAsRead,Correction,CLP,MSLPr,TimeMarksBarograph,TimeMarksAnemograph,OtherTMarks,Remarks,SubmittedBy,CreationDate)");

   var queryuser = "SELECT * FROM usersDetailsTab";
   $cordovaSQLite.execute(db, queryuser).then(function(res) {
       if(res.rows.length > 0) {
         OriginalUserName = res.rows.item(0).username;
         stationnamefetched = res.rows.item(0).stationName;
          stationnumberfetched = res.rows.item(0).stationNumber;
          Longitude= res.rows.item(0).long;
          Latitude= res.rows.item(0).lat;

       }else{

firstLogin=true;

       }
     })


   var query = "SELECT * FROM observation_detail_Table";
   $cordovaSQLite.execute(db, query).then(function(res) {
     var i=0;
       if(res.rows.length > 0) {
          // alert("SELECTED -> " + res.rows.item(0).StationName + " " + res.rows.item(0).StationNumber);
            while(i<res.rows.length){
           observDataFetched.push(res.rows.item(i).TIME);

           i++;
         }
          //  alert(observDataFetched.length);
       } else {
           console.log("No results found");
       }
   }, function (err) {
       console.error(err);
   });

   var queryMeta = "SELECT * FROM metarData";
   $cordovaSQLite.execute(db, queryMeta).then(function(res) {
     var i=0;
       if(res.rows.length > 0) {
          // alert("SELECTED -> " + res.rows.item(0).StationName + " " + res.rows.item(0).StationNumber);
            while(i<res.rows.length){
           metarDataFetched.push(res.rows.item(i).TIME);
           i++;
         }
         //alert(metarDataFetched.length);

       } else {
           console.log("No results found");
       }
   }, function (err) {
       console.error(err);
   });

   var queryMore = "SELECT * FROM moreFormTable";
   $cordovaSQLite.execute(db, queryMore).then(function(res) {
     var i=0;
       if(res.rows.length > 0) {
          // alert("SELECTED -> " + res.rows.item(0).StationName + " " + res.rows.item(0).StationNumber);
          while(i<res.rows.length){
           moreDataFetched.push(res.rows.item(i).TIME);

           i++;
         }
         //alert(moreDataFetched.length)
       } else {
           console.log("No results found");
       }
   }, function (err) {
       console.error(err);
   });
  });
})
.config(function($stateProvider,$urlRouterProvider){

	//routing through the applications
	$stateProvider
	.state('main',{
		url : '/main',
		 abstract: true,
    	templateUrl: 'templates/main.html',
		controller:'menuCtrl'

	})
	.state('login',{
		url : '/login',
		templateUrl: 'templates/login.html',
		controller:'loginCtrl'
	})
	.state('main.observationform',{
		url : '/observationform',
		views: {
		'menuContent': {
     	templateUrl: 'templates/observationform.html',
		controller:'observationformCtrl'
		}
		}
	})
  .state('main.pendingUpload',{
		url : '/pendingUpload',
		views: {
		'menuContent': {
     	templateUrl: 'templates/pendingUploads.html',
		controller:'pendingUploadCtrl'
		}
		}
	})
	.state('observationform2',{
		url : '/observationform2',
		templateUrl: 'templates/observationform2.html',
		controller:'observationform2Ctrl'

	})

	.state('main.moreformfieldsform',{
		url : '/moreformfieldsform',
		views: {
		'menuContent': {
     	templateUrl: 'templates/moreformfieldsform.html',
		controller:'moreformfieldsformCtrl'
		}
		}
	})

	$urlRouterProvider.otherwise('/login');

})

.factory('mobileDb', function (){

  function initDB() {

  			  db = $cordovaSQLite.openDB("myapp.db");

  			   var query = "CREATE TABLE IF NOT EXISTS trackers_list (id in-teger autoincrement primary key, name string)";
  			    runQuery(query,[],function(res) {
  			      console.log("table created ");
  			    }, function (err) {
  			      console.log(err);
  			    });

  		}

      return {
        createDb:function() {
          initDB();
        }

      }

})
.factory('GeoAlert', function() {
   console.log('GeoAlert service instantiated');
   var interval;
   var duration = 6000;
   var long, lat;
   var processing = false;
   var callback_positive;
    var callback_negative;
    var callback_error;
   var minDistance = 1;

   // Credit: http://stackoverflow.com/a/27943/52160
   function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
   }

   function deg2rad(deg) {
    return deg * (Math.PI/180)
   }

   function hb() {

       console.log('hb running');
       if(processing) return;
       processing = true;

       AdvancedGeolocation.start(function(success){

           try{
               var jsonObject = JSON.parse(success);

               switch(jsonObject.provider){
                   case "gps":
                   if(jsonObject.latitude != "0.0" || jsonObject.longitude != "0.0"){
                     processing = false;
                     console.log(jsonObject.latitude, jsonObject.longitude);
                     var dist = getDistanceFromLatLonInKm(lat, long, jsonObject.latitude, jsonObject.longitude);
                     console.log("dist in km is "+dist);
                     if(dist <= minDistance) callback_positive();
                     else callback_negative();
                   }else
                     alert("Detection Failed");

                       break;

                   case "network":
                   if(jsonObject.latitude != "0.0" || jsonObject.longitude != "0.0"){
                    // alert("detected");
                     processing = false;
                     console.log(jsonObject.latitude, jsonObject.longitude);
                     var dist = getDistanceFromLatLonInKm(lat, long, jsonObject.latitude, jsonObject.longitude);
                     console.log("dist in km is "+dist);
                     if(dist <= minDistance) callback_positive();
                     else callback_negative();
                   }else
                     alert("Detection Failed");

                       break;

                   case "satellite":
                        //TODO
                       break;

                   case "cell_info":
                    //TODO
                    break;

                   case "cell_location":
                    //TODO
                    break;

                   case "signal_strength":
                    //TODO
                    break;
               }
           }
           catch(exc){
               console.log("Invalid JSON: " + exc);
                alert("Invalid JSON: " + exc );
           }
       },
       function(error){
           console.log("ERROR! " + JSON.stringify(error));
          // alert("Try again when GPS Location is on! " );
           callback_error();

       },
       {
           "minTime":30*60000,         // Min time interval between updates (ms)
           "minDistance":1,       // Min distance between updates (meters)
           "noWarn":true,         // Native location provider warnings
           "providers":"all",     // Return GPS, NETWORK and CELL locations
           "useCache":true,       // Return GPS and NETWORK cached locations
           "satelliteData":false, // Return of GPS satellite info
           "buffer":false,        // Buffer location data
           "bufferSize":0,         // Max elements in buffer
           "signalStrength":false // Return cell signal strength data
       });


    }


   return {
     begin:function(lt,lg,cb_pos,cb_neg,cb_err) {
       long = lg;
       lat = lt;
       callback_positive = cb_pos;
       callback_negative=cb_neg;
       callback_error=cb_err;
       hb();
     },
     comfirmLocation: function(){
      cordova.plugins.diagnostic.isGpsLocationEnabled(function(available){
      console.log("Location is " + (available ? "available" : "not available"));

      if(!available){
        alert("Turn on Location");

        cordova.plugins.diagnostic.switchToLocationSettings();
       }

  }, function(error){
      console.error("The following error occurred: "+error);

  });
},end: function(){
  AdvancedGeolocation.kill(function(){
    //alert("stopped");
  },function(){
      alert("stop error");
  });
    },
     setTarget: function(lg,lt) {
       long = lg;
       lat = lt;
     }
   };

})
.service('LoginService', function ($q, $http) {
    var lat="";var long=""; var user=""; var userId=""; var userStationNo=""; var userStation="";
  return {
    loginUser: function (loginData) {
        var deferred = $q.defer(),
        promise = deferred.promise;


        $http({
          url: 'http://www.wimea.mak.ac.ug/wimeamobile/weatherMobile/loginMobile.php',
          method: "POST",
          data: loginData,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })    .then(function (response) {
          if (response.data.error.code === "000") {
            //console.log("User login successful: " + JSON.stringify(response.data));
            deferred.resolve("Welcome");
            user = response.data.userData.name;
            userId= response.data.userData.id;
            userStationNo=response.data.userData.stationNumber;
            userStation=response.data.userData.stationName;
            lat=response.data.userData.lat;
            long=response.data.userData.long;

          } else {
            //console.log("User login failed: " + JSON.stringify(response.data.error));
            deferred.reject("Wrong credential");
          }
        }, function (error) {
          //console.log("Server Error on login: " + JSON.stringify(error));
          deferred.reject("Wrong credential");
        });

        promise.success = function (fn) {
          promise.then(fn);
          return promise;
        };
        promise.error = function (fn) {
          promise.then(null, fn);
          return promise;
        };
        return promise;
      }, getUser: function(){
            return user;
      }, getUserId: function(){
            return userId;
      }, getUserStation: function(){
            return userStation;
      }
      , getUserStationNo: function(){
            return userStationNo;
      }, getLatitude: function(){
            return lat;
      }, getLongtude: function(){
            return long;
      }
}
})


.controller('loginCtrl', function($scope,  LoginService, $http, $ionicPopup,$state, $ionicModal, $cordovaSQLite) {

	$scope.opennav2 = function(){
	$state.go('main.observationform');
	}
  $scope.insertUserInDb = function(username, password, stationName,stationNumber,lat,long){

        var query = "INSERT INTO usersDetailsTab (username, password, stationName, stationNumber,lat,long) VALUES (?,?,?,?,?,?)";
        $cordovaSQLite.execute(db, query, [username, password, stationName,stationNumber,lat ,long]).then(function(res) {
            console.log("INSERT ID -> " + res.insertId);

        }, function (err) {
            console.error(err);
            //alert(JSON.stringify(err));
        });




    }

  $scope.data={};
  $scope.login = function() {

    $scope.loginData = {
      'userName' : $scope.data.username,
      'password' : $scope.data.password
    };



    if($scope.loginData.userName !=null && $scope.loginData.password !=null) {

      var query = "SELECT * FROM usersDetailsTab";
      $cordovaSQLite.execute(db, query).then(function(res) {
          if(res.rows.length > 0) {
            if($scope.data.username==res.rows.item(0).username && $scope.data.password==res.rows.item(0).password){
                $state.go('main.observationform');
            }else{
              var alertPopup = $ionicPopup.alert({
                title: 'Wrong credentials!',
                template: 'Please check your credentials!'
              });
            }
          }
          else{
            LoginService.loginUser($scope.loginData).success(function(data) {
                $scope.insertUserInDb($scope.loginData.userName,$scope.loginData.password,LoginService.getUserStation(), LoginService.getUserStationNo(),LoginService.getLatitude(), LoginService.getLongtude());
                var queryuser = "SELECT * FROM usersDetailsTab";
                $cordovaSQLite.execute(db, queryuser).then(function(res) {
                    if(res.rows.length > 0) {
                      OriginalUserName = res.rows.item(0).username;
                      stationnamefetched = res.rows.item(0).stationName;
                      stationnumberfetched = res.rows.item(0).stationNumber;
                      Longitude= res.rows.item(0).long;
                      Latitude= res.rows.item(0).lat;

                      //alert(stationnamefetched);

                    }else{
                      // alert("none");

                    }
                  })

            $state.go('main.observationform');


            }).error(function(data) {

if(firstLogin && window.Connection && navigator.connection.type == Connection.NONE){
              var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Internet connection required!'
              });
}else if(firstLogin){
  var alertPopup = $ionicPopup.alert({
    title: 'Login failed!',
    template: 'Wrong credentials or poor Internet'
  });
}else {
  var alertPopup = $ionicPopup.alert({
    title: 'Login failed!',
    template: 'Please check your credentials!'
  });
}
            });
          }
        })



}
else {
//alert();
//alert("Password or email is missing");
var alertPopup = $ionicPopup.alert({
title: 'Missing fields!',
template: 'Password or email is missing!'
});
}

}





})



.controller('pendingUploadCtrl', function($scope, GeoAlert,$state,$cordovaSQLite,$ionicPopup, $ionicModal, $http, mobileDb, LoginService){
//var observDataFetched =[];
  $scope.arrayOBV =[];
  $scope.arrayMore =[];
  $scope.arrayMeta =[];
    $scope.metaFormData ={};
  $scope.arrayOBV = observDataFetched;
  $scope.arrayMeta = metarDataFetched;
  $scope.arrayMore = moreDataFetched;


$scope.selectMetarData = function(Time) {
        var query = "SELECT * FROM metarData WHERE Time = ?";
        $cordovaSQLite.execute(db, query, [Time]).then(function(res) {
            if(res.rows.length > 0) {
              $scope.metaFormData={
              "qfehpa": res.rows.item(0).Qfehpa,
              "rew1w1": res.rows.item(0).REW1W1,
              "qfein": res.rows.item(0).Qfein,
              "qnhin": res.rows.item(0). Qnhin,
              "qnhhpa": res.rows.item(0).Qnhhpa,
              "TTTd": res.rows.item(0).TTTdTd,
              "N1ch":res.rows.item(0).NlCCNmCCNhCC,
               "airTemp": res.rows.item(0).Wet_bulb,
               "dewTemp": res.rows.item(0).Dew_temperature,
              "wetBulb": res.rows.item(0).Air_temperature,
              "w1w1": res.rows.item(0).W1W1,
              "wwwcavok": res.rows.item(0).WWorCOVAK,
              "dddff": res.rows.item(0).Dddfffmfm,
              "yygggg": res.rows.item(0).YYGGgg,
              "cccc": res.rows.item(0).CCCC,
              "speci": res.rows.item(0). METARSPECI,
              "timesubmitted": res.rows.item(0). TIME,
              "snumber": res.rows.item(0).StationNumber,
              "sname": res.rows.item(0).StationName,
              "datesubmitted": res.rows.item(0).Date
              }
              if(window.Connection) {
                          if(navigator.connection.type == Connection.NONE) {
                              $ionicPopup.confirm({
                                  title: "Internet not available",
                                  content: "The data cant be submitted."
                              })
                              .then(function(result) {
                                  if(!result) {
                                    //  ionic.Platform.exitApp();
                                  }
                              });
                          }
                          else{
                            var confirmPopup = $ionicPopup.confirm({
                               title: 'confirm subimssion',
                               template: 'The data will be submitted'
                            });

                            confirmPopup.then(function(res) {
                               if(res) {
                                $scope.sendMetarDataToDb($scope.metaFormData, Time);
                              //  $scope.deleteRowFromDb(Time);
                               } else {
                                  console.log('Not sure!');
                               }
                            });
                          }
                      }
                      else{
                        var confirmPopup = $ionicPopup.confirm({
                           title: 'confirm subimssion',
                           template: 'Are you sure? Changes cant be made after this'
                        });

                        confirmPopup.then(function(res) {
                           if(res) {
                              $scope.sendMetarDataToDb($scope.metaFormData, Time);

                           } else {
                              console.log('Not sure!');
                           }
                        });
                      }

                //console.log("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
        });
    }


    $scope.deleteRowFromDb= function(Time){
      var query = "DELETE FROM metarData where Time = ?";
      $cordovaSQLite.execute(db, query, [Time]).then(function(res) {
      //$cordovaSQLite.execute(db, query).then(function(res) {
          if(res.rows.length > 0) {
              alert("successfully Delted");
          } else {
            metarDataFetched.pop(Time);
              console.log("No results found");
          }
      }, function (err) {
          console.error(err);
      });
    }



  $scope.sendMetarDataToDb = function(data_to_send, Time) {

    $http({
  method : "POST",
  url : "http://www.wimea.mak.ac.ug/wimeamobile/weatherMobile/metaform.php",
  data: data_to_send,
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }).then(function mySuccess(response) {
      $scope.deleteRowFromDb(Time);
    var alertPopup = $ionicPopup.alert({
      title: 'Successful',
      template: 'Your data has been submitted!'
    });

  }, function myError(response) {
    var alertPopup = $ionicPopup.alert({
      title: 'Failed',
      template: 'Please check your network'
    });
});
          }

  $scope.sendDataOnline = function(field){
      $scope.selectMetarData(field);



  }

//submitting data for moreform

$scope.selectMoreData = function(Time) {
        var query = "SELECT * FROM moreFormTable WHERE Time = ?";
        $cordovaSQLite.execute(db, query, [Time]).then(function(res) {
            if(res.rows.length > 0) {
$scope.moreformData={
    "thgraph": res.rows.item(0).T_H_Graph,
     "vapourpressure": res.rows.item(0).VapourPressure,
     "SupplementaryInformation": res.rows.item(0).Supp_Info,
     "SignofPressureChange": res.rows.item(0).SignOfPressureChange,
     "Indicatoroftypeofintrumentation": res.rows.item(0).IndicatorOfTypeOfIntrumentation,
     "BeginningorEndofPrecipitation": res.rows.item(0).BE_OfPrecipitation,
      "CharacterandIntensityofPrecipitation": res.rows.item(0).CI_OfPrecipitation,
      "GrassMininumtemperature": res.rows.item(0).GrassMinTemp,
      "PastWeather": res.rows.item(0).Past_Weather,
      "DurationOfPeriodOfPrecipitation": res.rows.item(0).DurationOfPeriodOfPrecipitation,
      "geopotential":res.rows.item(0).GPM,
      "Standardisobaricsurface": res.rows.item(0).StandardIsobaricSurface,
      "HeightOfLowestCloud": res.rows.item(0).HeightOfLowestCloud,
      "Typeofstationpresentpastweather": res.rows.item(0).TypeOfStation_Present_Past_Weather,
      "Indoromissionofprecipitation": res.rows.item(0).IndOrOmissionOfPrecipitation,
      "UnitofWindSpeed": res.rows.item(0).UnitOfWindSpeed,
      "time": res.rows.item(0).TIME,
      "StationNumber": res.rows.item(0).StationNumber,
      "StationName": res.rows.item(0).StationName,
      "date": res.rows.item(0).Date,
      "SubmittedBy": '900',
      "DeviceType":"mobile"

    }


              if(window.Connection) {
                          if(navigator.connection.type == Connection.NONE) {
                              $ionicPopup.confirm({
                                  title: "Internet not available",
                                  content: "The data cant be submitted."
                              })
                              .then(function(result) {
                                  if(!result) {
                                    //  ionic.Platform.exitApp();
                                  }
                              });
                          }
                          else{
                            var confirmPopup = $ionicPopup.confirm({
                               title: 'confirm subimssion',
                               template: 'The data will be submitted'
                            });

                            confirmPopup.then(function(res) {
                               if(res) {
                                $scope.sendMoreDataToDb($scope.moreformData, Time);
                              //  $scope.deleteRowFromDb(Time);
                               } else {
                                  console.log('Not sure!');
                               }
                            });
                          }
                      }
                      else{
                        var confirmPopup = $ionicPopup.confirm({
                           title: 'confirm subimssion',
                           template: 'Are you sure? Changes cant be made after this'
                        });

                        confirmPopup.then(function(res) {
                           if(res) {
                             $scope.sendMoreDataToDb($scope.moreformData, Time);

                           } else {
                              console.log('Not sure!');
                           }
                        });
                      }

                //console.log("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
        });
    }


    $scope.deleteRowFromMoreDb= function(Time){
      var query = "DELETE FROM moreFormTable where Time = ?";
      $cordovaSQLite.execute(db, query, [Time]).then(function(res) {
      //$cordovaSQLite.execute(db, query).then(function(res) {
          if(res.rows.length > 0) {
              alert("successfully Delted");
          } else {
            moreDataFetched.pop(Time);
              console.log("No results found");
          }
      }, function (err) {
          console.error(err);
      });
    }


//    $scope.sendMoreDataToDb($scope.moreformData, Time);

  $scope.sendMoreDataToDb = function(data_to_send, Time) {

    $http({
  method : "POST",
  url : "http://www.wimea.mak.ac.ug/wimeamobile/weatherMobile/moreform.php",
  data: data_to_send,
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }).then(function mySuccess(response) {
      $scope.deleteRowFromMoreDb(Time);
    var alertPopup = $ionicPopup.alert({
      title: 'Successful',
      template: response.data.message
    });

  }, function myError(response) {
    var alertPopup = $ionicPopup.alert({
      title: 'Failed',
      template: 'Please check your network'
    });
});
          }

  $scope.sendMoreDataOnline = function(field){
      $scope.selectMoreData(field);



  }


//this submits observation data



//submitting data for moreform

$scope.selectObservData = function(Time) {
        var query = "SELECT * FROM observation_detail_Table WHERE Time = ?";
        $cordovaSQLite.execute(db, query, [Time]).then(function(res) {
            if(res.rows.length > 0) {
$scope.obsevationDataToSend={
  "dateSelected"    :res.rows.item(0).Date,
  "StationName"    :res.rows.item(0).StationName,
  "StationNumber"    :res.rows.item(0).StationNumber,
 "time"    :res.rows.item(0).TIME,
 "time2":res.rows.item(0).SPECITIME,
  "rainfall" : res.rows.item(0).Rainfall,
  "amountClounds"    :res.rows.item(0).TotalAmountOfAllClouds,
  "totalLowClounds"  	:res.rows.item(0).TotalAmountOfLowClouds,
  "typeLowCloud" :res.rows.item(0).TypeOfLowClouds,
  "oktasLowClouds"    :res.rows.item(0).OktasOfLowClouds,
  "lowCloudHeight"    : res.rows.item(0).HeightOfLowClouds,
  "CLCode"    :	res.rows.item(0).CLCODEOfLowClouds,
  "mediumCloudType"    :res.rows.item(0).TypeOfMediumClouds,
  "OltasMediumCloud"    :res.rows.item(0).OktasOfMediumClouds,
  "mediumCloudHeight"    :res.rows.item(0).HeightOfMediumClouds,
   "CLCODEOfMediumClouds"    :res.rows.item(0).CLCODEOfMediumClouds,
    "maxReset"    :res.rows.item(0).Max_Reset,
  "MinRead"    :	res.rows.item(0).Min_Read,
  "minReset"    :res.rows.item(0).Min_Reset,
  "picheRead"    :res.rows.item(0).Piche_Read,
  "picheReset"    :res.rows.item(0).Piche_Reset,
  "timeMarksThermo"   :res.rows.item(0).TimeMarksThermo,
  "timeMarksHygro":res.rows.item(0).TimeMarksHygro,
   "timeMarksRainRec":res.rows.item(0).TimeMarksRainRec,
  "presetWeather":res.rows.item(0).Present_Weather,
  "visibility":res.rows.item(0).Visibility,
  "windDirection":res.rows.item(0).Wind_Direction,
  "windSpeed":res.rows.item(0).Wind_Speed,
  "gusting":res.rows.item(0).Gusting,
  "windrun":res.rows.item(0).windrun,
  "sunduration":res.rows.item(0).sunshineduration,

  "typeHighCloud":res.rows.item(0).TypeOfHighClouds,
  "oktasHighCloud": res.rows.item(0).OktasOfHighClouds,
   "heightHighCloud":res.rows.item(0).HeightOfHighClouds,
   "CLCODEOfHighClouds":res.rows.item(0).CLCODEOfHighClouds,

   "TypeOfLowClouds2":res.rows.item(0).TypeOfLowClouds2,
   "OktasOfLowClouds2":res.rows.item(0).OktasOfLowClouds2,
   "HeightOfLowClouds2": res.rows.item(0).HeightOfLowClouds2,
    "CLCODEOfLowClouds2": res.rows.item(0).CLCODEOfLowClouds2,
    "TypeOfMediumClouds2":res.rows.item(0).TypeOfMediumClouds2,
    "OktasOfMediumClouds2":res.rows.item(0).OktasOfMediumClouds2,
    "HeightOfMediumClouds2":res.rows.item(0).HeightOfMediumClouds2,
    "CLCODEOfMediumClouds2":res.rows.item(0).CLCODEOfMediumClouds2,
    "TypeOfHighClouds2":res.rows.item(0).TypeOfHighClouds2,
    "OktasOfHighClouds2":res.rows.item(0).OktasOfHighClouds2,
     "HeightOfHighClouds2":res.rows.item(0).HeightOfHighClouds2,
    "CLCODEOfHighClouds2":res.rows.item(0).CLCODEOfHighClouds2,
     "TypeOfLowClouds3":res.rows.item(0).TypeOfLowClouds3,
      "OktasOfLowClouds3": res.rows.item(0).OktasOfLowClouds3,
    "HeightOfLowClouds3": res.rows.item(0).HeightOfLowClouds3,
    "CLCODEOfLowClouds3": res.rows.item(0).CLCODEOfLowClouds3,
    "TypeOfMediumClouds3": res.rows.item(0).TypeOfMediumClouds3,
    "OktasOfMediumClouds3":res.rows.item(0).OktasOfMediumClouds3,
    "HeightOfMediumClouds3":res.rows.item(0).HeightOfMediumClouds3,
    "CLCODEOfMediumClouds3":res.rows.item(0).CLCODEOfMediumClouds3,
    "TypeOfHighClouds3":res.rows.item(0).TypeOfHighClouds3,
     "OktasOfHighClouds3":res.rows.item(0).CLCODEOfLowClouds2,
      "HeightOfHighClouds3":res.rows.item(0).HeightOfHighClouds3,
    "CLCODEOfHighClouds3": res.rows.item(0).CLCODEOfHighClouds3,

  "cloudsechlghtAlidade":res.rows.item(0).CloudSearchLightReading,
   "dryBulb":res.rows.item(0).Dry_Bulb,
    "wetBulb":res.rows.item(0).Wet_Bulb,
    "maxRead": res.rows.item(0).Max_Read,
    "attdThermoReading": res.rows.item(0).AttdThermo,
  "prAsReadReading": res.rows.item(0).PrAsRead,
   "correction": res.rows.item(0).Correction,
   "cldMbReading": res.rows.item(0).CLP,
    "MSLPr": res.rows.item(0).MSLPr,
    "barographTimeMarks":res.rows.item(0).TimeMarksBarograph,
    "anemographTimeMarks": res.rows.item(0).TimeMarksAnemograph,
    "otherTMarks": res.rows.item(0).OtherTMarks,
     "RemarksotherObservation": res.rows.item(0).Remarks

    }

              if(window.Connection) {
                          if(navigator.connection.type == Connection.NONE) {
                              $ionicPopup.confirm({
                                  title: "Internet not available",
                                  content: "The data cant be submitted."
                              })
                              .then(function(result) {
                                  if(!result) {
                                    //  ionic.Platform.exitApp();
                                  }
                              });
                          }
                          else{
                            var confirmPopup = $ionicPopup.confirm({
                               title: 'confirm subimssion',
                               template: 'The data will be submitted'
                            });

                            confirmPopup.then(function(res) {
                               if(res) {
                                $scope.sendObservDataToDb($scope.obsevationDataToSend, Time);
                              //  $scope.deleteRowFromDb(Time);
                               } else {
                                  console.log('Not sure!');
                               }
                            });
                          }
                      }
                      else{
                        var confirmPopup = $ionicPopup.confirm({
                           title: 'Data Upload',
                           template: 'your data is going to be uploaded'
                        });

                        confirmPopup.then(function(res) {
                           if(res) {
                             $scope.sendObservDataToDb($scope.obsevationDataToSend, Time);

                           } else {
                              console.log('Not sure!');
                           }
                        });
                      }

                //console.log("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
        });
    }


    $scope.deleteRowFromObservDb= function(Time){
      var query = "DELETE FROM observation_detail_Table where Time = ?";
      $cordovaSQLite.execute(db, query, [Time]).then(function(res) {
      //$cordovaSQLite.execute(db, query).then(function(res) {
          if(res.rows.length > 0) {
              alert("successfully Delted");
          } else {
            observDataFetched.pop(Time);
              console.log("No results found obsv");
          }
      }, function (err) {
          console.error(err);
      });
    }


//    $scope.sendMoreDataToDb($scope.moreformData, Time);

  $scope.sendObservDataToDb = function(data_to_send, Time) {

    $http({
  method : "POST",
 url : "http://www.wimea.mak.ac.ug/wimeamobile/weatherMobile/observationformScript.php",
  data: data_to_send,
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }).then(function mySuccess(response) {
$scope.deleteRowFromObservDb(Time);
    var alertPopup = $ionicPopup.alert({
      title: 'Successful',
      template: response.data.message
    });

  }, function myError(response) {
    var alertPopup = $ionicPopup.alert({
      title: 'Failed',
      template: 'Please check your network'
    });
});
          }

  $scope.sendObserveDataOnline = function(field){
      $scope.selectObservData(field);



  }



})


.controller('observationformCtrl', function($scope, $ionicScrollDelegate ,GeoAlert,$state,$cordovaSQLite,$ionicPopup, $ionicModal, $http, mobileDb, LoginService) {
if(firstLogin){
  stationnamefetched = LoginService.getUserStation();
  stationnumberfetched = LoginService.getUserStationNo();
  Longitude= LoginService.getLongtude();
  Latitude= LoginService.getLatitude();
}
$scope.scrollTop = function() {
    $ionicScrollDelegate.scrollTop();
  }
  $scope.userStation= stationnamefetched;   $scope.userStationNo=stationnumberfetched;

// $scope.userStation= LoginService.getUserStation();   $scope.userStationNo=LoginService.getUserStationNo();

//GeoAlert.comfirmLocation();
$scope.cOptions = [
    {t : "0"},{t : "1"}, {t : "2"},{t : "3"},
    {t : "4"},{t : "5"}, {t : "6"},{t : "7"},
    {t : "8"},{t : "9"}

];
$scope.cOptions0 = [
    {t : "0"},{t : "1"}, {t : "2"},{t : "3"},
    {t : "4"},{t : "5"}, {t : "6"},{t : "7"},
    {t : "8"}

];

  function convertDate(date) {
   var yyyy = date.getFullYear().toString();
   var mm = (date.getMonth()+1).toString();
   var dd  = date.getDate().toString();

   var mmChars = mm.split('');
   var ddChars = dd.split('');

   return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
  }
  $scope.bool_metar_speci=true;
  $scope.validateTimeDependants=function(){

  var  tymChars = $scope.observdata.time;
  $scope.reqMinutes_moreField=parseInt( tymChars.split(":")[1]);
      if($scope.reqMinutes_moreField==30 || $scope.reqMinutes_moreField==0)
      $scope.bool_metar_speci=true;   //alert("All required");
      else
       $scope.bool_metar_speci=false;   //alert("Some Not required");

  }
  $scope.checkObservationRecord= function(){
    $scope.queryData={"date":$scope.observdata.dateSelected,
                      "StationNumber":$scope.observdata.StationNumber,
                    "time":$scope.observdata.time};

  //connect to php and query db whether date, stationNo and Time exists

  $http({
  method : "POST",
  url : "http://www.wimea.mak.ac.ug/wimeamobile/weatherMobile/queryForAll_weatherExists.php",
  data: $scope.queryData,
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }).then(function mySuccess(response) {
    if (response.data.code === "000") {
      console.log("weather Record Already submitted");
      alert("weather Record Already submitted");
//Four booleans are set stop progress to next page
      $scope.observationformPart1 = true;
      $scope.observationformpart2 = false;
      $scope.observationformpart3 = false;
      $scope.observationformpart4 = false;


    }
    else {
//  Record OK for submission or Network Failures
//alert(JSON.stringify(response.data));
    }

  }, function myError(response) {
  var alertPopup = $ionicPopup.alert({
  title: 'Sever Related !',
  template: 'Unknown Error!'
  });
  //Four booleans are set stop progress to next page
  $scope.observationformPart1 = true;
  $scope.observationformpart2 = false;
  $scope.observationformpart3 = false;
  $scope.observationformpart4 = false;

  });

  }
  $scope.observdata={"dateSelected":convertDate(new Date()), "StationName": $scope.userStation ,"StationNumber": $scope.userStationNo};
  $scope.checkLocation = function(){
GeoAlert.comfirmLocation();

    var lat = Latitude;
       var long =  Longitude;
       function onConfirm(idx) {
         console.log('button '+idx+' pressed');
       }
       GeoAlert.begin(lat,long, function() {
         console.log('TARGET');
        // GeoAlert.end();

       /*var alertPopup = $ionicPopup.alert({
         title: 'success!',
         cssClass: 'dark',
         template: 'correct location to submit data!'
       });*/

       }, function() {
         console.log('TARGET_WRONG');

       var alertPopup = $ionicPopup.alert({
         title: ' failed!',
         template: 'Wrong location your going to be logged out!'
       });

       $state.go('login');
          GeoAlert.end();
       });

  }



  	$scope.openObservationForm2 = function(){
  		$state.go('main.observationform2');

  	}
  	// function to hide all other forms and leave this one available
  	$scope.hideotherObservationParts = function(){

      //mobileDb.createDb();
  			$scope.observationformPart1 = true;
  			$scope.observationformpart2 = false;
  			$scope.observationformpart3 = false;
  			$scope.observationformpart4 = false;


        $scope.observCloudsTotal  = false;
        $scope.observCloudsTotallow  = false;
        /*$scope.observLowCloudType  = false;
        $scope.observOktasLoCloud  = false;
        $scope.observLowCloudHeight = false;
        $scope.observecclode  = false;
        $scope.observTypmedCld = false;
        $scope.observoltasMedCld  = false;
        $scope.observHeightMedCLd = false;


        $scope.observmaxRst  = false;
        $scope.observminRead  = false;
        $scope.observminReset  = false;
        $scope.observpicheread  = false;
        $scope.observpichereset  = false;
        $scope.observtimemrksThermo  = false;
        $scope.observtimemrksHygro = false;
        $scope.observtimemrksrainrec  = false;
        $scope.observpresentWeather = false;
        */
        $scope.observVisibilty = false;
        $scope.observwindDirection = false;
        $scope.bservwindspeed = false;
        $scope.observgusting = false;



        $scope.observclodMdClod = false;
        $scope.observTypHighCld  = false;
        $scope.observoktasHighCld = false;
        $scope.observcldhighCld = false;
        $scope.observRain = false;
        $scope.observDryBulb  = false;
        $scope.observwetBulb = false;
        $scope.observMaxRead  = false;

        $scope.observAttdThermo = false;
        $scope.observCLP = false;
        $scope.observmslpr = false;
        $scope.observTimeMarksBaroGraph  = false;
        $scope.observTimeMarksAnemoGrapgh = false;
        $scope.observOtherTMarks = false;
        $scope.observRemarks = false;
        $scope.observCorrection = false;
        $scope.observprAsReadReading = false;


  			//observationformpart2 observationformpart3 observationformpart4

  	}


    $scope.date = new Date();

    $scope.username = LoginService.getUser();

    $scope.insertObsDataOffline = function(Date,  StationName,  StationNumber,  TIME, SPECITIME, TotalAmountOfAllClouds, TotalAmountOfLowClouds, TypeOfLowClouds,
        OktasOfLowClouds, HeightOfLowClouds, CLCODEOfLowClouds, TypeOfMediumClouds, OktasOfMediumClouds, HeightOfMediumClouds, CLCODEOfMediumClouds,
         TypeOfHighClouds, OktasOfHighClouds, HeightOfHighClouds, CLCODEOfHighClouds,  TypeOfLowClouds2, OktasOfLowClouds2, HeightOfLowClouds2, CLCODEOfLowClouds2,TypeOfMediumClouds2, OktasOfMediumClouds2, HeightOfMediumClouds2, CLCODEOfMediumClouds2,TypeOfHighClouds2, OktasOfHighClouds2, HeightOfHighClouds2, CLCODEOfHighClouds2, TypeOfLowClouds3, OktasOfLowClouds3, HeightOfLowClouds3, CLCODEOfLowClouds3, TypeOfMediumClouds3, OktasOfMediumClouds3, HeightOfMediumClouds3, CLCODEOfMediumClouds3,TypeOfHighClouds3, OktasOfHighClouds3, HeightOfHighClouds3, CLCODEOfHighClouds3,
         CloudSearchLightReading, Rainfall,Dry_Bulb, Wet_Bulb, Max_Read, Max_Reset,Min_Read,  Min_Reset,Piche_Read,Piche_Reset,TimeMarksThermo,TimeMarksHygro,TimeMarksRainRec ,
         Present_Weather,Visibility,Wind_Direction,Wind_Speed ,Gusting,windrun,sunshineduration,AttdThermo,PrAsRead,Correction,CLP,MSLPr,TimeMarksBarograph,TimeMarksAnemograph,OtherTMarks,Remarks,SubmittedBy,CreationDate){

        var query = "INSERT INTO observation_detail_Table (Date,  StationName,  StationNumber,  TIME,SPECITIME, TotalAmountOfAllClouds, TotalAmountOfLowClouds, TypeOfLowClouds, OktasOfLowClouds, HeightOfLowClouds, CLCODEOfLowClouds, TypeOfMediumClouds, OktasOfMediumClouds, HeightOfMediumClouds, CLCODEOfMediumClouds,TypeOfHighClouds, OktasOfHighClouds, HeightOfHighClouds, CLCODEOfHighClouds, TypeOfLowClouds2, OktasOfLowClouds2, HeightOfLowClouds2, CLCODEOfLowClouds2, TypeOfMediumClouds2, OktasOfMediumClouds2,"+
        " HeightOfMediumClouds2, CLCODEOfMediumClouds2,TypeOfHighClouds2, OktasOfHighClouds2, HeightOfHighClouds2, CLCODEOfHighClouds2, TypeOfLowClouds3, OktasOfLowClouds3, HeightOfLowClouds3, CLCODEOfLowClouds3, TypeOfMediumClouds3, OktasOfMediumClouds3, HeightOfMediumClouds3, CLCODEOfMediumClouds3,TypeOfHighClouds3, OktasOfHighClouds3, HeightOfHighClouds3, CLCODEOfHighClouds3,"+
        "CloudSearchLightReading, Rainfall,Dry_Bulb, Wet_Bulb, Max_Read, Max_Reset,Min_Read,  Min_Reset,Piche_Read,Piche_Reset,TimeMarksThermo,TimeMarksHygro,TimeMarksRainRec ,Present_Weather,Visibility,Wind_Direction,Wind_Speed ,Gusting,windrun,sunshineduration,AttdThermo,PrAsRead,Correction,CLP,MSLPr,TimeMarksBarograph,TimeMarksAnemograph,OtherTMarks,Remarks,SubmittedBy,CreationDate) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        $cordovaSQLite.execute(db, query, [Date,  StationName,  StationNumber,  TIME,SPECITIME,  TotalAmountOfAllClouds, TotalAmountOfLowClouds, TypeOfLowClouds,
            OktasOfLowClouds, HeightOfLowClouds, CLCODEOfLowClouds, TypeOfMediumClouds, OktasOfMediumClouds, HeightOfMediumClouds, CLCODEOfMediumClouds,
             TypeOfHighClouds, OktasOfHighClouds, HeightOfHighClouds, CLCODEOfHighClouds, TypeOfLowClouds2, OktasOfLowClouds2, HeightOfLowClouds2, CLCODEOfLowClouds2,TypeOfMediumClouds2, OktasOfMediumClouds2, HeightOfMediumClouds2, CLCODEOfMediumClouds2,TypeOfHighClouds2, OktasOfHighClouds2, HeightOfHighClouds2, CLCODEOfHighClouds2, TypeOfLowClouds3, OktasOfLowClouds3, HeightOfLowClouds3, CLCODEOfLowClouds3, TypeOfMediumClouds3, OktasOfMediumClouds3, HeightOfMediumClouds3, CLCODEOfMediumClouds3,TypeOfHighClouds3, OktasOfHighClouds3, HeightOfHighClouds3, CLCODEOfHighClouds3,
         CloudSearchLightReading, Rainfall,Dry_Bulb, Wet_Bulb,
             Max_Read, Max_Reset,Min_Read,  Min_Reset,Piche_Read,Piche_Reset,TimeMarksThermo,TimeMarksHygro,TimeMarksRainRec ,
             Present_Weather,Visibility,Wind_Direction,Wind_Speed ,Gusting,windrun,sunshineduration,AttdThermo,PrAsRead,Correction,CLP,MSLPr,TimeMarksBarograph,TimeMarksAnemograph,OtherTMarks,Remarks,SubmittedBy, CreationDate]).then(function(res) {
            console.log("INSERT ID -> " + res.insertId);
        }, function (err) {
            console.error(err);
        });




    }



  	$scope.customshowHideOfObsform = function(formpart){
  			if(formpart == "Obsform1"){
          console.log("going to Obsform1");

  			$scope.observationformPart1 = true;//show part 1 only
  			$scope.observationformpart2 = false;
  			$scope.observationformpart3 = false;
  			$scope.observationformpart4 = false;
        $scope.observationformpart5 = false;
        $scope.observationformpart6 = false;
        $scope.scrollTop();

  			}
  			else if(formpart=="Obsform2"){
          console.log("going to Obsform2");
          $scope.scrollTop();
            if($scope.observdata.dateSelected!=null)
              {

                $scope.observationformPart1 = false;
  			        $scope.observationformpart2 = true;//show 2nd part only
  			        $scope.observationformpart3 = false;
  			        $scope.observationformpart4 = false;
                $scope.observationformpart5 = false;
                $scope.observationformpart6 = false;
                $scope.scrollTop();
              }
              else{


                if($scope.observdata.amountClounds == null )  $scope.observCloudsTotal  = true;
                if($scope.observdata.totalLowClounds == null) $scope.observCloudsTotallow  = true;
                }



  			}
  			else if(formpart=="Obsform3"){
            console.log("going to Obsform3");
            $scope.observationformPart1 = false;
            $scope.observationformpart2 = false;
            $scope.observationformpart3 = true;
            $scope.observationformpart4 = false;
            $scope.observationformpart5 = false;
            $scope.observationformpart6 = false;
            $scope.scrollTop();
  			}
        else if(formpart=="Obsform4"){
          console.log("going to Obsform4");
          $scope.observationformPart1 = false;
          $scope.observationformpart2 = false;
          $scope.observationformpart3 = false;
          $scope.observationformpart4 = true;
          $scope.observationformpart5 = false;
          $scope.observationformpart6 = false;
          $scope.scrollTop();
        }
        else if(formpart=="Obsform5"){
          console.log("going to Obsform5");
          $scope.observationformPart1 = false;
          $scope.observationformpart2 = false;
          $scope.observationformpart3 = false;
          $scope.observationformpart4 = false;
          $scope.observationformpart5 = true;
          $scope.observationformpart6 = false;
          $scope.scrollTop();
        }
  			else{

          //if($scope.observdata.dryBulb != null && $scope.observdata.wetBulb != null){
              console.log("going to Obsform6");
            $scope.observationformPart1 = false;
            $scope.observationformpart2 = false;
            $scope.observationformpart3 = false;
            $scope.observationformpart4 = false;
            $scope.observationformpart5 = false;
            $scope.observationformpart6 = true;
            $scope.scrollTop();
          /*else {

            if($scope.observdata.clodeMediumCloud == null)    $scope.observclodMdClod = true;
            if($scope.observdata.typeHighCloud == null)       $scope.observTypHighCld  = true;
            if($scope.observdata.oktasHighCloud == null )     $scope.observoktasHighCld = true;
            if($scope.observdata.heightHighCloud == null)     $scope.observcldhighCld = true;
            if($scope.observdata.cloudsechlghtAlidade == null)$scope.observRain = $scope.bool_metar_speci;
            if($scope.observdata.rainfall == null )            $scope.observRain = $scope.bool_metar_speci;
            if($scope.observdata.dryBulb == null)             $scope.observDryBulb  = true;
            if($scope.observdata.wetBulb == null )            $scope.observwetBulb = true;
            if($scope.observdata.maxRead == null)             $scope.observMaxRead  = $scope.bool_metar_speci;
          }*/

  			}

  	}



$scope.submitobservationdata=function(){
$scope.checkLocation();

        $scope.observationData={
          "date":$scope.observdata.dateSelected,
          "StationName" :$scope.observdata.StationName,
          "StationNumber" :$scope.observdata.StationNumber ,
           "time":$scope.observdata.time,
           "TotalAmountOfAllClouds" :$scope.observdata.amountClounds,
           "TotalAmountOfLowClouds":$scope.observdata.totalLowClounds,
            "TypeOfLowClouds":$scope.observdata.typeLowCloud,
            "TypeOfLowClouds2":$scope.observdata.typeLowCloud2,
            "TypeOfLowClouds3":$scope.observdata.typeLowCloud3,
           "OktasOfLowClouds":$scope.observdata.oktasLowClouds,
           "OktasOfLowClouds2":$scope.observdata.oktasLowClouds2,
           "OktasOfLowClouds3":$scope.observdata.oktasLowClouds3,
            "HeightOfLowClouds": $scope.observdata.lowCloudHeight,
            "HeightOfLowClouds2": $scope.observdata.lowCloudHeight2,
            "HeightOfLowClouds3": $scope.observdata.lowCloudHeight3,
           "CLCODEOfLowClouds":$scope.observdata.CLCode,
           "CLCODEOfLowClouds2":$scope.observdata.CLCode2,
           "CLCODEOfLowClouds3":$scope.observdata.CLCode3,
            "TypeOfMediumClouds":$scope.observdata.mediumCloudType,
            "TypeOfMediumClouds2":$scope.observdata.mediumCloudType2,
            "TypeOfMediumClouds3":$scope.observdata.mediumCloudType3,
           "OktasOfMediumClouds":$scope.observdata.OltasMediumCloud,
           "OktasOfMediumClouds2":$scope.observdata.OltasMediumCloud2,
           "OktasOfMediumClouds3":$scope.observdata.OltasMediumCloud3,
           "HeightOfMediumClouds":$scope.observdata.mediumCloudHeight,
           "HeightOfMediumClouds2":$scope.observdata.mediumCloudHeight2,
           "HeightOfMediumClouds3":$scope.observdata.mediumCloudHeight3,
           "CLCODEOfMediumClouds":$scope.observdata.CLCODEOfMediumClouds,
           "CLCODEOfMediumClouds2":$scope.observdata.CLCODEOfMediumClouds2,
           "CLCODEOfMediumClouds3":$scope.observdata.CLCODEOfMediumClouds3,
           "TypeOfHighClouds":$scope.observdata.typeHighCloud,
           "TypeOfHighClouds2":$scope.observdata.typeHighCloud2,
           "TypeOfHighClouds3":$scope.observdata.typeHighCloud3,
             "OktasOfHighClouds": $scope.observdata.oktasHighCloud,
             "OktasOfHighClouds2": $scope.observdata.oktasHighCloud2,
             "OktasOfHighClouds3": $scope.observdata.oktasHighCloud3,
           "HeightOfHighClouds":$scope.observdata.heightHighCloud,
           "HeightOfHighClouds2":$scope.observdata.heightHighCloud2,
           "HeightOfHighClouds3":$scope.observdata.heightHighCloud3,
            "CLCODEOfHighClouds":$scope.observdata.CLCODEOfHighClouds,
            "CLCODEOfHighClouds2":$scope.observdata.CLCODEOfHighClouds2,
            "CLCODEOfHighClouds3":$scope.observdata.CLCODEOfHighClouds3,
            "CloudSearchLightReading":$scope.observdata.cloudsechlghtAlidade,
            "Rainfall": $scope.observdata.rainfall,
            "Dry_Bulb":$scope.observdata.dryBulb,
             "Wet_Bulb":$scope.observdata.wetBulb,
              "Max_Read": $scope.observdata.maxRead,
               "Max_Reset":$scope.observdata.maxReset,
               "Min_Read":	$scope.observdata.MinRead,
               "Min_Reset":$scope.observdata.minReset,
               "Piche_Read":$scope.observdata.picheRead,
               "Piche_Reset":$scope.observdata.picheReset,
               "TimeMarksThermo":$scope.observdata.timeMarksThermo,
               "TimeMarksHygro":$scope.observdata.timeMarksHygro,
               "TimeMarksRainRec":$scope.observdata.timeMarksRainRec,
                "Present_Weather":$scope.observdata.presetWeather,
                "Visibility":$scope.observdata.visibility,
               "Wind_Direction":$scope.observdata.windSpeed,
               "Wind_Speed":$scope.observdata.windSpeed,
               "Gusting":$scope.observdata.gusting,
               "AttdThermo": $scope.observdata.attdThermoReading,
               "PrAsRead": $scope.observdata.prAsReadReading,
               "Correction": $scope.observdata.correction,
               "clp": $scope.observdata.cldMbReading,
               "MSLPr": $scope.observdata.MSLPr,
               "TimeMarksBarograph": $scope.observdata.barographTimeMarks,
               "TimeMarksAnemograph": $scope.observdata.anemographTimeMarks,
               "OtherTMarks": $scope.observdata.otherTMarks,
               "Remarks": $scope.observdata.RemarksotherObservation,
               "sunduration":$scope.observdata.sunshineduration,
               "windrun":$scope.observdata.windrun,
               "specitime":$scope.observdata.time,
               "SubmittedBy":"1221" ,
               "DeviceType":"mobile"
        };

        if(window.Connection) {
                      if(navigator.connection.type == Connection.NONE) {
                          $ionicPopup.confirm({
                              title: "Internet Disconnected",
                              content: "The data is going to be saved offline"
                          })
                          .then(function(result) {
                              if(result) {
                                var confirmPopup = $ionicPopup.confirm({
                                   title: 'confirm subimssion',
                                   template: 'Are you sure? Changes cant be made after this'
                                });

                                confirmPopup.then(function(res) {
                                   if(res) {
                                     $scope.insertObsDataOffline($scope.observdata.dateSelected, $scope.observdata.StationName,$scope.observdata.StationNumber, $scope.observdata.time,$scope.observdata.time2,
                                     $scope.observdata.rainfall,$scope.observdata.amountClounds,$scope.observdata.totalLowClounds,$scope.observdata.typeLowCloud,
                                     $scope.observdata.oktasLowClouds,$scope.observdata.lowCloudHeight,$scope.observdata.CLCode,$scope.observdata.mediumCloudType,
                                     $scope.observdata.OltasMediumCloud,$scope.observdata.mediumCloudHeight,$scope.observdata.CLCODEOfMediumClouds,
                                     $scope.observdata.typeHighCloud,$scope.observdata.oktasHighCloud,$scope.observdata.heightHighCloud,

                                     $scope.observdata.typeLowCloud2,
                                     $scope.observdata.oktasLowClouds2,$scope.observdata.lowCloudHeight2,$scope.observdata.CLCode2,$scope.observdata.mediumCloudType2,
                                     $scope.observdata.OltasMediumCloud2,$scope.observdata.mediumCloudHeight2,$scope.observdata.CLCODEOfMediumClouds2,
                                     $scope.observdata.typeHighCloud2,$scope.observdata.oktasHighCloud2,$scope.observdata.heightHighCloud2,

                                     $scope.observdata.typeLowCloud3,
                                     $scope.observdata.oktasLowClouds3,$scope.observdata.lowCloudHeight3,$scope.observdata.CLCode3,$scope.observdata.mediumCloudType3,
                                     $scope.observdata.OltasMediumCloud3,$scope.observdata.mediumCloudHeight3,$scope.observdata.CLCODEOfMediumClouds3,
                                     $scope.observdata.typeHighCloud3,$scope.observdata.oktasHighCloud3,$scope.observdata.heightHighCloud3,

                                     $scope.observdata.maxReset,$scope.observdata.MinRead,
                                     $scope.observdata.minReset,$scope.observdata.picheRead,$scope.observdata.picheReset,
                                     $scope.observdata.timeMarksThermo, $scope.observdata.timeMarksHygro, $scope.observdata.timeMarksRainRec,
                                     $scope.observdata.presetWeather,$scope.observdata.visibility,$scope.observdata.windDirection,
                                     $scope.observdata.windSpeed,$scope.observdata.gusting,$scope.observdata.windrun,$scope.observdata.sunshineduration,

                                     $scope.observdata.cloudsechlghtAlidade, $scope.observdata.dryBulb,$scope.observdata.wetBulb,
                                     $scope.observdata.maxRead,$scope.observdata.attdThermoReading,$scope.observdata.prAsReadReading, $scope.observdata.correction, $scope.observdata.cldMbReading,
                                     $scope.observdata.MSLPr,$scope.observdata.barographTimeMarks, $scope.observdata.otherTMarks,
                                     $scope.observdata.RemarksotherObservation, $scope.date, $scope.username);

                                      observDataFetched.push($scope.observdata.time);
                                      $state.go($state.current,{},{reload:true});
                                       } else {
                                      console.log('Not sure!');
                                   }
                                });
                                  //ionic.Platform.exitApp();
                              }else {

                              }
                          });
                      }
                      else{
                        var confirmPopup = $ionicPopup.confirm({
                           title: 'confirm subimssion',
                           template: 'Are you sure? Changes cant be made after this'
                        });

                        confirmPopup.then(function(res) {
                           if(res) {

                                               $http({
                                              method : "POST",
                                              url : "http://www.wimea.mak.ac.ug/wimeamobile/weatherMobile/observationformScript.php",
                                              data: $scope.observationData,
                                             headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                                          }).then(function mySuccess(response) {
                                             // $scope.myWelcome = response.data;
                                             var alertPopup = $ionicPopup.alert({
                                               title: 'Successful!',
                                               template: response.data.message
                                             })
                                             $state.go($state.current,{},{reload:true});
                                          }, function myError(response) {
                                               var alertPopup = $ionicPopup.alert({
                                                title: 'ERROR',
                                                template: JSON.stringify(response)//"Poor Internet Connection"
                                              });

                                          });

                           } else {
                              console.log('Not sure!');
                           }
                        });
                      }
                  }
                  else{
                    var confirmPopup = $ionicPopup.confirm({
                       title: 'confirm subimssion',
                       template: 'Are you sure? Changes cant be made after this'
                    });

                    confirmPopup.then(function(res) {
                       if(res) {
                         $scope.insertObsDataOffline($scope.observdata.dateSelected, $scope.observdata.StationName,$scope.observdata.StationNumber, $scope.observdata.time,
                         $scope.observdata.rainfall,$scope.observdata.amountClounds,$scope.observdata.totalLowClounds,$scope.observdata.typeLowCloud,
                         $scope.observdata.oktasLowClouds,$scope.observdata.lowCloudHeight,$scope.observdata.CLCode,$scope.observdata.mediumCloudType,
                         $scope.observdata.OltasMediumCloud,$scope.observdata.mediumCloudHeight,$scope.observdata.CLCODEOfMediumClouds,
                         $scope.observdata.CLCODEOfHighClouds,$scope.observdata.maxReset,$scope.observdata.MinRead,
                         $scope.observdata.minReset,$scope.observdata.picheRead,$scope.observdata.picheReset,
                         $scope.observdata.timeMarksThermo, $scope.observdata.timeMarksHygro, $scope.observdata.timeMarksRainRec,
                         $scope.observdata.presetWeather,$scope.observdata.visibility,$scope.observdata.windDirection,
                         $scope.observdata.windSpeed,$scope.observdata.gusting, $scope.observdata.clodeMediumCloud,
                       $scope.observdata.typeHighCloud,$scope.observdata.oktasHighCloud,$scope.observdata.heightHighCloud,
                     $scope.observdata.cloudsechlghtAlidade, $scope.observdata.dryBulb,$scope.observdata.wetBulb,
                     $scope.observdata.maxRead,$scope.observdata.attdThermoReading,$scope.observdata.prAsReadReading, $scope.observdata.correction, $scope.observdata.cldMbReading,
                     $scope.observdata.MSLPr,$scope.observdata.barographTimeMarks, $scope.observdata.otherTMarks,
                     $scope.observdata.RemarksotherObservation, $scope.date, $scope.username);

                                   observDataFetched.push($scope.observdata.time);


                                                     $http({
                                                    method : "POST",
                                                      url : "http://www.wimea.mak.ac.ug/wimeamobile/weatherMobile/observationformScript.php",
                                                    data: $scope.observationData,
                                                   headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                                                }).then(function mySuccess(response) {
                                                   // $scope.myWelcome = response.data;
                                                   var alertPopup = $ionicPopup.alert({
                                                     title: 'Successful!',
                                                     template: response.data.message
                                                   });
                                                   $state.go($state.current,{},{reload:true});
                                                }, function myError(response) {
                                                    //$scope.myWelcome = response.statusText;
                                                    var alertPopup = $ionicPopup.alert({
                                                      title: 'ERROR',
                                                      template:  JSON.stringify(response)//"Poor Internet Connection"
                                                    });
                                                });


                       } else {
                          console.log('Not sure!');
                       }
                    });
                  }





       }

})
.controller('observationform2Ctrl', function($scope, $state, $ionicModal , GeoAlert, $ionicPopup) {

	/*function showMap(coords) {
    var mapOptions = {
      center: { lat: coords.latitude, lng: coords.longitude},
      zoom: 8
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  }

  GeoService.getPosition()
    .then(function(position) {
      $scope.coords = position.coords;
      showMap(position.coords);
    }, function(err) {
      console.log('getCurrentPosition error: ' + angular.toJson(err));
    });*/



	//submitobservationformdata openObservationForm3 openObservationForm2
})

.controller('moreformfieldsformCtrl', function($scope,$ionicScrollDelegate, $state,GeoAlert, $ionicModal, $http, $ionicPopup, LoginService, $cordovaSQLite) {

  $scope.scrollTop = function() {
      $ionicScrollDelegate.scrollTop();
    }
  function convertDate(date) {
   var yyyy = date.getFullYear().toString();
   var mm = (date.getMonth()+1).toString();
   var dd  = date.getDate().toString();

   var mmChars = mm.split('');
   var ddChars = dd.split('');

   return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
  }
  $scope.userStation= stationnamefetched;   $scope.userStationNo=stationnumberfetched;

  //$scope.userStation= LoginService.getUserStation();   $scope.userStationNo=LoginService.getUserStationNo();
  $scope.moreform={"date":convertDate( new Date()), "name": $scope.userStation ,"smnumber": $scope.userStationNo};




	$scope.hideotherMoreFormParts = function(){
			 document.getElementById("moreformPart1").style.display="block";
			 document.getElementById("moreformPart2").style.display="none";

    $scope.MoreUnitWind = false;
    $scope.MoreIndOmission  = false;
    $scope.MooreTypeStation = false;
    $scope.MoreLowCldHeight  = false;
    $scope.MoreStdIso  = false;
    $scope.MoreGeoSTDiso  = false;
    $scope.MoreDurPrecp  = false;
    $scope.MorePastWearhe  = false;
    $scope.MoreGrassMinTemp  = false;
    $scope.MoreTypeSttn  = false;
    $scope.MoreCharInt  = false;
    $scope.MoreBegnPrecipt  = false;
    $scope.MoreIndcType  = false;
    $scope.MoreDurSun  = false;

    $scope.MorePressureSignchange = false;
    $scope.MoreSuppInfo = false;
    $scope.MoreVapourPressure = false;


	}
$scope.validateTimeDependants=function(){

  var  tymChars = $scope.moreform.time;

}
$scope.customshowHideOfMorformParts = function(formpart){
//'Metarform2'
    //MoreUnitWind MoreIndOmission MooreTypeStation MoreLowCldHeight MoreStdIso MoreGeoSTDiso MoreDurPrecp
    //MorePastWearhe MoreGrassMinTemp MoreTypeSttn MoreCharInt MoreBegnPrecipt MoreIndcType MoreDurSun
  //  MorePressureSignchange MoreSuppInfo MoreVapourPressure MoreWindRun MoreTHGraph
		if(formpart =='Moreform2'){

      var  tymChars = $scope.moreform.time;
      var dateObj= new Date(2017, 7, 20, parseInt(tymChars.split(":")[0]),parseInt( tymChars.split(":")[1]), 00, 00);
      var reqTime=(dateObj.getUTCHours()<10?"0"+dateObj.getUTCHours():dateObj.getUTCHours())+""+dateObj.getUTCMinutes()+"Z";


           document.getElementById("moreformPart1").style.display="none";
            document.getElementById("moreformPart2").style.display="block";

$scope.scrollTop();


      }
			else{
        document.getElementById("moreformPart1").style.display="block";
         document.getElementById("moreformPart2").style.display="none";

         $scope.scrollTop();

			}


		}

  $scope.confirmMoreFormData = function(){
    if(window.Connection) {
                  if(navigator.connection.type == Connection.NONE) {
                      $ionicPopup.confirm({
                          title: "Internet Disconnected",
                          content: "The data is going to be saved offline"
                      })
                      .then(function(result) {
                          if(result) {
                            var confirmPopup = $ionicPopup.confirm({
                               title: 'confirm subimssion',
                               template: 'Are you sure? Changes cant be made after this'
                            });

                            confirmPopup.then(function(res) {
                               if(res) {
                                  $scope.submitMetardata();
                               } else {
                                  console.log('Not sure!');
                               }
                            });

                          }else {

                          }
                      });
                  }
                  else{
                    var confirmPopup = $ionicPopup.confirm({
                       title: 'confirm subimssion',
                       template: 'Are you sure? Changes cant be made after this'
                    });

                    confirmPopup.then(function(res) {
                       if(res) {
                          $scope.submitMetardata();
                       } else {
                          console.log('Not sure!');
                       }
                    });
                  }
              }
              else{
                var confirmPopup = $ionicPopup.confirm({
                   title: 'confirm subimssion',
                   template: 'Are you sure? Changes cant be made after this'
                });

                confirmPopup.then(function(res) {
                   if(res) {
                      $scope.submitMetardata();
                   } else {
                      console.log('Not sure!');
                   }
                });
              }
    }

    $scope.date = new Date();
    $scope.meta={};
    $scope.username = LoginService.getUser();
    $scope.insertMoreDataOffline = function(Date, StationName, StationNumber, TIME, UnitOfWindSpeed, IndOrOmissionOfPrecipitation, TypeOfStation_Present_Past_Weather, HeightOfLowestCloud, StandardIsobaricSurface, GPM, DurationOfPeriodOfPrecipitation, Past_Weather, GrassMinTemp, CI_OfPrecipitation, BE_OfPrecipitation, IndicatorOfTypeOfIntrumentation, SignOfPressureChange, Supp_Info, VapourPressure, T_H_Graph,SubmittedBy, CreationDate){
    var query = "INSERT INTO moreFormTable (Date, StationName, StationNumber, TIME, UnitOfWindSpeed, IndOrOmissionOfPrecipitation, TypeOfStation_Present_Past_Weather, HeightOfLowestCloud, StandardIsobaricSurface, GPM, DurationOfPeriodOfPrecipitation, Past_Weather, GrassMinTemp, CI_OfPrecipitation, BE_OfPrecipitation, IndicatorOfTypeOfIntrumentation, SignOfPressureChange, Supp_Info, VapourPressure, T_H_Graph, SubmittedBy, CreationDate) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        $cordovaSQLite.execute(db, query, [Date, StationName, StationNumber, TIME, UnitOfWindSpeed, IndOrOmissionOfPrecipitation, TypeOfStation_Present_Past_Weather, HeightOfLowestCloud, StandardIsobaricSurface, GPM, DurationOfPeriodOfPrecipitation, Past_Weather, GrassMinTemp, CI_OfPrecipitation, BE_OfPrecipitation, IndicatorOfTypeOfIntrumentation, SignOfPressureChange, Supp_Info, VapourPressure, T_H_Graph, SubmittedBy, CreationDate]).then(function(res) {
            console.log("INSERT ID -> " + res.insertId);
        }, function (err) {
            console.error(err);
        });




    }
  $scope.selectMoreData = function() {
      var query = "SELECT * FROM moreFormTable";
      $cordovaSQLite.execute(db, query).then(function(res) {
          if(res.rows.length > 0) {
              alert("SELECTED -> " + res.rows.item(0).StationName + " " + res.rows.item(0).StationNumber);
          } else {
              console.log("No results found");
          }
      }, function (err) {
          console.error(err);
      });
}

  $scope.checkLocation = function(){

GeoAlert.comfirmLocation();

       var lat = Latitude;//0.331404;
        var long =  Longitude;//32.570570;
       function onConfirm(idx) {
         console.log('button '+idx+' pressed');
       }
       GeoAlert.begin(lat,long, function() {
         console.log('TARGET');
        // GeoAlert.end();

      /* var alertPopup = $ionicPopup.alert({
         title: 'success!',
         cssClass: 'dark',
         template: 'correct location to submit data!'
       });*/

       }, function() {
         console.log('TARGET_WRONG');

       var alertPopup = $ionicPopup.alert({
         title: ' failed!',
         template: 'Wrong location your going to be logged out!'
       });

       $state.go('login');
          GeoAlert.end();
       });

  }

    $scope.submitmoreformdata=function(){

  $scope.checkLocation();

         $scope.MorePastWearhe  = false;
         $scope.MoreGrassMinTemp  = false;
         $scope.MoreTypeSttn  = false;
         $scope.MoreCharInt  = false;
         $scope.MoreBegnPrecipt  = false;
         $scope.MoreIndcType  = false;
         $scope.MoreDurSun  = false;

         $scope.MorePressureSignchange = false;
         $scope.MoreSuppInfo = false;
         $scope.MoreVapourPressure = false;



         $scope.moreformData={
           "date":$scope.moreform.date,
           "StationName": $scope.moreform.name,
           "StationNumber": $scope.moreform.smnumber,
           "time": $scope.moreform.time,
           "UnitofWindSpeed": $scope.moreform.windspeed,
           "Indoromissionofprecipitation":$scope.moreform.IndOrOmissionOfPrecipitation,
           "Typeofstationpresentpastweather": $scope.moreform.stationtype,
           "HeightOfLowestCloud":$scope.moreform.lowcloudheight,
           "DurationOfPeriodOfPrecipitation": $scope.moreform.preciptationperiod,
           "Standardisobaricsurface": $scope.moreform.stdiosbaricsurface,
           "PastWeather":$scope.moreform.PastWeather,
           "GrassMininumtemperature":$scope.moreform.grassmintemp,
           "CharacterandIntensityofPrecipitation":$scope.moreform.characterintensity,
           "BeginningorEndofPrecipitation": $scope.moreform.beginpreciptation,
           "Indicatoroftypeofintrumentation":$scope.moreform.indicator,
           "SignofPressureChange": $scope.moreform.pressuresign,
           "SupplementaryInformation":$scope.moreform.suppinfo,
           "VapourPressure": $scope.moreform.vapourpressure,
           "thgraph":$scope.moreform.thgraph,
           "geopotential":$scope.moreform.geopotential,
           "SubmittedBy":'999' ,
           "DeviceType":"mobile"
             };

             if(window.Connection) {
                           if(navigator.connection.type == Connection.NONE) {
                               $ionicPopup.confirm({
                                   title: "Internet Disconnected",
                                   content: "The data is going to be saved offline"
                               })
                               .then(function(result) {
                                   if(result) {
                                     var confirmPopup = $ionicPopup.confirm({
                                        title: 'confirm subimssion',
                                        template: 'Are you sure? Changes cant be made after this'
                                     });

                                     confirmPopup.then(function(res) {
                                        if(res) {

                                          $scope.insertMoreDataOffline($scope.moreform.date,  $scope.moreform.name, $scope.moreform.smnumber,$scope.moreform.time, $scope.moreform.windspeed, $scope.moreform.IndOrOmissionOfPrecipitation,
                                              $scope.moreform.stationtype, $scope.moreform.lowcloudheight,$scope.moreform.stdiosbaricsurface, $scope.moreform.geopotential, $scope.moreform.preciptationperiod,$scope.moreform.pastweather, $scope.moreform.grassmintemp, $scope.moreform.characterintensity, $scope.moreform.beginpreciptation, $scope.moreform.indicator, $scope.moreform.pressuresign, $scope.moreform.suppinfo,
                                              $scope.moreform.vapourpressure, $scope.moreform.thgraph,
                                              $scope.username, $scope.date);

                                              moreDataFetched.push($scope.moreform.time);
                                              $state.go($state.current,{},{reload:true});
                                            } else {
                                           console.log('Not sure!');
                                        }
                                     });
                                       //ionic.Platform.exitApp();
                                   }else {

                                   }
                               });
                           }
                           else{
                             var confirmPopup = $ionicPopup.confirm({
                                title: 'confirm subimssion',
                                template: 'Are you sure? Changes cant be made after this'
                             });

                             confirmPopup.then(function(res) {
                                if(res) {
                                  $http({
                                method : "POST",
                                url : "http://www.wimea.mak.ac.ug/wimeamobile/weatherMobile/moreform.php",
                                data: $scope.moreformData,
                                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                                }).then(function mySuccess(response) {
                                  var alertPopup = $ionicPopup.alert({
                                    title: 'Successful!',
                                    template: 'your data has been submitted!'
                                  })
                                  $state.go($state.current,{},{reload:true});
                                }, function myError(response) {
                                  var alertPopup = $ionicPopup.alert({
                                    title: 'failed!',
                                    template: "poor Internet Connection"
                                  })
                                })
                                } else {
                                   console.log('Not sure!');
                                }
                             });
                           }
                       }
                       else{
                         var confirmPopup = $ionicPopup.confirm({
                            title: 'confirm subimssion',
                            template: 'Are you sure? Changes cant be made after this'
                         });

                         confirmPopup.then(function(res) {
                            if(res) {
                              $scope.insertMoreDataOffline($scope.moreform.date,  $scope.moreform.name, $scope.moreform.smnumber,$scope.moreform.time, $scope.moreform.windspeed, $scope.moreform.IndOrOmissionOfPrecipitation,
                                  $scope.moreform.stationtype, $scope.moreform.lowcloudheight,$scope.moreform.stdiosbaricsurface, $scope.moreform.geopotential, $scope.moreform.preciptationperiod,$scope.moreform.pastweather, $scope.moreform.grassmintemp, $scope.moreform.characterintensity, $scope.moreform.beginpreciptation, $scope.moreform.indicator, $scope.moreform.pressuresign, $scope.moreform.suppinfo,
                                  $scope.moreform.vapourpressure, $scope.moreform.thgraph,
                                  $scope.username, $scope.date);
                                  moreDataFetched.push($scope.moreform.date);

                                  $http({
                                method : "POST",
                                url : "http://www.wimea.mak.ac.ug/wimeamobile/weatherMobile/moreform.php",
                                data: $scope.moreformData,
                                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                                }).then(function mySuccess(response) {
                                  var alertPopup = $ionicPopup.alert({
                                    title: 'Successful!',
                                    template: response.data.message
                                  })
                                  $state.go($state.current,{},{reload:true});
                                }, function myError(response) {
                                  var alertPopup = $ionicPopup.alert({
                                    title: 'failed!',
                                    template: "poor Internet Connection"
                                  })
                                })

                            } else {
                               console.log('Not sure!');
                            }
                         });
                       }







}


      })



.controller('menuCtrl', function($scope, $state, LoginService, $ionicModal) {
  if(firstLogin)
   OriginalUserName = LoginService.getUser();

  $scope.username = OriginalUserName;
  $scope.arrayOBV = observDataFetched.length + moreDataFetched.length + metarDataFetched.length;

	$scope.logout = function(){
		$state.go("login");
ionic.Platform.exitApp();
	}



});

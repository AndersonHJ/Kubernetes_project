
var angMod = angular.module("meapp", []);
// angMod.config(function($httpProvider){

//             $httpProvider.defaults.useXDomain = true;
//             $httpProvider.defaults.withCredentials = true;
//             delete $httpProvider.defaults.headers.common["X-Requested-With"];
//             //$httpProvider.defaults.headers.common["Accept"] = "application/json";
//             $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
//             delete $httpProvider.defaults.headers.common["Origin"];
//             delete $httpProvider.defaults.headers.common["Referer"];
//             $httpProvider.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

//             console.log($httpProvider.defaults.headers);
//                     });
angMod.controller('mecontroller', function($scope, $http) {
    $scope.res = [];
    $scope.submit = function(){
       var info = {
          // fname: $scope.firstName,
          // lname: $scope.lastName,
          // bir: $scope.birthday,
          // houseNumber : $scope.houseNum,
          // street: $scope.street,
          // city: $scope.city
       };
       

       // $http.get("http://40.124.12.183/map.php?cmd=set&key=name&value="+$scope.firstName)
       //      .success(function (data, status, headers, config) {
       //          $scope.redisResponse = "Updated.";
       //      });

       
        $http({
            method: 'GET',
            url: 'map.php?cmd=get&key=prof',
            headers: {

                // 'Access-Control-Allow-Origin' : 'http://40.124.12.183/',
                // 'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
                //'Content-Type': 'application/json',
                //'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                //'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            }
            // headers:{
            //         
        }).success(function (data, status, headers, config) {
                $scope.houseNum = status;
                info.fname = data;
                console.log("success");
                console.log(data);
            })
            .error(function (data, status, header, config) {
                $scope.houseNum = status;
                console.log("asdf"+data);
                info.fname = data;
                console.log(header);
            });

        // $http({
        //     method: 'JSONP',
        //     url: 'http://40.124.12.183/map.php?cmd=get&key=name',
        //     params: {
        //       format: 'jsonp',
        //       json_callback: 'JSON_CALLBACK'
        //     }
        // }).success(function (data, status, headers, config) {
        //         $scope.houseNum = status;
        //         info.fname = data;
        //         console.log("success");
        //         console.log(data);
        //     })
        //     .error(function (data, status, header, config) {
        //         $scope.houseNum = status;
        //         console.log("asdf"+data);
        //         info.fname = data;
        //         console.log("error"+status);
        //     });

        $scope.res.push(info);

    }

    $scope.cancel = function(){
    	$scope.firstName = "";
    	$scope.lastName = "";
    	$scope.birthday = "";
    	$scope.houseNum = "";
    	$scope.street = "";
    	$scope.city = "";
    }

    });

// var redisApp = angular.module('redis', ['ui.bootstrap']);

// function RedisController() {}

// RedisController.prototype.onRedis = function() {
//     this.scope_.messages.push(this.scope_.msg);
//     var value = this.scope_.msg;
//     this.http_.get("app.php?cmd=append&key=messages&value=" + value)
//             .success(angular.bind(this, function(data) {
//                 this.scope_.redisResponse = "Updated.";
//             }));
// };

// redisApp.controller('RedisCtrl', function ($scope, $http, $location) {
//         $scope.controller = new RedisController();
//         $scope.controller.scope_ = $scope;
//         $scope.controller.location_ = $location;
//         $scope.controller.http_ = $http;

//         $scope.controller.http_.get("app.php?cmd=get&key=messages")
//             .success(function(data) {
//                 console.log(data);
//                 $scope.messages = data.data.split(",");
//             });
// });
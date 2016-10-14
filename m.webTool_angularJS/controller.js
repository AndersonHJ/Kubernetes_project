
var angMod = angular.module("meapp", []);

angMod.controller('mecontroller', function($scope, $http) {
    $scope.res = [];
    $scope.submit = function(){
       $scope.result = {
            firstName : "",
            lastName : "",
            birthday: "",
            houseNum: "",
            street: "",
            city: ""
       };

        angular.forEach($scope.info, function(value, key){
            //console.log(key+" : "+value);
            $http.get("map.php?cmd=set&key="+key+"&value="+value)
            .success(function (data, status, headers, config) {
                $scope.redisResponse = "Updated.";
            });
            $http.get("map.php?cmd=get&key="+key)
                .success(function (data, status, headers, config) {
                    $scope.result[key] = data.data;
                    //console.log(data.data);
                })
                .error(function (data, status, header, config) {
                    console.log(data);
            });
            
        });
        
        $scope.res.push($scope.result);

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
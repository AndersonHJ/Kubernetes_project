
var angMod = angular.module("meapp", ['ngCookies']);

angMod.controller('mecontroller', function($scope, $http, $cookieStore) {
    $scope.res = [];
    
    $scope.hideLogin = false;
    $scope.hideSignup = true;


    var myEmail = $cookieStore.get("email");
    var myPw = $cookieStore.get("pw");

    if(myEmail!=undefined&&myPw!=undefined){
        if (confirm("Would you like to log in as a new user?") == false) {
            location.href = "http://104.40.49.149/";
        } else {
            //location.href = "http://104.199.119.167";
        }
        
    }




    /*Functions for hiding and showing login or signup form*/
    $scope.showLogin = function(){
        $scope.hideSignup = true;
        $scope.hideLogin = false;
    }

    $scope.showSignup = function(){
        $scope.hideLogin = true;
        $scope.hideSignup = false;
    }



    /* Submit sign up form*/
    $scope.signup = function(){
       $scope.result = {
            firstName : "",
            lastName : "",
            birthday: "",
            city: "",
            email: ""
       };

        angular.forEach($scope.info, function(value, key){
        //console.log(key+" : "+value);
            $http.get("map.php?cmd=set&key="+key+"&value="+value)
            .success(function (data, status, headers, config) {
                $scope.redisResponse = "Updated.";
            });
            
            $http.get("map.php?cmd=get&key="+key)
           .success(function (data, status, headers, config) {
                    console.log(data);
                    $scope.result[key] = data.data;
                    //console.log(data.data);
            })
            .error(function (data, status, header, config) {
                console.log(data);
            });
        });

        $scope.res.push($scope.result);
        $scope.cancel();
    }

    /*Cancel sign up process*/
    $scope.cancel = function(){
    	$scope.info.firstName = "";
    	$scope.info.lastName = "";
    	$scope.info.birthday = "";
    	$scope.info.city = "";
        $scope.info.email = "";
        $scope.info.passwd = "";
    }


    /* Submit log in form*/
    $scope.login = function(){

        $http.get("map.php?cmd=get&key=email")
            .success(function (data, status, headers, config) {
                if(data.data == $scope.user.email){
                    $http.get("map.php?cmd=get&key=passwd")
                    .success(function (data2, status, headers, config) {
                        if(data2.data==$scope.user.passwd){
                            location.href = "http://104.40.49.149/";
                            $cookieStore.put("email", $scope.user.email);
                            $cookieStore.put("pw", $scope.user.passwd);
                        }
                        else{
                            alert("your password is not corrected");
                            $scope.user.passwd = "";
                        }
                    })
                }
                else{
                    alert("no such user");
                    $scope.cancelIt();
                }
                
            })
            .error(function (data, status, header, config) {
                alert("Cann't find you, you need sign up first!");
                console.log(data);
            });
    }

    /*Cancel log in process*/
    $scope.cancelIt = function(){
        $scope.user.email = "";
        $scope.user.passwd = "";
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
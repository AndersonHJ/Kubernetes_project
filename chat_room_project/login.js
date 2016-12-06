
var angMod = angular.module("loginapp", []);


angMod.controller('logincontroller', function($scope, $http, $filter) {
    $scope.res = [];
    
    

    // var myEmail = $cookieStore.get("email");
    // var myPw = $cookieStore.get("pw");

    // if(myEmail!=undefined)
    //     sendTimestamp(myEmail);
    // else
    //     sendTimestamp('unknown');

    // if(myEmail!=undefined&&myPw!=undefined){
    //     if (confirm("Would you like to log in as a new user?") == false) {
    //         location.href = "http://104.40.49.149/";
    //     } else {
    //         $cookieStore.remove("email");
    //         $cookieStore.remove("pw");
    //     }
        
    // }


    /* Submit log in form*/
    login = function(){

        $http.get("app.php?cmd=get&key="+$scope.user.email, {
            transformResponse: function (data, headers) { //MESS WITH THE DATA
                JSON.stringify(data);
                return data;
            }
        })
        .success(function (data, status, headers, config) {
            //console.log(data);
            data = data.slice(10, -3);
            //console.log(data.length<5);
            if(data.length>5){
                JSON.parse(data, function(k, v){
                    //console.log(k+"  | "+v);
                    if(k=="password"){
                        if(v==$scope.user.passwd){
                           

                              $http.get("app.php?cmd=writeonline&key="+$scope.user.email)
                                    .success(function (data, status, headers, config) {
                                        $scope.messages = data.data.split(",");
                                        console.log($scope.messages);
                                    })
                                    .error(function (data, status, header, config) {
                                      
                                        console.log(data);
                                    });
                           
                                        function setCookie(cname, cvalue, exdays) {
                                            var d = new Date();
                                            d.setTime(d.getTime() + (exdays*24*60*60*1000));
                                            var expires = "expires="+ d.toUTCString();
                                            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
                                            }

                                setCookie("chatroomEmail", $scope.user.email,2);
                             location.href = 'chat.html?userEmail='+$scope.user.email;
                            //$cookieStore.put("pw", $scope.user.passwd);
                        }
                        else{
                            alert("your password is not corrected");
                            $scope.user.passwd = "";
                        }
                    }            
                });
            }
            else{
                alert("Cann't find you, you need sign up first!");
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
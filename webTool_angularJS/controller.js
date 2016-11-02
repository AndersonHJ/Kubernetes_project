
var angMod = angular.module("meapp", ['ngCookies']);


angMod.controller('mecontroller', function($scope, $http, $cookieStore) {
    $scope.res = [];
    
    $scope.hideLogin = true;
    $scope.hideSignup = true;
    $scope.titlehide = false;
    $scope.hideCounter = true;



    var time = new Date().toISOString();

    var sendTimestamp = function(userEmail){
        /*send hit data to database*/
        $http.post("http://104.199.119.167:27080/test/web_tool/_insert",
            'docs={"email": "'+userEmail+'", "timestamp":"'+time+'"}',{
                headers: { 
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
        })
        .success(function (data, status, headers, config) {
            console.log(status);
        });
    }

    var myEmail = $cookieStore.get("email");
    var myPw = $cookieStore.get("pw");

    if(myEmail!=undefined)
        sendTimestamp(myEmail);
    else
        sendTimestamp('unknown');

    if(myEmail!=undefined&&myPw!=undefined){
        if (confirm("Would you like to log in as a new user?") == false) {
            location.href = "http://104.40.49.149/";
        } else {
            $cookieStore.remove("email");
            $cookieStore.remove("pw");
        }
        
    }

    /*Functions for hiding and showing login or signup form*/
    $scope.showLogin = function(){
        $scope.hideSignup = true;
        $scope.hideLogin = false;
        $scope.titlehide = true;
        $scope.hideCounter = true;
    }

    $scope.showSignup = function(){
        $scope.hideLogin = true;
        $scope.hideSignup = false;
        $scope.titlehide = true;
        $scope.hideCounter = true;
    }

    $scope.showCounter = function(){
        $scope.hideLogin = true;
        $scope.hideSignup = true;
        $scope.titlehide = true;
        $scope.hideCounter = false;
    }


    /* Submit sign up form*/
    signup = function(){
       $scope.result = {
            firstName : "",
            lastName : "",
            birthday: "",
            city: "",
            email: "",
            passwd: ""
       };

       var send = {
            firstName: $scope.info.firstName,
            lastName: $scope.info.lastName,
            birthday: $scope.info.birthday,
            city: $scope.info.city,
            email: $scope.info.email,
            passwd: $scope.info.passwd
       };

    
        $http.get("map.php?cmd=set&key="+$scope.info.email+"&value="+JSON.stringify(send))
        .success(function (data, status, headers, config) {
            $scope.redisResponse = "Updated.";
        });
        
        $http.get("map.php?cmd=get&key="+$scope.info.email, {
            transformResponse: function (data, headers) { //MESS WITH THE DATA
                JSON.stringify(data);
                return data;
            }
        })
       .success(function (data, status, headers, config) {
            data = data.slice(10, -2);
            JSON.parse(data, function(k, v){
                //console.log(k+"  | "+v);
                if(k!="")
                   $scope.result[k] = v;
            });
            //console.log(data);
            //$scope.result = data;
            //console.log(data.data);
        })
        .error(function (data, status, header, config) {
            console.log(status);
        });

        $scope.res.push($scope.result);
        $scope.cancel();
        $scope.showLogin();
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
    login = function(){

        $http.get("map.php?cmd=get&key="+$scope.user.email, {
            transformResponse: function (data, headers) { //MESS WITH THE DATA
                JSON.stringify(data);
                return data;
            }
        })
        .success(function (data, status, headers, config) {
            //console.log(data);
            data = data.slice(10, -2);
            //console.log(data.length<5);
            if(data.length>5){
                JSON.parse(data, function(k, v){
                    //console.log(k+"  | "+v);
                    if(k=="passwd"){
                        if(v==$scope.user.passwd){
                            location.href = "http://104.40.49.149/";
                            $cookieStore.put("email", $scope.user.email);
                            $cookieStore.put("pw", $scope.user.passwd);
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


    $scope.countHourly = function(){
        var hourTime = new Date($scope.counter.hour);
        var hourTime2 = new Date($scope.counter.hour);
        
        hourTime.setHours(hourTime.getHours()-1);
        $http.get('http://104.199.119.167:27080/test/web_tool/_find?criteria={"timestamp":{"$gt":"'+hourTime.toISOString()+'","$lt":"'+hourTime2.toISOString()+'"}}',
        {
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        .success(function (data, status, headers, config) {
            $scope.resphour = data.results.length;
            console.log(data.results.length);
        });
    }

    $scope.countDayly = function(){
        var dayTime = new Date($scope.counter.day);
        var dayTime2 = new Date($scope.counter.day);
        dayTime.setDate(dayTime.getDate()-1);

        $http.get('http://104.199.119.167:27080/test/web_tool/_find?criteria={"timestamp":{"$gt":"'+dayTime.toISOString()+'","$lt":"'+dayTime2.toISOString()+'"}}',
        {
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        .success(function (data, status, headers, config) {
            $scope.respday = data.results.length;
            console.log(data.results.length);
        });
    }

    $scope.countMonthly = function(){
        var monthTime = new Date($scope.counter.month);
        var monthTime2 = new Date($scope.counter.month);
        monthTime.setDate(monthTime.getDate()-1);

        $http.get('http://104.199.119.167:27080/test/web_tool/_find?criteria={"timestamp":{"$gt":"'+monthTime.toISOString()+'","$lt":"'+monthTime2.toISOString()+'"}}',
        {
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        .success(function (data, status, headers, config) {
            $scope.respmonth = data.results.length;
            console.log(data.results.length);
        });
    }

    $scope.countYearly = function(){
        var yearTime = new Date($scope.counter.year);
        var yearTime2 = new Date($scope.counter.year);
        yearTime.setDate(yearTime.getDate()-1);

        $http.get('http://104.199.119.167:27080/test/web_tool/_find?criteria={"timestamp":{"$gt":"'+yearTime.toISOString()+'","$lt":"'+yearTime2.toISOString()+'"}}',
        {
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        .success(function (data, status, headers, config) {
            $scope.respyear = data.results.length;
            console.log(data.results.length);
        });
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
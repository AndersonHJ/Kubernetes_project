var radisApp = angular.module("redis", []);
radisApp.controller('RedisCtrl', function($scope,$http) {

    signup = function(){

        if($scope.info.password != $scope.info.confirmpassword) {
            alert("Please enter the same password");
            $scope.info.password = "";
            $scope.info.confirmpassword = "";

        } else {
            $scope.result = {
                email : "",
                password : "",
                confirmpassword: "",
                firstname : "",
                lastname : "",
                city : "",
                dateofbirth : "",
                securityquestion : "",
                answer : ""

            };

            var send = {
                email: $scope.info.email,
                password: $scope.info.password,
                confirmpassword: $scope.info.confirmpassword,
                firstname: $scope.info.firstname,
                lastname: $scope.info.lastname,
                city: $scope.info.city,
                dateofbirth: $scope.info.dateofbirth,
                securityquestion: $scope.info.securityquestion,
                answer: $scope.info.answer
            };



            $http.get("app.php?cmd=set&key="+$scope.info.email+"&value="+JSON.stringify(send))
                .success(function(data, status, headers, config) {
                    $scope.redisResponse = "Updated.";
                    location.href = "index.html";
                });

            $http.get("app.php?cmd=get&key="+$scope.info.email, {
                transformResponse: function (data, headers) {
                    JSON.stringify(data);
                    return data;
                }
            })
                .success(function (data, status, headers, config) {
                    data = data.slice(10, -3);
                    JSON.parse(data, function(key, value){
                        if(key != "")
                            $scope.result[key] = value;
                    });

                })
                .error(function (data, status, header, config){
                    console.log(status);
                });
        }


    }

    forgotpassword = function(){
        var x = document.getElementById('securityquestion_div');
        var y = document.getElementById('main_div');

        $http.get("app.php?cmd=get&key="+$scope.user.email, {
            transformResponse: function(data, header) {
                JSON.stringify(data);
                return data;
            }
        })
            .success(function (data, status,headers, config) {
                data = data.slice(10, -3);
                console.log(data);
                if (data.length > 5) {
                    JSON.parse(data, function(key, value){
                        if(key == "email"){
                            if(value == $scope.user.email){
                                //location.href = "forgotpassword_securityquestion.html";
                                x.style.display = 'block';
                                y.style.display = 'none';
                            }
                        }
                    });
                } else {
                    alert("The username you entered is not in our system, please try again!");
                    $scope.user.email = "";
                }


            })
            .error(function (data, status, headers, config) {
                console.log(data);
            })

        var security_question = "";

        $http.get("app.php?cmd=get&key="+$scope.user.email, {
            transformResponse: function(data, header) {
                JSON.stringify(data);
                return data;
            }
        })
            .success(function (data, status, headers, config) {
                data = data.slice(10, -3);
                console.log(data);
                if (data.length > 5) {
                    JSON.parse(data, function(key, value){
                        if(key == "securityquestion"){
                            security_question = value;
                            console.log(security_question);
                            $scope.security_question = security_question;
                        }
                    });
                } else {

                }


            })
            .error(function (data, status, headers, config) {
                console.log(data);
            })

    }

    getpassword = function(){
        var x = document.getElementById('password_div');
        var y = document.getElementById('securityquestion_div');

        $http.get("app.php?cmd=get&key="+$scope.user.email, {
            transformResponse: function(data, header) {
                JSON.stringify(data);
                return data;
            }
        })
            .success(function (data, status,headers, config) {
                data = data.slice(10, -3);
                console.log(data);
                if (data.length > 5) {
                    JSON.parse(data, function(key, value){
                        if(key == "answer"){
                            if(value == $scope.user.answer){
                                //location.href = "forgotpassword_securityquestion.html";
                                x.style.display = 'block';
                                y.style.display = 'none';
                            } else {
                                alert("The answer you entered is not correct, please try again!");
                                $scope.user.answer = "";
                            }
                        }
                    });
                } else {

                }


            })
            .error(function (data, status, headers, config) {
                console.log(data);
            })

        var request_password = "";

        $http.get("app.php?cmd=get&key="+$scope.user.email, {
            transformResponse: function(data, header) {
                JSON.stringify(data);
                return data;
            }
        })
            .success(function (data, status, headers, config) {
                data = data.slice(10, -3);
                console.log(data);
                if (data.length > 5) {
                    JSON.parse(data, function(key, value){
                        if(key == "password"){
                            request_password = value;
                            console.log(request_password);
                            $scope.request_password = request_password;
                        }
                    });
                } else {

                }


            })
            .error(function (data, status, headers, config) {
                console.log(data);
            })

    }

});
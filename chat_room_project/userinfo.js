var angMod = angular.module("myApp",[]);

angMod.controller('myctrl', function ($scope, $http) {

      $scope.info = {
            email : "",
            password : "",
            confirmpassword: "",
            firstname : "",
            lastname : "",
            city : "",
            dateofbirth : "",
            securityquestion : "",
            answer : ""
      }

      $scope.getInfo = function(){
            var href = window.location.href;
            var index = href.indexOf("=");
            var userEmail = href.substr(index+1);
            console.log(userEmail);


            $http.get("app.php?cmd=get&key="+userEmail, {
                transformResponse: function (data, headers) {
                    JSON.stringify(data);
                    console.log(data);
                    return data;
                }
            })
             .success(function (data, status, headers, config) {
                 data = data.slice(10, -3);
                 console.log(data);
                 JSON.parse(data, function(key, value){
                 if(key != "")
                       $scope.info[key] = value;
                 });

              })
              .error(function (data, status, header, config){
                  console.log(status);
              });
      }

      $scope.submit = function(){
            var send = {
                email: $scope.info.email,
                password: $scope.info.password,
                firstname: $scope.info.firstname,
                lastname: $scope.info.lastname,
                city: $scope.info.city,
                dateofbirth: $scope.info.dateofbirth,
                securityquestion: $scope.info.securityquestion,
                answer: $scope.info.answer
            };
            $http.get("app.php?cmd=set&key="+$scope.info.email +"&value="+JSON.stringify(send))
                .success(function(data, status, headers, config) {
                    $scope.redisResponse = "Updated.";
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
                       $scope.info[key] = value;
                 });

              })
              .error(function (data, status, header, config){
                  console.log(status);
              });
           
          alert("Your information is saved!");

      }

      $scope.cancel = function(){
          window.close();
      }
})

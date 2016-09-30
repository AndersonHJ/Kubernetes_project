
angular.module("meapp", []).controller('mecontroller', function($scope, $http) {
            $scope.submit = function(){
               
               var data = {
                  fname: $scope.firstName,
                  lname: $scope.lastName,
                  bir: $scope.birthday,
                  houseNumber : $scope.houseNum,
                  street: $scope.street,
                  city: $scope.city
               };
               $scope.res = data;

               // $http.post("104.199.119.167", data).then(function(response){
               //    $scope.res = response;
               // });
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

var angMod = angular.module("meapp", []);
angMod.controller('mecontroller', function($scope, $http) {
            $scope.res = [];
            $scope.submit = function(){
               var arr = [];
               var data = {
                  fname: $scope.firstName,
                  lname: $scope.lastName,
                  bir: $scope.birthday,
                  houseNumber : $scope.houseNum,
                  street: $scope.street,
                  city: $scope.city
               };
               
               $scope.res.push(data);

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
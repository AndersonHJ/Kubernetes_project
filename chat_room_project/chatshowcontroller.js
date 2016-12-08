var angShow = angular.module("showapp", []);
angShow.controller('showcontroller', function($scope, $http, $filter) {
    var curTime = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');

    $scope.fresh = function(){
        console.log("loading");
        $scope.load();
        $scope.getHistory();
        setInterval(function(){
            $scope.load();
            $scope.getHistory();
        }, 3000);
    }

   
    $scope.sendmsg = function(){
        var mintime = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
        var name = document.getElementById('getusername').innerHTML;
        // console.log(name);
        var obj = {
            username: name,
            newmsg: $scope.msg,
            msgtime: mintime
        };
        // console.log($scope.msg);
        if($scope.msg!=""&&$scope.msg!=undefined){
            $http.get("app.php?cmd=append&key=messages&value=" + JSON.stringify(obj))
                .success(function (data) {
                    $scope.msg="";
                    $scope.redisResponse = "Updated.";
                    console.log("append success");

                    $scope.load();                    
                });
        }

    }
    $scope.load = function(){
        $http.get("app.php?cmd=get&key=messages", {
            transformResponse: function(data,headers){
                JSON.stringify(data);
                return data;
            }
        })
        .success(function(data,status, headers, config) {
            
            console.log("get load");

            data = data.slice(11, -3);
            // console.log(data);
            $scope.messages = [];

            var msgs = angular.fromJson('[' + data + ']');

            for(var i = 0; i<msgs.length; i++){
                //console.log(msgs[i].msgtime+" | "+curTime);
                if(msgs[i].msgtime>curTime){
                    $scope.messages.push(msgs[i]);
                }
            }

            
        })
        .error(function(data, status, headers, config){
            
        })
    }


    $scope.getHistory = function(){
        $http.get("app.php?cmd=get&key=messages", {
            transformResponse: function(data,headers){
                JSON.stringify(data);
                return data;
            }
        })
        .success(function(data,status, headers, config) {
            
            console.log("get history");

            data = data.slice(11, -3);

            $scope.history = angular.fromJson('[' + data + ']');
            //console.log($scope.history);

        })
        .error(function(data, status, headers, config){
            
        })
    }
    // /*recall last message*/
    // $scope.recall = function(){
    //     // $scope.input.email = "";
    //     // $scope.input.password = "";
    // }
    $scope.logout = function(){
        var name = document.getElementById('getusername').innerHTML;
        $http.get("app.php?cmd=deleteonline&key="+name)
        .success(function (data, status, headers, config) {
            document.cookie = "chatroomEmail" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            location.href = "index.html";
           
        })
        .error(function (data, status, header, config) {
            
            console.log(data);
        });
     }

     $scope.online = function(){
        
        $http.get("app.php?cmd=checkonline")
            .success(function (data, status, headers, config) {
             $scope.onlineuser = data;
           
        })
        .error(function (data, status, header, config) {
            
            console.log(data);
        });
     }

});

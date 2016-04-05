    angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope) {

    })

    .controller('ChatsCtrl', function ($scope, Deliveries, $http) { // was D

        Deliveries.getDeliveries().then(function (deliveries) {

            var tempDeliveries = [];

          //         console.log(JSON.stringify(deliveries, null, 4));
            if (deliveries.data.length > 0) {
                    
                for (var i = 0, tot = deliveries.data.length; i < tot; i++) {
                    
                    
                    //I know this is lazy
                    var imgProd;
                    switch (deliveries.data[i].product)
                        {
                            case "Latte":
                                imgProd = "2";
                                break;
                            case "Cappuccino":
                                imgProd = "1";
                                break;
                            case "Americano":
                                imgProd = "4";
                                break;
                            case "Espresso":
                                imgProd = "3";
                                break;
                            default:
                                imgProd = "3";
                                break;
                        }
                        
                    
                    tempDeliveries.push({
                        "id": deliveries.data[i].rowKey,
                        "Name": deliveries.data[i].name,
                        "Product": deliveries.data[i].product,
                        "face": 'http://mscoffee.azurewebsites.net/Images/' + imgProd + '.jpg'
                    });
                }

                $scope.deliveries = tempDeliveries;
            }

        });

        $scope.doRefresh = function () {

            $http.defaults.headers.get = {
                'Content-Type': 'application/json',
                'Ocp-Apim-Trace': 'true',
                'Ocp-Apim-Subscription-Key': 'f8a3bcc16d0944d89c8bd02ab93bfc99'
            }

            $http.get('https://msapim.azure-api.net/msorderhandling.azurewebsites.net/api/deliveries')
            .success(function (deliveries) {

                tempDeliveries = [];

                if (deliveries.length > 0) {
                    for (var i = 0, tot = deliveries.length; i < tot; i++) {
                        
                    //I know this is lazy
                    var imgProd;
                    switch (deliveries[i].product)
                        {
                            case "Latte":
                                imgProd = "2";
                                break;
                            case "Cappuccino":
                                imgProd = "1";
                                break;
                            case "Americano":
                                imgProd = "4";
                                break;
                            case "Espresso":
                                imgProd = "3";
                                break;
                            default:
                                imgProd = "3";
                                break;
                        }
                        
                  //      console.log(JSON.stringify(deliveries, null, 4));
                        tempDeliveries.push({
                            "id": deliveries[i].rowKey,
                            "Name": deliveries[i].name,
                            "Product": deliveries[i].product,
                            "face": 'http://mscoffee.azurewebsites.net/Images/' + imgProd + '.jpg'
                        });
                    }

                    $scope.deliveries = tempDeliveries

                }

            })
             .finally(function () {
                 $scope.deliveries = tempDeliveries
                 $scope.$broadcast('scroll.refreshComplete')

             })
        };

    })

    .controller('ChatDetailCtrl', function ($scope, $stateParams, Deliveries, $http, $ionicPopup) {
   //     console.log(JSON.stringify(deliveries, null, 4));
        console.log($stateParams.deliveryId + " is");
        
          $http.defaults.headers.get = {
                'Content-Type': 'application/json',
                'Ocp-Apim-Trace': 'true',
                'Ocp-Apim-Subscription-Key': 'f8a3bcc16d0944d89c8bd02ab93bfc99'
            }
        
           $http.get('https://msapim.azure-api.net/msorderhandling.azurewebsites.net/api/deliveries/'+$stateParams.deliveryId)
            .success(function (deliveries) {

                tempDeliveries = [];

                if (deliveries.length > 0) {
                    for (var i = 0, tot = deliveries.length; i < tot; i++) {
           //             console.log(JSON.stringify(deliveries, null, 4));
            //            console.log(deliveries[i].name);
                        
                    //I know this is lazy
                    var imgProd;
                    switch (deliveries[i].product)
                        {
                            case "Latte":
                                imgProd = "2";
                                break;
                            case "Cappuccino":
                                imgProd = "1";
                                break;
                            case "Americano":
                                imgProd = "4";
                                break;
                            case "Espresso":
                                imgProd = "3";
                                break;
                            default:
                                imgProd = "3";
                                break;
                        }
                        tempDeliveries.push({
                            "id": deliveries[i].rowKey,
                            "name": deliveries[i].name,
                            "location": deliveries[i].location,
                            "mobile": deliveries[i].mobile,
                            "product": deliveries[i].product,
                            "face": 'http://mscoffee.azurewebsites.net/Images/' + imgProd + '.jpg'
                        });
                    }

                    $scope.deliveries = tempDeliveries;

                }

            })
             .finally(function () {
                 $scope.deliveries = tempDeliveries;
     //            $scope.$broadcast('scroll.refreshComplete')

             })
        
       $scope.pushDeliveryChange = function() {
           
           
           
             $http.defaults.headers.post = {
                'Content-Type': 'application/json',
                'Ocp-Apim-Trace': 'true',
                'Ocp-Apim-Subscription-Key': 'f8a3bcc16d0944d89c8bd02ab93bfc99'
            }
 //           console.log('Push Delivery Change', $scope.pushDelivery.checked + $scope.pushDelivery.id);

            $http.post('https://msapim.azure-api.net/msorderhandling.azurewebsites.net/api/delivery/'+$stateParams.deliveryId)
            .success(function (deliveries) {
                console.log("pushed");
//                var success = "Y";
//                        
//               $scope.emailDelivery = 'Delivered';  
                               // An alert dialog
                 var alertPopup = $ionicPopup.alert({
                   title: 'Order ' + $stateParams.deliveryId + ' set to delivered',
                   template: 'Another coffee served'
                 });
                 alertPopup.then(function(res) {
           //        console.log('Thank you for not eating my delicious ice cream cone');
                 });


            })
       };

      $scope.pushDelivery = { checked: true };
        
        
      
//        
//         for (var i = 0; i < $scope.deliveries.length; i++) {
//                if (deliveries[i].id === parseInt($stateParams.deliveryId)) {
//                    $scope.deliveries =  deliveries[i];
//                }
//            }
     //   $scope.deliveries = Deliveries.get($stateParams.deliveryId);
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });

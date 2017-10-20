            angular.module('starter.controllers', ['ionic'])

            .controller('DashCtrl', function ($scope, $state, $ionicModal) {

            var success = false;
            var pushRegistration = null;
            console.log("Version 1.0");

            $scope.signIn = function (user) {
           //     console.log('Sign-In', user);
                // Login to the service

                Engagement.startActivity("signIn",{});

                 var client = new WindowsAzure.MobileServiceClient(
                               "https://[].azurewebsites.net");


                client.login('aad') //SSO
           //     client.login('google')
                    .then(function () { //SSO

                     // Added to register for push notifications.

                         //let#'s register with the hub
                            var connectionString = "Endpoint=sb://[].servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=[]",
                            notificationHubPath = "msdeliveriespush";

                      registerForPushNotifications();
               //        console.log("out of register");    
                      $state.go('tab.deliveries');

                    }, handleError); //SSO


            };

                function handleError(message)
                {

                    console.log("In error " + message);
                }

                // Register for Push Notifications.
                // Requires that phonegap-plugin-push be installed.

                function registerForPushNotifications() {

                    try
                        {
                            var pushRegistration = null;

                            // Register with Azure mobile app

                                var client = new WindowsAzure.MobileServiceClient(
                               "https://[].azurewebsites.net");

                            // Register for Azure Mobile Engagement push

                                Engagement.initializeReach(  
                                // on OpenUrl  
                                function(_url) 
                                    {   
                                        alert(_url);   
                                    });  
                                Engagement.startActivity("signInPush",{});  

                          //    Register for native PNS push
                              pushRegistration = PushNotification.init({
                                android: {
                                    senderID: '[]'
                                },
                                ios: {
                                    alert: 'true',
                                    badge: 'true',
                                    sound: 'true'
                                },
                                wns: {

                                }
                            });

                         //       console.log("Still In register");


                            pushRegistration.on('registration', function (data) {
                                 console.log("About to register Client");
                                client.push.register('gcm', data.registrationId);
                                    console.log("Client registered " + data.registrationId );

                              //         pushRegistration.on('notification', function (data, d2) {
                               //     alert('Undelivered order: ' + data.message);
                           //     });

                            });

                         //       console.log("In register2");
                            console.log("About to switch on push");
                            pushRegistration.on('notification', function (data, d2) {
                                alert('Undelivered order: ' + data.message);
                            });

                           //     console.log("In register3");

                            pushRegistration.on('error', handleError);
                        }
                    catch(e)
                        {
                            handleError(e.message);
                        }



                }

        })

        //    .controller('DashCtrl', function ($scope) {
        //
        //    })

            .controller('ChatsCtrl', function ($scope, Deliveries, $http) { // was D

                Deliveries.getDeliveries().then(function (deliveries) {

                    var tempDeliveries = [];
                    Engagement.startActivity("gettingDeliveries",{});

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
                                "face": 'https://mscoffee.azurewebsites.net/Images/' + imgProd + '.jpg'
                            });
                        }

                        $scope.deliveries = tempDeliveries;
                    }

                });

                $scope.doRefresh = function () {

                    Engagement.startActivity("refreshingDeliveries",{});

                    $http.defaults.headers.get = {
                        'Content-Type': 'application/json',
                        'Ocp-Apim-Trace': 'true',
                        'Ocp-Apim-Subscription-Key': ''
                    }

                    $http.get('https://msapim.azure-api.net/[].azurewebsites.net/api/deliveries')
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
                                    "face": 'https://mscoffee.azurewebsites.net/Images/' + imgProd + '.jpg'
                                });
                            }

                            $scope.deliveries = tempDeliveries
                         //    registerForPushNotifications();

                            /*
                            //start
                              try
                        {
                            var pushRegistration = null;
                                var client = new WindowsAzure.MobileServiceClient(
                               "http://msdeliveries.azurewebsites.net");

                          //    console.log("In register");
                              pushRegistration = PushNotification.init({
                                android: {
                                    senderID: ''
                                },
                                ios: {
                                    alert: 'true',
                                    badge: 'true',
                                    sound: 'true'
                                },
                                wns: {

                                }
                            });

                         //       console.log("Still In register");

                            pushRegistration.on('registration', function (data) {
                                 console.log("About to register Client");
                                client.push.register('gcm', data.registrationId);
                                    console.log("Client registered");
                            });

                         //       console.log("In register2");
                                  console.log("About to switch on push");
                            pushRegistration.on('notification', function (data, d2) {
                                alert('Push Received: ' + data.message);
                            });

                           //     console.log("In register3");

                            pushRegistration.on('error', handleError);
                        }
                    catch(e)
                        {
                            handleError(e.message);
                        }


                        function handleError(message)
                            {

                                console.log("In error " + message);
                            }


                            // End
    */
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

                Engagement.startActivity("deliveryDetail",{});

                  $http.defaults.headers.get = {
                        'Content-Type': 'application/json',
                        'Ocp-Apim-Trace': 'true',
                        'Ocp-Apim-Subscription-Key': ''
                    }

                   $http.get('https://msapim.azure-api.net/[].azurewebsites.net/api/deliveries/'+$stateParams.deliveryId)
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
                                    "face": 'https://mscoffee.azurewebsites.net/Images/' + imgProd + '.jpg'
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

                   Engagement.startActivity("pushDeliveryChange",{});

                     $http.defaults.headers.post = {
                        'Content-Type': 'application/json',
                        'Ocp-Apim-Trace': 'true',
                        'Ocp-Apim-Subscription-Key': ''
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

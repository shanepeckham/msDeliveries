    angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope) {

    })

    .controller('ChatsCtrl', function ($scope, Deliveries, $http) {

        Deliveries.getDeliveries().then(function (deliveries) {

            var tempDeliveries = [];

            if (deliveries.data.length > 0) {
                for (var i = 0, tot = deliveries.data.length; i < tot; i++) {
                    tempDeliveries.push({
                        "id": i,
                        "Name": deliveries.data[i].name,
                        "Product": deliveries.data[i].product,
                        "face": 'http://www.newdream.nl/images/contact.png'
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

                if (deliveries.deliveries.length > 0) {
                    for (var i = 0, tot = deliveries.deliveries.length; i < tot; i++) {
                        tempDeliveries.push({
                            "id": i,
                            "name": deliveries.deliveries[i].name,
                            "message": deliveries.deliveries[i].message,
                            "face": 'http://www.newdream.nl/images/contact.png'
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

    .controller('ChatDetailCtrl', function ($scope, $stateParams, Deliveries) {
        $scope.deliveries = Deliveries.get($stateParams.deliveryId);
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });

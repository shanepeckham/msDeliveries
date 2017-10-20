angular.module('starter.services', [])

.factory('Deliveries', function ($http) {


    var deliveries = [];
    console.log("about to query");

    return {
        getDeliveries: function () {

            $http.defaults.headers.get = {
                'Content-Type': 'application/json',
                'Ocp-Apim-Trace': 'true',
                'Ocp-Apim-Subscription-Key': ''
        }


            return $http.get('https://msapim.azure-api.net/[].azurewebsites.net/api/deliveries').then(function (response) {
                deliveries = response;

                return deliveries;
            });
        }
    }


    return {
        all: function () {
            console.log("In all Deliveries");
            return deliveries;
        },
        remove: function (delivery) {
            deliveries.splice(deliveries.indexOf(delivery), 1);
        },
        get: function (deliveryId) {
            for (var i = 0; i < deliveries.length; i++) {
                if (deliveries[i].id === parseInt(deliveryId)) {
                    return deliveries[i];
                }
            }
            return null;
        }
    };
});

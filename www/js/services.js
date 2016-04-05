angular.module('starter.services', [])

.factory('Deliveries', function ($http) {


    var deliveries = [];
    console.log("about to query");

    return {
        getDeliveries: function () {

            $http.defaults.headers.get = {
                'Content-Type': 'application/json',
                'Ocp-Apim-Trace': 'true',
                'Ocp-Apim-Subscription-Key': 'f8a3bcc16d0944d89c8bd02ab93bfc99'
        }


            return $http.get('https://msapim.azure-api.net/msorderhandling.azurewebsites.net/api/deliveries').then(function (response) {
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

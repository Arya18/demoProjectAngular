
// angular js codes will be here
phonecatApp.controller('aboutCtrl', ["$scope", function ($scope) {
        $scope.message = 'About';
    }]);


phonecatApp.controller('productsCtrl', ["$rootScope","$scope", "$http", "$location","$window", function ($rootScope, $scope, $http, $location,$window) {
        $scope.logo = 'HCLDemo';
        $scope.welcomeMessage = false;
        
        $scope.user = {};
        $scope.logins = {};
        $scope.getAll = function () {
            $http.get("/data/products.json").success(function (response) {
                $scope.names = response.records;
            });
        }
        $scope.loginForm = function () {
            $rootScope.username ='';
            $rootScope.session = false;
            $http({
                method: 'GET',
                url: '/data/users.json',
                data: $scope.logins,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function (data, status, headers, config) {
//                var json = JSON.parse(data);
                 console.log(data[0].session);
                if (data.errormessage) {
                    Materialize.toast(data.errormessage, 4000);
                } else {
//                        console.log("logged")
                        $location.path('/listing');
                        $rootScope.session = true;
                        console.log($scope.session);
                        $rootScope.username = data[0].session.firstname + " "+  data[0].session.lastname;
                        $rootScope.id = data[0].session.id;
                        console.log($rootScope.username);
//                        $route.reload();
                        Materialize.toast(data[0].message.login, 4000);
                }
            })
        }
        $scope.logout = function(){
            $http({
                method:'GET',
                url:'logout.php',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
                    success(function(data, status, headers, config){
                        console.log(status);
                         Materialize.toast("Thanks! Visit again", 4000);
                         $rootScope.session = false;
                    });
        }
        $scope.submitForm = function () {
            $http({
                method: 'POST',
                url: 'authenticate.php',
                data: $scope.user,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
                    .success(function (data, status, headers, config) {
//                        console.log(data)
                        if (data.status) {
                            User.isLogged = true;
                        }
                        if (data.errors) {
                            $scope.errorName = data.errors.name;
                            $scope.errorUserName = data.errors.username;
                            $scope.errorEmail = data.errors.email;
                            Materialize.toast(data.errors.firstname, 4000);
                            Materialize.toast(data.errors.lastname, 4000);
                            Materialize.toast(data.errors.email, 4000);
                            Materialize.toast(data.errors.password, 4000);
                        } else {
//                            $scope.message = data.message;
//                            $scope.hello = data;
                            if(data != "Email already exists"){
                            $scope.welcomeMessage = true;
                        }
                            console.log($scope.welcomeMessage);
                            Materialize.toast(data, 4000);
                        }
                    });
        };
        $scope.readOne = function (id) {

            // change modal title
            $('#modal-product-title').text("Edit Product");

            // show udpate product button
            $('#btn-update-product').show();

            // show create product button
            $('#btn-create-product').hide();

            // post id of product to be edited
            $http.post('read_one.php', {
                'id': id
            })
                    .success(function (data, status, headers, config) {
                        console.log(data)
                        // put the values in form
                        $scope.id = data[0]["id"];
                        $scope.name = data[0]["name"];
                        $scope.description = data[0]["description"];
                        $scope.price = data[0]["price"];

                        // show modal
                        $('#modal-product-form').openModal();
                    })
                    .error(function (data, status, headers, config) {
                        Materialize.toast('Unable to retrieve record.', 4000);
                    });
        }
        $scope.deleteProduct = function (id) {
            // ask the user if he is sure to delete the record
            if (confirm("Are you sure?")) {
                // post the id of product to be deleted
                $http.post('delete_product.php', {
                    'id': id
                }).success(function (data, status, headers, config) {

                    // tell the user product was deleted
                    Materialize.toast(data, 4000);

                    // refresh the list
                    $scope.getAll();
                });
            }
        }
        
        // retrieve record to fill out the form

    }]);

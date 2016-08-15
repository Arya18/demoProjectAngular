'use strict';

// Define the `phonecatApp` module

var phonecatApp = angular.module('phonecatApp', ['ngRoute']);

// Define the `PhoneListController` controller on the `phonecatApp` module
phonecatApp.controller('PhoneListController', function PhoneListController($rootScope, $scope, $http, $location,$window) {
  $scope.phones = [
    {
      name: 'Nexus S',
      snippet: 'Fast just got faster with Nexus S.'
    }, {
      name: 'Motorola XOOM™ with Wi-Fi',
      snippet: 'The Next, Next Generation tablet.'
    }, {
      name: 'MOTOROLA XOOM™',
      snippet: 'The Next, Next Generation tablet.'
    }
  ];
  
  $scope.logo = 'HCLDemo';
  
  $scope.welcomeMessage = false;
        
        $scope.user = {};
        $scope.logins = {};
        
        $scope.orderProp = 'age';  
        $scope.names = [
      {
         "id":"75",
         "name":"asd",
         "description":"adsense",
         "price":"233",
         "age":1
      },
      {
         "id":"73",
         "name":"rt",
         "description":"srt",
         "price":"435",
         "age":2
      },
      {
         "id":"11",
         "name":"Huawei SnapTo",
         "description":"Support all GSM 4G LTE Networks T-Mobile, AT&amp;T, Straight Talk",
         "price":"172",
         "age":3
      },
      {
         "id":"10",
         "name":"Sony Smart Watch 3",
         "description":"Contextually aware and smart, Android Wear gives you useful information",
         "price":"194",
         "age":4
      },
      {
         "id":"9",
         "name":"Spalding Men",
         "description":"Right from the beginning, it was all about being first, being the best�being what others could only dream of becoming. Founded by Boston Red Stockings pitcher A.G. Spalding in 1876, Spalding has become a leader of innovation and quality in the sporting goods industry.",
         "price":"49",
         "age":5
      },
      {
         "id":"8",
         "name":"Samsung Galaxy Tab 4",
         "description":"Ideal for watching HD movies, playing games, browsing the web, or reading, the Samsung Galaxy Tab 4 features a 10.1-inch, 1280x800 resolution screen, so you experience rich graphics, bright colors, and crisp text.",
         "price":"210",
         "age":6
      },
      {
         "id":"7",
         "name":"HP ZBook 17 Mobile Business Workstation",
         "description":"Feel the power! Take performance to a new level with the HP ZBook 17 with Intel's quad core CPU and 4GB GDDR5 Nvidia Quadro graphics.  Project a professional image at the office, client meetings, and on the road without sacrificing durability in a stylish chassis.",
         "price":"5149",
         "age":7
      },
      {
         "id":"6",
         "name":"Bench Men's Bench Spokes Slim T-Shirt",
         "description":"Make their heads spin by rollin' through with swag to spare. Cotton-poly heather blend provides for a soft, comfortable wear. Screen printed Bench graphics on front. Slim fitting for modern appeal. Contrast topstitching along shoulders. Ribbed crew neck. Short sleeves",
         "price":"14",
         "age":8
      },
      {
         "id":"3",
         "name":"Samsung Galaxy S4 i9500 16GB",
         "description":"Make your life richer, simpler, and more fun. As a real life companion, the new Samsung GALAXY S4 helps bring us closer and captures those fun moments when we are together. Each feature was designed to simplify our daily lives. Furthermore, it cares enough to monitor our health and well being.",
         "price":"600",
         "age":9
      },
      {
         "id":"2",
         "name":"Motorola Google Nexus 6, Midnight Blue 32GB",
         "description":"The stunning 6 inch Quad HD display is great for movies, videos, gaming, e-books, and surfing the Web, and the Nexus 6 provides exceptional battery life.",
         "price":"400",
         "age":10
      },
      {
         "id":"1",
         "name":"LG Optimus 4X HD P880 Black",
         "description":"Display - True HD-IPS LCD - 720 x 1280 pixels, 4.7 inches. Internal Memory - 16 GB storage (12 GB user available), 1 GB RAM. Camera - 8 MP, 3264x2448 pixels, autofocus, LED flash",
         "price":"309",
         "age":11
      }
   ];           
            
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
                 console.log($scope.logins.email)
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
        
        $scope.showCreateForm = function () {
            // change modal title
            console.log("asdefuhy")
            $('#modal-product-title').text("Create New Product");

            // hide update product button
            $('#btn-update-product').hide();

            // show create product button
            $('#btn-create-product').show();
            $('#modal-product-form').openModal();
            // clear variable / form values
            $scope.clearForm = function () {
                $scope.id = "";
                $scope.name = "";
                $scope.description = "";
                $scope.price = "";
                $scope.createProduct = function () {

                    // fields in key-value pairs
                    $http.post('create_product.php', {
                        'name': $scope.name,
                        'description': $scope.description,
                        'price': $scope.price
                    }
                    ).success(function (data, status, headers, config) {
                        console.log(data);
                        // tell the user new product was created
                        Materialize.toast(data, 4000);

                        // close modal
                        $('#modal-product-form').closeModal();

                        // clear modal content
                        $scope.clearForm();

                        // refresh the list
                        $scope.getAll();
                    });
                }
            }
            // clear form
            $scope.clearForm();
            // create new product 


            // update product record / save changes
            $scope.updateProduct = function () {
                $http.post('update_product.php', {
                    'id': $scope.id,
                    'name': $scope.name,
                    'description': $scope.description,
                    'price': $scope.price
                })
                        .success(function (data, status, headers, config) {
                            // tell the user product record was updated
                            Materialize.toast(data, 4000);

                            // close modal
                            $('#modal-product-form').closeModal();

                            // clear modal content
                            $scope.clearForm();

                            // refresh the product list
                            $scope.getAll();
                        });
            }
            // delete product


        }
  
  
});



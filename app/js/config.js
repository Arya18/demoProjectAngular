

phonecatApp.config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/about', {
            templateUrl: "/templates/about.html",
            controller: "aboutCtrl"
        }).when('/signup', {
            templateUrl: "/templates/signup.html",
            controller: "PhoneListController"
        }).when('/services', {
            templateUrl: "/templates/services.html"
        }).when('/home', {
            templateUrl: "/templates/home.html"
        }).when('/listing', {
            templateUrl: "/templates/product_listing.html",
            controller: "PhoneListController"
        }).when('/login', {
            templateUrl: "/templates/login.html",
            controller: "PhoneListController"
        }).otherwise({
            redirectTo: "/home",
            controller:"PhoneListController"
        });
    }
]);



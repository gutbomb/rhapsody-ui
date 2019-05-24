var app = angular.module('skeletonUiApp', ['ngRoute', 'ngSanitize', 'angularMoment', 'skeletonUi.config']);

import navMenuController from '../components/common/nav-menu/nav-menu-controller';
import navMenu from '../components/common/nav-menu/nav-menu-directive';
import sideMenuController from '../components/common/side-menu/side-menu-controller';
import sideMenu from '../components/common/side-menu/side-menu-directive';
import pageHeader from '../components/common/page-header/page-header-directive';
import pageFooter from '../components/common/page-footer/page-footer-directive';
import accountController from '../components/account/account-controller';
import loginController from '../components/login/login-controller';
import loginService from '../components/login/login-service';
import authenticationInterceptor from '../components/login/authentication-interceptor-service';
import changePasswordController from '../components/account/change-password-controller';
import usersController from '../components/users/users-controller';
import addUserController from '../components/users/add-user-controller';
import editUserController from '../components/users/edit-user-controller';
import deleteUserModal from '../components/users/delete-user-modal-directive';
import signUpController from '../components/sign-up/sign-up-controller';
import colorwaysController from '../components/colorways/colorways-controller';
import colorwaysService from '../components/colorways/colorways-service';
import contentController from '../components/content/content-controller';
import contentService from '../components/content/content-service';

app.config(function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/home', {
            templateUrl: 'components/content/content-template.html',
            controller: 'contentController',
            controllerAs: 'cc',
            activeTab: 'home'
        })
        .when('/account', {
            templateUrl: 'components/account/account-template.html',
            controller: 'accountController',
            controllerAs: 'acc',
            activeTab: 'account'
        })
        .when('/change-password', {
            templateUrl: 'components/account/change-password-template.html',
            controller: 'changePasswordController',
            controllerAs: 'cpc',
            activeTab: 'account'
        })
        .when('/reset-password', {
            templateUrl: 'components/login/reset-password-template.html',
            controller: 'loginController',
            controllerAs: 'lc',
            activeTab: 'login'
        })
        .when('/login', {
            templateUrl: 'components/login/login-template.html',
            controller: 'loginController',
            controllerAs: 'lc',
            activeTab: 'login'
        })
        .when('/users', {
            templateUrl: 'components/users/users-template.html',
            controller: 'usersController',
            controllerAs: 'uc',
            activeTab: 'users'
        })
        .when('/add-user', {
            templateUrl: 'components/users/add-user-template.html',
            controller: 'addUserController',
            controllerAs: 'auc',
            activeTab: 'users'
        })
        .when('/edit-user/:id', {
            templateUrl: 'components/users/edit-user-template.html',
            controller: 'editUserController',
            controllerAs: 'euc',
            activeTab: 'users'
        })
        .when('/sign-up', {
            templateUrl: 'components/sign-up/sign-up-template.html',
            controller: 'signUpController',
            controllerAs: 'suc',
            activeTab: 'sign-up'
        })
        .when('/validate/:userValidationString', {
            templateUrl: 'components/login/validate-template.html',
            controller: 'loginController',
            controllerAs: 'lc',
            activeTab: 'login'
        })
        .when('/not-validated', {
            templateUrl: 'components/login/not-validated-template.html',
            controller: 'loginController',
            controllerAs: 'lc',
            activeTab: 'login'
        })
        .when('/colorways', {
            templateUrl: 'components/colorways/colorways-template.html',
            controller: 'colorwaysController',
            controllerAs: 'cwc',
            activeTab: 'colorways'
        })
        .when('/wholesale', {
            templateUrl: 'components/content/content-template.html',
            controller: 'contentController',
            controllerAs: 'cc',
            activeTab: 'wholesale'
        })
        .when('/custom', {
            templateUrl: 'components/content/content-template.html',
            controller: 'contentController',
            controllerAs: 'cc',
            activeTab: 'custom'
        })
        .when('/classes', {
            templateUrl: 'components/content/content-template.html',
            controller: 'contentController',
            controllerAs: 'cc',
            activeTab: 'classes'
        })
        .when('/rabbitry', {
            templateUrl: 'components/content/content-template.html',
            controller: 'contentController',
            controllerAs: 'cc',
            activeTab: 'rabbitry'
        })
        .when('/shop', {
            templateUrl: 'components/content/content-template.html',
            controller: 'contentController',
            controllerAs: 'cc',
            activeTab: 'shop'
        })
        .when('/index.php/colorways', {
            redirectTo: '/colorways'
        })
        .when('/index.php/wholesale', {
            redirectTo: '/wholesale'
        })
        .when('/index.php/custom', {
            redirectTo: '/custom'
        })
        .when('/index.php/classes', {
            redirectTo: '/classes'
        })
        .when('/index.php/rabbitry', {
            redirectTo: '/rabbitry'
        })
        .when('/index.php/shop', {
            redirectTo: '/shop'
        })
        .otherwise({
            redirectTo: '/home'
        });
});

app.controller('navMenuController', navMenuController);
app.directive('navMenu', navMenu);
app.controller('sideMenuController', sideMenuController);
app.directive('sideMenu', sideMenu);
app.directive('pageHeader', pageHeader);
app.directive('pageFooter', pageFooter);
app.controller('accountController', accountController);
app.controller('loginController', loginController);
app.factory('loginService', loginService);
app.factory('authenticationInterceptor', authenticationInterceptor);
app.controller('changePasswordController', changePasswordController);
app.controller('usersController', usersController);
app.controller('addUserController', addUserController);
app.controller('editUserController', editUserController);
app.directive('deleteUserModal', deleteUserModal);
app.controller('signUpController', signUpController);
app.controller('colorwaysController', colorwaysController);
app.factory('colorwaysService', colorwaysService);
app.controller('contentController', contentController);
app.factory('contentService', contentService);


app.config(function($httpProvider) {
    $httpProvider.interceptors.push('authenticationInterceptor');
});

app.run(function ($rootScope, $location, loginService) {
    // $rootScope.$on('$routeChangeStart', function () {
    //     $rootScope.isLoggedIn = loginService.isAuthenticated();
    //     if ($rootScope.isLoggedIn === true) {
    //         $rootScope.userId = loginService.getUserId();
    //         loginService.getUser($rootScope.userId).then(function(user) {
    //             $rootScope.user=user;
    //             $rootScope.isAdmin = $rootScope.user.user_level === 'admin';
    //             if($rootScope.user.user_email_validated===0) {
    //                 loginService.clearToken();
    //                 $rootScope.isLoggedIn = false;
    //                 $location.path('/not-validated');
    //             }
    //             if($rootScope.user.password_mustchange===1) {
    //                 $location.path('/change-password');
    //             }
    //         });
    //     } else {
    //         if ($location.path().includes('sign-up') === false && $location.path().includes('reset-password') === false && $location.path().includes('validate') === false) {
    //             $location.path('/login');
    //         }
    //     }
    // });
});

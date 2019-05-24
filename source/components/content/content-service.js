export default function ($q, $http, $window, $rootScope, $location, appConfig) {

    function getArticle(tab) {
        return $http.get(appConfig.apiUrl+'/articles/'+tab).then(function(response) {
            return response.data[0];
        });
    }

    return {
        getArticle: getArticle,
    };
}


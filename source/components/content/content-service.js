export default function ($q, $http, $window, $rootScope, $location, appConfig, Upload) {

    function getArticle(tab) {
        return $http.get(appConfig.apiUrl+'/articles/'+tab).then(function(response) {
            return response.data[0];
        });
    }

    function getArticles() {
        return $http.get(appConfig.apiUrl+'/articles').then(function(response) {
            return response.data;
        });
    }

    function updateArticle(article) {
        return $http({
            method: 'PUT',
            url: appConfig.apiUrl+'/articles/'+article.article_tab,
            data: article,
            headers : {'Content-Type': 'application/json'}
        });
    }

    function uploadImage(file) {
        return Upload.upload({
            url: appConfig.apiUrl+'/article-image', //webAPI exposed to upload the file
            data:{file:file} //pass file as data, should be user ng-model
        });
    }

    return {
        getArticle: getArticle,
        getArticles: getArticles,
        uploadImage: uploadImage,
        updateArticle: updateArticle
    };
}


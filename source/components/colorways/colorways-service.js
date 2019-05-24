export default function ($q, $http, appConfig) {
    function getColorways() {
        return $http.get(appConfig.apiUrl+'/colorways').then(function(response) {
            return response.data;
        });
    }

    return {
        getColorways: getColorways
    };
}

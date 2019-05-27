export default function ($q, $http, appConfig) {
    const contentType = {'Content-Type': 'application/json'};

    function addColorway(colorway) {
        return $http({
            method: 'POST',
            url: appConfig.apiUrl+'/colorways',
            data: colorway,
            headers : contentType
        });
    }

    function getColorways() {
        return $http.get(appConfig.apiUrl+'/colorways').then(function(response) {
            return response.data;
        });
    }

    function updateColorway(colorway) {
        return $http({
            method: 'PUT',
            url: appConfig.apiUrl+'/colorways',
            data: colorway,
            headers : contentType
        });
    }

    function deleteColorway(colorway_id) {
        return $http.delete(appConfig.apiUrl+'/colorways/'+colorway_id).then(function(response) {
            return response.data;
        });
    }

    function addColorwayCategory(colorwayCategory) {
        return $http({
            method: 'POST',
            url: appConfig.apiUrl+'/colorway-categories',
            data: colorwayCategory,
            headers : contentType
        });
    }

    function getColorwayCategories() {
        return $http.get(appConfig.apiUrl+'/colorway-categories').then(function(response) {
            return response.data;
        });
    }

    function updateColorwayCategory(colorwayCategory) {
        return $http({
            method: 'PUT',
            url: appConfig.apiUrl+'/colorway-categories',
            data: colorwayCategory,
            headers : contentType
        });
    }

    function deleteColorwayCategory(colorway_category_id) {
        return $http.delete(appConfig.apiUrl+'/colorway-categories/'+colorway_category_id).then(function(response) {
            return response.data;
        });
    }

    function addColorwayImage(colorwayImage) {
        return $http({
            method: 'POST',
            url: appConfig.apiUrl+'/colorway-images',
            data: colorwayImage,
            headers : contentType
        });
    }

    function updateColorwayImage(colorwayImage) {
        return $http({
            method: 'PUT',
            url: appConfig.apiUrl+'/colorway-images',
            data: colorwayImage,
            headers : contentType
        });
    }

    function deleteColorwayImage(colorway_image_id) {
        return $http.delete(appConfig.apiUrl+'/colorway-images/'+colorway_image_id).then(function(response) {
            return response.data;
        });
    }

    return {
        addColorways: addColorway,
        getColorways: getColorways,
        updateColorway: updateColorway,
        deleteColorway: deleteColorway,
        addColorwayCategory: addColorwayCategory,
        getColorwayCategories: getColorwayCategories,
        updateColorwayCategory: updateColorwayCategory,
        deleteColorwayCategory: deleteColorwayCategory,
        addColorwayImage: addColorwayImage,
        updateColorwayImage: updateColorwayImage,
        deleteColorwayImage: deleteColorwayImage
    };
}

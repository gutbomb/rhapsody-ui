export default function ($q, $http, appConfig, Upload) {
    const contentType = {'Content-Type': 'application/json'};

    function addColorway(colorway, category) {
        return $http({
            method: 'POST',
            url: appConfig.apiUrl+'/colorways',
            data: {
                colorway_name: colorway,
                colorway_category_id: category
            },
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
            data: {
                colorway_category_name: colorwayCategory
            },
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

    function addColorwayImage(colorwayImage, colorwayImageFilename) {
        return $http({
            method: 'POST',
            url: appConfig.apiUrl+'/colorway-image',
            data: {
                colorway_id: colorwayImage,
                colorway_image_filename: colorwayImageFilename
            },
            headers : contentType
        });
    }

    function deleteColorwayImage(colorway_image_id) {
        return $http.delete(appConfig.apiUrl+'/colorway-image/'+colorway_image_id).then(function(response) {
            return response.data;
        });
    }

    function uploadImage(file) {
        return Upload.upload({
            url: appConfig.apiUrl+'/upload-colorway-image', //webAPI exposed to upload the file
            data:{file:file} //pass file as data, should be user ng-model
        });
    }

    return {
        addColorway: addColorway,
        getColorways: getColorways,
        updateColorway: updateColorway,
        deleteColorway: deleteColorway,
        addColorwayCategory: addColorwayCategory,
        getColorwayCategories: getColorwayCategories,
        updateColorwayCategory: updateColorwayCategory,
        deleteColorwayCategory: deleteColorwayCategory,
        addColorwayImage: addColorwayImage,
        deleteColorwayImage: deleteColorwayImage,
        uploadImage: uploadImage
    };
}

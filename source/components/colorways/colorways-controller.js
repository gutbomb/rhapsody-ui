export default function (colorwaysService, appConfig) {
    let cwc = this;

    cwc.error = '';
    cwc.success = false;
    cwc.imagePath = appConfig.apiUrl+'/colorway-image/';

    cwc.addColorway = () => {
        colorwaysService.addColorway(cwc.newColorwayName, cwc.newColorwayCategory)
            .then(function() {
                cwc.newColorwayName = '';
                cwc.newColorwayCategory = '';
                cwc.newColorway = false;
                cwc.getColorways();
                cwc.successMessage = 'Colorway Added';
            }, function () {
                cwc.error='Failed to retrieve colorways';
            });
    };

    cwc.getColorways = () => {
        colorwaysService.getColorways()
            .then(function(data) {
                cwc.colorways = data;
            }, function () {
                cwc.error='Failed to retrieve colorways';
            });
    };

    cwc.updateColorway = (colorwayCategory, colorway) => {
        colorwaysService.updateColorway(cwc.colorways[colorwayCategory].colorways[colorway])
            .then(function() {
                cwc.successMessage = 'Colorway Updated';
                cwc.getColorways();
            }, function () {
                cwc.error='Failed to retrieve colorways';
            });
    };

    cwc.deleteColorway = (colorwayId) => {
        colorwaysService.deleteColorway(colorwayId)
            .then(function() {
                cwc.selectedColorway = false;
                cwc.getColorways();
                cwc.successMessage = 'Colorway Deleted';
            }, function () {
                cwc.error='Failed to retrieve colorways';
            });
    };

    cwc.addColorwayCategory = () => {
        colorwaysService.addColorwayCategory(cwc.newCategoryName)
            .then(function() {
                cwc.getColorways();
                cwc.newCategoryName='';
                cwc.addCategory=false;
                cwc.successMessage = 'Colorway Category Added';
            }, function () {
                cwc.error='Failed to edit colorway category';
            });
    };

    cwc.getColorwayCategories = () => {
        colorwaysService.getColorwayCategories()
            .then(function(data) {
                cwc.colorwayCategories = data;
            }, function () {
                cwc.error='Failed to retrieve colorways';
            });
    };

    cwc.updateColorwayCategory = (colorwayCategory) => {
        colorwaysService.updateColorwayCategory(cwc.colorways[colorwayCategory])
            .then(function() {
                cwc.successMessage = 'Colorway Category Updated';
                cwc.getColorways();
            }, function () {
                cwc.error='Failed to retrieve colorways';
            });
    };

    cwc.deleteColorwayCategory = (colorwayCategoryId) => {
        colorwaysService.deleteColorwayCategory(colorwayCategoryId)
            .then(function() {
                cwc.selectedCategory = false;
                cwc.successMessage = 'Colorway Category Deleted';
                cwc.getColorways();
            }, function () {
                cwc.error='Failed to retrieve colorways';
            });
    };

    cwc.addColorwayImage = (colorwayImage, colorwayImageFilename) => {
        colorwaysService.addColorwayImage(colorwayImage, colorwayImageFilename)
            .then(function() {
                cwc.successMessage = 'Colorway image Added';
                cwc.getColorways();
            }, function () {
                cwc.error='Failed to retrieve colorways';
            });
    };

    cwc.deleteColorwayImage = (colorwayImageId) => {
        colorwaysService.deleteColorwayImage(colorwayImageId)
            .then(function() {
                cwc.successMessage = 'Colorway image deleted';
                cwc.getColorways();
            }, function () {
                cwc.error='Failed to retrieve colorways';
            });
    };

    cwc.uploadImage = (colorwayId) => {
        if (cwc.imageUpload.uploadFile.$valid && cwc.uploadFile) { //check if from is valid
            cwc.doUpload(cwc.uploadFile, colorwayId); //call upload function
        }
    };

    cwc.doUpload = (file, colorwayId) => {
        colorwaysService.uploadImage(file)
            .then(function (resp) { //upload function returns a promise
                if(resp.data.error_code === 0){ //validate success
                    cwc.addColorwayImage(colorwayId, resp.config.data.file.name);
                    cwc.uploadFile = null;
                } else {
                    cwc.error='an error occurred';
                }
            }, function (resp) { //catch error
                cwc.error='Error status: ' + resp.status;
            }, function (evt) {
                let progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                cwc.uploadProgress = 'progress: ' + progressPercentage + '% '; // capture upload progress
            });
    };

    cwc.getColorways();
}
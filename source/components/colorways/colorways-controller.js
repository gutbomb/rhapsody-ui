export default function (colorwaysService) {
    let cwc = this;

    cwc.error = '';
    cwc.success = false;

    cwc.addColorway = (colorway) => {
        colorwaysService.addColorway(colorway)
            .then(function() {
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

    cwc.updateColorway = (colorway) => {
        colorwaysService.updateColorway(colorway)
            .then(function() {
                cwc.successMessage = 'Colorway Updated';
            }, function () {
                cwc.error='Failed to retrieve colorways';
            });
    };

    cwc.deleteColorway = (colorwayId) => {
        colorwaysService.deleteColorway(colorwayId)
            .then(function() {
                cwc.successMessage = 'Colorway Deleted';
            }, function () {
                cwc.error='Failed to retrieve colorways';
            });
    };

    cwc.addColorwayCategory = (colorwayCategory) => {
        colorwaysService.addColorwayCategory(colorwayCategory)
            .then(function() {
                cwc.successMessage = 'Colorway Category Added';
            }, function () {
                cwc.error='Failed to retrieve colorways';
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
        colorwaysService.updateColorwayCategory(colorwayCategory)
            .then(function() {
                cwc.successMessage = 'Colorway Category Updated';
            }, function () {
                cwc.error='Failed to retrieve colorways';
            });
    };

    cwc.deleteColorwayCategory = (colorwayCategoryId) => {
        colorwaysService.deleteColorwayCategory(colorwayCategoryId)
            .then(function() {
                cwc.successMessage = 'Colorway Category Deleted';
            }, function () {
                cwc.error='Failed to retrieve colorways';
            });
    };

    cwc.addColorwayImage = (colorwayImage) => {
        colorwaysService.addColorwayImage(colorwayImage)
            .then(function() {
                cwc.successMessage = 'Colorway image Added';
            }, function () {
                cwc.error='Failed to retrieve colorways';
            });
    };

    cwc.updateColorwayImage = (colorwayImage) => {
        colorwaysService.updateColorwayImage(colorwayImage)
            .then(function() {
                cwc.successMessage = 'Colorway image updated';
            }, function () {
                cwc.error='Failed to retrieve colorways';
            });
    };

    cwc.deleteColorwayImage = (colorwayImageId) => {
        colorwaysService.deleteColorwayImage(colorwayImageId)
            .then(function() {
                cwc.successMessage = 'Colorway image deleted';
            }, function () {
                cwc.error='Failed to retrieve colorways';
            });
    };

    cwc.getColorways();
}
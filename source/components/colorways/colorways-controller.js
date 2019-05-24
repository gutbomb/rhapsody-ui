export default function (colorwaysService) {
    let cwc = this;

    cwc.error = '';
    cwc.success = false;

    function getColorways() {
        colorwaysService.getColorways()
            .then(function(data) {
                cwc.colorways = data;
            }, function () {
                cwc.error='Failed to retrieve colorways';
            });
    }

    getColorways();
}
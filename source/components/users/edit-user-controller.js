export default function ($routeParams, loginService, $location) {
    let euc = this;

    euc.error = '';
    euc.success = false;
    euc.displayModal = false;

    function getUser() {
        loginService.getUser($routeParams.id)
        .then(function(data) {
            euc.user = data;
        }, function () {
            euc.error='Failed to retrieve user';
        });
    }

    getUser();

    function updateUser() {
        loginService.updateUser($routeParams.id, euc.user)
        .then(function() {
            euc.success = true;
            euc.successMessage = 'User Updated Successfully';
        },
        function() {
            euc.error = 'User Update Failed';
        });
    }

    function resetPassword(email) {
        if (loginService.resetPassword(email)) {
            euc.success = true;
            euc.successMessage = 'Password Reset Sent Successfully';
            euc.error = '';
        } else {
            euc.success = false;
            euc.successMessage = '';
            euc.error = 'Password Reset Failed';
        }
    }

    function deleteUser() {
        loginService.deleteUser($routeParams.id)
        .then(function() {
            euc.success = true;
            euc.successMessage = 'User Deleted Successfully';
            euc.user = '';
            $location.path('/admin/users');
        },
        function() {
            euc.error = 'User Delete Failed';
        });
    }

    euc.deleteUser = deleteUser;
    euc.updateUser = updateUser;
    euc.resetPassword = resetPassword;
    euc.getUser = getUser;
}
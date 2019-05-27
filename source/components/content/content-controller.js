export default function (contentService, $route, appConfig) {
    let cc = this;

    cc.error = '';
    cc.success = false;
    cc.selectedArticle = 'home';
    cc.imagePath = appConfig.apiUrl+'/article-image/';

    function getArticle(tab) {
        contentService.getArticle(tab)
            .then(function(data) {
                cc.article = data;
            }, function () {
                cc.error='Failed to retrieve article';
            });
    }

    function getArticles() {
        contentService.getArticles()
            .then(function(data) {
                cc.articles = data;
            }, function () {
                cc.error='Failed to retrieve articles';
            });
    }

    function removeImage() {
        cc.article.article_image_filename = null;
        cc.article.article_image_class = null;
    }

    function uploadImage() {
        if (cc.imageUpload.uploadFile.$valid && cc.uploadFile) { //check if from is valid
            cc.doUpload(cc.uploadFile); //call upload function
        }
    }

    function doUpload(file) {
        contentService.uploadImage(file)
            .then(function (resp) { //upload function returns a promise
                if(resp.data.error_code === 0){ //validate success
                    cc.article.article_image_filename = resp.config.data.file.name;
                    cc.article.article_image_class = 'article-image-full';
                } else {
                    cc.error='an error occured';
                }
            }, function (resp) { //catch error
                cc.error='Error status: ' + resp.status;
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                cc.uploadProgress = 'progress: ' + progressPercentage + '% '; // capture upload progress
            });
    }

    if($route.current.activeTab!=='admin') {
        getArticle($route.current.activeTab);
    } else {
        getArticles();
        getArticle(cc.selectedArticle);
        cc.ckeditorConfig = {
            language: 'ru',
            uiColor: '#000000'
        };
    }

    function updateArticle() {
        contentService.updateArticle(cc.article)
            .then(() => {
                cc.successMessage = 'Article Updated';
            }, (error) => {
                cc.error = 'Article Update Failed - ' + error;
            });
    }

    cc.getArticle = getArticle;
    cc.getArticles = getArticles;
    cc.removeImage = removeImage;
    cc.uploadImage = uploadImage;
    cc.doUpload = doUpload;
    cc.updateArticle = updateArticle;
}
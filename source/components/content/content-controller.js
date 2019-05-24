export default function (contentService, $route) {
    let cc = this;

    cc.error = '';
    cc.success = false;

    function getArticle(tab) {
        contentService.getArticle(tab)
            .then(function(data) {
                cc.article = data;
            }, function () {
                cc.error='Failed to retrieve article';
            });
    }

    getArticle($route.current.activeTab);
}
/**
 * Created by samiyuru on 3/16/14.
 */

kEX.directive("actLinkCss", function ($rootScope, $location) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var actCSS = attrs.actLinkCss;
            var aS = element.children().find("a");
            var aSl = aS.length;

            function updtLnkState() {
                for (var i = 0; i < aSl; i++) {
                    var a = angular.element(aS[i]);
                    var hrf = a.attr("href");
                    if (hrf.substr(1) == $location.url()) {
                        a.addClass(actCSS);
                    } else {
                        a.removeClass(actCSS);
                    }
                }
            }

            updtLnkState();
            $rootScope.$on('$locationChangeSuccess', function () {
                updtLnkState();
            });
        }
    };
});

kEX.directive("coverImg", function ($rootScope, $location) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            function updtCvr() {
                var imgSrc = element.attr("img-" + $location.url().substr(1));
                if (imgSrc == undefined) {
                    imgSrc = attrs.coverImg;
                }
                element.attr("src", imgSrc);
            }

            updtCvr();
            $rootScope.$on('$locationChangeSuccess', function () {
                updtCvr();
            });
        }
    };
});

kEX.directive("kexWidget", function ($rootScope, $location) {
    return {
        restrict: 'A',
        transclude: true,
        scope: {},
        link: function (scope, element, attrs) {
            scope.tabs = [];
            var uls = element.children().find("ul");
            var ulsl = uls.length;
            for (var i = 0; i < ulsl; i++) {
                var ul = angular.element(uls[i]);
                var tabTtl = ul.attr("tab-title");
                if (tabTtl != undefined) {
                    scope.tabs.push({
                        title: tabTtl,
                        cont: ul,
                        isShow: false
                    });
                    ul.css({'display': 'none', 'margin': 0, 'padding': 0});
                }
            }

            scope.tabShow = function (indx) {
                var tbsl = scope.tabs.length;
                for (var i = 0; i < tbsl; i++) {
                    var tab = scope.tabs[i];
                    if (i == indx) {
                        tab.cont.css('display', 'block');
                        tab.isShow = true;
                    } else {
                        tab.cont.css('display', 'none');
                        tab.isShow = false;
                    }
                }
            }

            if (scope.tabs.length > 0) {
                scope.tabShow(0);
            }
        },
        templateUrl: "widgets/widget-tmplt.html"
    };
});

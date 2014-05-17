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
                    if (hrf.substr(2)/* skip #/ */ == $location.url().substr(1).split('/')[0]) {
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




kEX.directive("timediff", function () {
    return {
        restrict: 'A',
        scope: {
            time: "=timediff"
        },
        link: function (scope, elem, attr) {
            var time = null;
            scope.$watch("time", function () {
                time = new Date(scope.time);
                elem.html(utils.timeDiff(time));
            });
            window.setInterval(function () {
                if (time != null)elem.html(utils.timeDiff(time));
            }, 60000);
        }
    };
});




kEX.directive("proflnk", function () {
    return {
        restrict: 'A',
        replace: true,
        transclude: true,
        scope: {
            profId: "=proflnk"
        },
        link: function (scope, elem, attr) {

        },
        template: '<a ng-ref="/#/profile/{{profId}}" ng-transclude></a>'
    };
});




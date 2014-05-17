/**
 * Created by samiyuru on 5/17/14.
 */


kEX.directive("kexWidget", function () {
    return {
        restrict: 'A',
        transclude: true,
        scope: {},
        controller: function ($scope) {
            $scope.tabs = [];

            $scope.tabDelgate = null;//if set, pass selected tab title to this function

            this.addTab = function (tabIntrfc) {
                $scope.tabDelgate = null;//disable delegate
                $scope.tabs.push(tabIntrfc);
            };

        },
        link: function (scope, element, attrs) {

            scope.tabShow = function (indx) {//index of to be shown tab
                var tbsl = scope.tabs.length;
                for (var i = 0; i < tbsl; i++) {//traverse tab objects
                    var tab = scope.tabs[i];
                    if (i == indx) {//if this is the tab to be shown
                        tab.showTab();
                    } else {//not to be shown
                        tab.hideTab();//hide content
                    }
                }
                if (scope.tabDelgate) {//if tabDelgate is set,
                    scope.tabDelgate(scope.tabs[indx].title);//pass selected tab title to this function
                }
            }

            if (scope.tabs.length > 0) {
                scope.tabShow(0);//show first tab
            }
        },
        templateUrl: "widgets/widget-tmplt.html"
    };
});

kEX.directive("kexTab", function () {
    return {
        restrict: 'A',
        require: "^kexWidget",
        transclude: true,
        scope: {
            title: "@kexTab"
        },
        link: function (scope, elem, attr, kexWidget) {
            scope.showTab = false;
            kexWidget.addTab({
                title: scope.title,
                isShow: false,
                showTab: function () {
                    this.isShow = true;
                    scope.showTab = true;
                },
                hideTab: function () {
                    this.isShow = false;
                    scope.showTab = false;
                }
            });
        },
        template: '<div ng-if="showTab" ng-transclude></div>'
    };
});
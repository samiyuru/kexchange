/**
 * Created by samiyuru on 5/17/14.
 */


kEX.directive("subcontentHolder", function () {
    return {
        restrict: 'A',
        transclude: true,
        scope: {},
        controller: function ($scope, $element) {
            var subConts = [];
            this.registerSubCont = function (selfIntrfc) {
                if (subConts.length == 0) {
                    selfIntrfc.showCont();//show first subcont by default
                }
                subConts.push(selfIntrfc);
            };
            this.showSubCont = function (subContA) {
                var len = subConts.length;
                for (var i = 0; i < len; i++) {
                    var subCont = subConts[i];
                    if (subCont === subContA) {
                        subCont.showCont();
                    } else {
                        //subCont.hideCont();
                    }
                }
            };
        },
        template: '<ul ng-transclude></ul>'
    };
});

kEX.directive("subcontent", function () {
    return {
        restrict: 'A',
        require: "^subcontentHolder",
        transclude: true,
        scope: {
            title: "@subcontent"
        },
        link: function (scope, elem, attr, subCntHlder) {
            scope.showCont = false;
            var subCont = {
                showCont: function () {
                    scope.showCont = true;
                },
                hideCont: function () {
                    scope.showCont = false;
                }
            };
            subCntHlder.registerSubCont(subCont);

            scope.headClicked = function () {
                subCntHlder.showSubCont(subCont);
            };
            scope.closeClicked = function (e) {
                e.stopPropagation();
                scope.showCont = false;
            };

        },
        template: '<!-- sub container -->\
            <li>\
                <!-- sub content head -->\
                <div ng-click="headClicked()" class="rowtyp01 subhead01">\
                    <div class="L-R-margin0">\
                        <h3 ng-class="{active:showCont}">{{title}}</h3>\
                        <img ng-if="showCont" ng-click="closeClicked($event)" class="close" src="/img/close01.png">\
                    </div>\
                </div>\
                <!-- sub content head end-->\
                <!-- content -->\
                <div ng-if="showCont" ng-transclude></div>\
                <!-- content end -->\
            </li>\
            <!-- sub container end -->'
    };
});


kEX.directive("listScroller", function () {
    return {
        restrict: 'A',
        scope: {
            showCount: "=listScroller"
        },
        controller: function ($scope, $element) {
            var MAX_SHOW = $scope.showCount;
            var maxHeight = 0
            var count = 0;

            $element.css("overflow-y", "auto");
            $element.addClass("tabScroll");

            var hLst = [];

            function calcMaxH() {
                var h = 0;
                for (var i in hLst) {
                    h += (hLst[i].elem.prop('offsetHeight'));
                }
                return h;
            }

            function removeElemByScope(_scope) {
                for (var i in hLst) {
                    if (_scope == hLst[i].scope) {
                        count--;
                        hLst.splice(i, 1);
                        break;
                    }
                }
            }

            this.addListItemH = function (obj) {
                if (count < MAX_SHOW) {
                    hLst.push(obj);
                    obj.scope.$on('$destroy', (function () {
                        removeElemByScope(this);
                    }).bind(obj.scope));
                    obj.scope.$watch(function () {
                        return obj.elem.prop('offsetHeight');
                    }, function () {
                        $element.css("max-height", calcMaxH() + "px");
                    });
                    //maxHeight += height;
                    count++;
                } else {
                    $element.css("max-height", calcMaxH() + "px");
                }
            }
        }
    };
});


kEX.directive("listItem", function () {
    return {
        restrict: 'A',
        require: "^listScroller",
        scope: {},
        link: function (scope, elem, attr, listScrlCtrl) {
            listScrlCtrl.addListItemH({
                elem: elem,
                scope: scope
            });
        }
    };
});
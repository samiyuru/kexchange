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
            var uls = element.children().find("div");
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

kEX.directive("imgUpload", function () {
    return {
        restrict: 'A',
        require: "^imgUploader",
        scope: {},
        link: function (scope, elem, attr, imgUploader) {
            var fInp = document.createElement("input");
            fInp.setAttribute("type", "file");
            fInp.setAttribute("multiple", "");
            fInp.setAttribute("style", "position: absolute;width: 0;height: 0;left: -9999999px;");
            fInp.setAttribute("accept", "image/png, image/jpeg, image/gif");
            fInp.onchange = function () {
                var flen = fInp.files.length;
                for (var i = 0; i < flen; i++) {
                    var file = fInp.files[i];
                    var reader = new FileReader();
                    reader.onload = function (event) {
                        imgUploader.addImage({
                            img: event.target.result,
                            file: file
                        });
                    };
                    reader.readAsDataURL(file);
                }
            };
            elem.append(fInp);
            elem.on("click", function () {
                fInp.click();
            });
        }
    };
});

kEX.directive("imgUploader", function () {
    return {
        restrict: 'A',
        scope: {},
        controller: function ($scope, $element) {
            $scope.imgs = imgs = [];
            this.addImage = function (imgObj) {
                imgs.push(imgObj);
                $scope.$apply();
            };
            $scope.delImg = function(imgObg){
                var indx = imgs.indexOf(imgObg);
                imgs.splice(indx, 1);
            };
        },
        template: '<div>\
            <div style="padding-bottom: 12px;">\
        <div>\
            <div ng-show="imgs.length==0;" style="padding: 12px;text-align: center;font-size: 13px;color: #9a9a9a;margin-bottom: 8px;">\
                <span>No Images added</span>\
            </div>\
            <ul style="margin-bottom: -12px;">\
                <li ng-repeat="imgOb in imgs" style="display: inline-block; margin: 0 12px 12px 0;position: relative;">\
                    <img style="height: 66px;padding: 3px;border: 1px solid #d8d8d8;" ng-src="{{imgOb.img}}"/>\
                    <img ng-click="delImg(imgOb);" style="position: absolute;top:-5px;right: -5px;" src="../close01.png"/>\
                </li>\
            </ul>\
        </div>\
        </div>\
        <button img-upload style="background-color: #4b87d2;">Add Images</button>\
    </div>'
    };
});

/*kEX.directive("inrowConfirm", function () {
 return {
 restrict: 'A',
 transclude: true,
 scope: {
 confColor: "@confColor",
 confName: "@inrowConfirm"
 },
 controller:function($scope){
 $scope.shwConf = false;
 this.showConfirmation = (function(){
 $scope.shwConf = true;
 $scope.$apply();
 }).bind(this);
 },
 template: '\
 <div>\
 <!-- delete confirmation -->\
 <div ng-show="shwConf">\
 <div style="margin: 22px auto;text-align: center;">\
 <a ng-click="confirmFunc();" class="link-btn" ng-style="{color: confColor}">{{confName}}</a>\
 <a ng-click="shwConf=false;" class="link-btn" style="color: #666666;">Undo</a>\
 </div>\
 </div>\
 <!-- delete confirmation  end-->\
 <div ng-transclude ng-show="!shwConf">\
 </div>\
 </div>'
 };
 });

 kEX.directive("inrowConfirmShw", function () {
 return {
 restrict: 'A',
 require:"^inrowConfirm",
 link:function(scope, elem, attr, parentInrwCtrl){
 elem.on('click', function(){
 parentInrwCtrl.showConfirmation();
 });
 }
 };
 });*/


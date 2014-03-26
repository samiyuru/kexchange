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


kEX.directive("kexWidget", function () {
    return {
        restrict: 'A',
        transclude: true,
        scope: {},
        controller: function ($scope) {
            $scope.tabs = [];

            $scope.tabDelgate = null;//if set, pass selected tab title to this function

            this.addTab = function (title, contElem) {
                $scope.tabDelgate = null;//disable delegate
                $scope.tabs.push({
                    title: title,//header of tab
                    cont: contElem,//tab content div jqlt obj
                    isShow: false//is this the visible tab
                });
            };

            this.setTabDelegate = function (delegate, titles) {
                $scope.tabs = [];//disable kexTabs
                $scope.tabDelgate = delegate;
                var ttlsL = titles.length;
                for (var i = 0; i < ttlsL; i++) {
                    $scope.tabs.push({
                        title: titles[i],//header of tab
                        cont: null,//tab content div jqlt obj
                        isShow: false//is this the visible tab
                    });
                }
            };

        },
        link: function (scope, element, attrs) {

            scope.tabShow = function (indx) {//index of to be shown tab
                var tbsl = scope.tabs.length;
                for (var i = 0; i < tbsl; i++) {//traverse tab objects
                    var tab = scope.tabs[i];
                    if (i == indx) {//if this is the tab to be shown
                        tab.isShow = true;
                        if (tab.cont)tab.cont.css('display', 'block');
                    } else {//not to be shown
                        tab.isShow = false;
                        if (tab.cont)tab.cont.css('display', 'none');//hide content
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
        scope: {
            title: "@kexTab"
        },
        link: function (scope, elem, attr, kexWidget) {
            kexWidget.addTab(scope.title, elem);
        }
    };
});

kEX.directive("kexTabDelegate", function () {
    return {
        restrict: 'A',
        require: "^kexWidget",
        scope: {
            delegate: "&kexTabDelegate",
            titles: "=kexTitles"
        },
        link: function (scope, elem, attr, kexWidget) {
            kexWidget.setTabDelegate(scope.delegate, scope.titles);
        }
    };
});


kEX.directive("imgUpload", function () {//parent should be 'imgUploader' //to be added to a button
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
            $scope.delImg = function (imgObg) {
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


kEX.directive("productscont", function () {
    return {
        restrict: 'A',
        scope: {},
        controller: function ($scope, $element, $compile) {
            var _iPrdInfo = null,
                _curInfIndx = -1,
                _numCols = 3;

            this.setIPrdInfo = function (iPrdInfo) {
                _iPrdInfo = iPrdInfo;
            }

            this.showPrdInfo = function (product, indx, pMidX) {
                var infIndx = indx + _numCols - (indx % _numCols);
                if (_curInfIndx != infIndx) {
                    _iPrdInfo.hide();
                    var chldrn = $element.children();
                    angular.element(chldrn[chldrn.length - 1]).after(_iPrdInfo.domElem);//temporary add to the end
                    var prvChild = angular.element($element.children()[infIndx - 1]);//find before element
                    prvChild.after(_iPrdInfo.domElem);//place after before element
                    _curInfIndx = infIndx;
                }
                _iPrdInfo.setProduct(product, pMidX);
                _iPrdInfo.show();
            }
        }
    }
});

kEX.directive("product", function () {
    return {
        restrict: 'A',
        scope: {
            indx: "=indx",
            product: "=product"
        },
        require: "^productscont",
        link: function (scope, elem, attr, productscont) {
            var lMrg = 17, pMidX = elem.prop('offsetLeft') + elem.prop('offsetWidth') / 2 - lMrg;
            elem.on("click", function () {
                productscont.showPrdInfo(scope.product, scope.indx, pMidX);
            });
        }
    }
});

kEX.directive("productinfo", function () {
    return {
        restrict: 'A',
        require: "^productscont",
        scope: {},
        link: function (scope, elem, attr, productscont) {

            function _setProduct(product, pMidX) {
                scope.product = product;
                scope.arwElm.css("left", pMidX - 10 + "px");
                scope.$apply();
            }

            function _show() {
                elem.css("display", "block");
            }

            function _hide() {
                elem.css("display", "none");
            }

            scope.remove = _hide;

            productscont.setIPrdInfo({
                setProduct: _setProduct,
                hide: _hide,
                show: _show,
                domElem: elem
            });
        },
        templateUrl: 'widgets/productinf-tmplt.html'
    }
});

kEX.directive("pinfarrow", function () {
    return {
        restrict: 'A',
        link: function (scope, elem, attr) {
            scope.arwElm = elem;
        }
    }
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


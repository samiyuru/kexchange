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
                    reader.onload = (function (event) {
                        imgUploader.addImage({
                            //imgObj
                            img: event.target.result,
                            file: this
                        });
                    }).bind(file);
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
        scope: {
            imgFiles: "=imgFiles"
        },
        controller: function ($scope, $element) {
            $scope.imgs = imgs = [];
            var imgFiles = [];
            $scope.imgFiles = imgFiles;
            this.addImage = function (imgObj) {
                imgs.push(imgObj.img);
                imgFiles.push(imgObj.file);
                $scope.$apply();
            };
            $scope.delImg = function (imgObg) {
                var indx = imgs.indexOf(imgObg);
                imgs.splice(indx, 1);
                imgFiles.splice(indx, 1);
            };
        },
        template: '<div>\
            <div style="padding-bottom: 12px;">\
        <div>\
            <div ng-show="imgs.length==0;" style="padding: 12px;text-align: center;font-size: 13px;color: #9a9a9a;margin-bottom: 8px;">\
                <span>No Images added</span>\
            </div>\
            <ul style="margin-bottom: -12px;">\
                <li ng-repeat="img in imgs" style="display: inline-block; margin: 0 12px 12px 0;position: relative;">\
                    <img style="height: 66px;padding: 3px;border: 1px solid #d8d8d8;" ng-src="{{img}}"/>\
                    <img ng-click="delImg(img);" style="position: absolute;top:-5px;right: -5px;" src="../close01.png"/>\
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
        controller: function ($scope, $element) {
            var _iPrdInfo = null, _curInfIndx = 99999999, _numCols = 3;

            this.infoHided = function () {
                //_curInfIndx = 99999999;
            };

            this.setIPrdInfo = function (iPrdInfo) {
                _iPrdInfo = iPrdInfo;
            }

            this.showPrdInfo = function (product, indx, pMidX) {
                function lastElemInRow(indx) {
                    var chldrn = $element.children(), chL = chldrn.length;
                    if (_curInfIndx <= indx)++indx;//correct index by including place for info
                    var offstH = chldrn[indx].offsetTop;
                    for (var i = indx; i < chL; ++i) {
                        var chld = chldrn[i];
                        var next;
                        if (i + 1 == chL) {//if this is the last child
                            return {i: i, el: chld};
                        } else {
                            next = chldrn[i + 1];
                            if (next.offsetTop > chld.offsetTop) {//next is in row below
                                return  {i: i, el: chld};
                            } else if (next.getAttribute("productinfo") != null) {//next is infobox n it is hidden (hidden offsetTop = 0)
                                return  {i: i, el: chld};
                            }
                        }
                    }
                }

                var obj = lastElemInRow(indx), infIndx = obj.i;
                if (_curInfIndx != infIndx) {
                    _iPrdInfo.hide();
                    angular.element(obj.el).after(_iPrdInfo.domElem);//place after 'prev element'
                    _curInfIndx = infIndx;
                }
                _iPrdInfo.setProduct(product, pMidX);
                _iPrdInfo.show();
            }
        }
    };
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
            var lMrg = 17;
            elem.on("click", function () {
                var pMidX = elem.prop('offsetLeft') + elem.prop('offsetWidth') / 2 - lMrg;
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

            scope.ui = {purchConf: false};

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
                productscont.infoHided();
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
    };
});

kEX.directive("pinfarrow", function () {
    return {
        restrict: 'A',
        link: function (scope, elem, attr) {
            scope.arwElm = elem;
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
                        <img ng-if="showCont" ng-click="closeClicked($event)" class="close" src="../close01.png">\
                    </div>\
                </div>\
                <!-- sub content head end-->\
                <!-- content -->\
                <div ng-if="showCont" class="L-R-margin0" ng-transclude></div>\
                <!-- content end -->\
            </li>\
            <!-- sub container end -->'
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





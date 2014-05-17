/**
 * Created by samiyuru on 5/17/14.
 */

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
        },
        template: '\
            <div onclick="window.utils.scrollToFcs(this)">\
                <img class="cover" ng-src="{{product.prdCover}}"/>\
                <div class="propic">\
                    <img class="propic-small" ng-src="{{product.owner.propic}}"/>\
                </div>\
                <div class="dtlPad">\
                    <div class="row01"><span>{{product.title}}</span></div>\
                    <div class="row02">{{product.remQty}} out of {{product.qty}} left</div>\
                    <div ng-if="product.isAuction || product.price!=0" class="row03">{{product.price.toLocaleString()}} K$</div>\
                    <div ng-if="!product.isAuction && product.price==0" class="row03">Free</div>\
                </div>\
            </div>'
    }
});

//-----------------------------------------------

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

kEX.directive("pinfarrow", function () {//pass ref for arrow to parent scope
    return {
        restrict: 'A',
        link: function (scope, elem, attr) {
            scope.arwElm = elem;
        }
    };
});

//-----------------------------------------------

kEX.directive("bidhistory", function () {//pass ref for arrow to parent scope
    return {
        restrict: 'A',
        scope: {
            product: "=bidhistory"
        },
        link: function (scope, elem, attr) {
            var RECENT_LIMIT = 4;
            var ALL_LIMIT = 9999;

            scope.onlyRead = elem.attr('onlyread');

            scope.bidsLimit = RECENT_LIMIT;
            scope.isRecentBids = true;

            scope.showAllBids = function () {
                scope.isRecentBids = false;
                scope.bidsLimit = ALL_LIMIT;
            };

            scope.showRecentBids = function () {
                scope.isRecentBids = true;
                scope.bidsLimit = RECENT_LIMIT;
            };
        },
        template: '\
        <div class="bidhist">\
            <!-- new bid input -->\
            <div ng-if="!onlyRead" class="rowtyp01 nwbid">\
                <input ng-model="product.newBid" type="text" placeholder="Place new bid K$"/>\
                <button ng-click="product.placeBid()">Bid</button>\
            </div>\
            <!-- new bid input end -->\
            \
            <!-- bids hist -->\
            <ul list-scroller="6">\
                <li list-item ng-repeat="bid in product.bids | limitTo:bidsLimit" class="rowtyp01">\
                    <span class="bidcol1"><a prfid="bid.person._id">{{bid.person.nickname}}</a></span>\
                    <span class="bidcol2" timediff="bid.date"></span>\
                    <span class="bidcol3">{{bid.bid.toLocaleString()}} K$</span>\
                </li>\
            </ul>\
            <!-- bids hist end-->\
            \
            <!--load more --->\
                <div ng-if="product.bids.length>4" class="rowtyp01 loadmr">\
                    <a ng-if="isRecentBids" ng-click="showAllBids()" class="link-btn">Show all bids</a>\
                    <a ng-if="!isRecentBids" ng-click="showRecentBids()" class="link-btn">Show recent bids</a>\
                </div>\
                <!--load more end -->\
            </div>'
    };
});


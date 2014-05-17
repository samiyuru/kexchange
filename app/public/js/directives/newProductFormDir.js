/**
 * Created by samiyuru on 5/17/14.
 */

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
                    <img ng-click="delImg(img);" style="position: absolute;top:-5px;right: -5px;" src="/img/close01.png"/>\
                </li>\
            </ul>\
        </div>\
        </div>\
        <button img-upload style="background-color: #4b87d2;">Add Images</button>\
    </div>'
    };
});
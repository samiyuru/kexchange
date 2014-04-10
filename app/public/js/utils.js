/**
 * Created by samiyuru on 3/25/14.
 */

window.utils = new (function () {
    this.scrollToFcs = function (el) {

        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }

        function elmYPosition(el) {
            var elm;
            if (typeof el == "object") {
                elm = el;
            } else {
                elm = document.getElementById(el);
            }
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            }
            return y;
        }

        var startY = currentYPosition();
        var stopY = elmYPosition(el);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY);
            return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 90);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for (var i = startY; i < stopY; i += step) {
                setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                leapY += step;
                if (leapY > stopY) leapY = stopY;
                timer++;
            }
        } else {
            for (var i = startY; i > stopY; i -= step) {
                setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                leapY -= step;
                if (leapY < stopY) leapY = stopY;
                timer++;
            }
        }

    }

    this.timeDiff = function (date) {
        var units = [
            { name: "second", limit: 60, in_seconds: 1 },
            { name: "minute", limit: 3600, in_seconds: 60 },
            { name: "hour", limit: 86400, in_seconds: 3600  },
            { name: "day", limit: 604800, in_seconds: 86400 },
            { name: "week", limit: 2629743, in_seconds: 604800  },
            { name: "month", limit: 31556926, in_seconds: 2629743 },
            { name: "year", limit: null, in_seconds: 31556926 }
        ];
        var diff = ((new Date()).getTime() - date.getTime()) / 1000;
        var isFuture = false;
        if (diff < 0) {
            diff = diff * -1;
            isFuture = true;
        }
        if (diff < 5) return "now";

        var i = 0;
        while (unit = units[i++]) {
            if (diff < unit.limit || !unit.limit) {
                var diff = Math.floor(diff / unit.in_seconds);
                return diff + " " + unit.name + (diff > 1 ? "s" : "") + ((isFuture) ? "" : " ago");
            }
        }
    }

})();
/**
 * Created by samiyuru on 3/26/14.
 */

kEX.service("kexEvent", function () {
    var events = {};

    this.publish = function (event, args) {
        var fList = events[event];
        if (fList) {
            var len = fList.length;
            for (var i = 0; i < len; i++) {
                var hndl = fList[i];
                hndl.apply(this, args);//publish event for all handlers
            }
        }
    };

    this.subscribe = function (event, hndl) {
        var fList = events[event];
        if (fList) {
            var len = fList.length;
            for (var i = 0; i < len; i++) {
                if (fList[i] === hndl)return;//check if handler already registered
            }
            events[event].push(hndl);
        } else {
            events[event] = [];
            events[event].push(hndl);
        }
    };

    this.unsubscribe = function (event, hndl) {
        var fList = events[event];
        if (fList) {
            var len = fList.length;
            for (var i = 0; i < len; i++) {
                if (fList[i] === hndl) {
                    fList.slice(i, 1);//remove handler
                    return;
                }
            }
        }
    };
});


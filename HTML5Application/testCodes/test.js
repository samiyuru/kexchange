/**
 * Created by samiyuru on 3/16/14.
 */
var myapp = angular.module("myapp",[]);

myapp.controller("ctrl01", function($scope){

});

myapp.directive("dir01", function(){
    return {
        restrict:'A',
        link:function(scope, element, attr){//link is not dependency injected, but controller is so in controller $ scope is mandatory
            element.html("data from scope's ng-init > " + scope.data);// parent scopes data
        }
    };
});

myapp.directive("dir02", function(){
    return {
        restrict:'A',
        scope:{},//scope isolation
        link:function(scope, element, attr){
            element.html("data from scope's ng-init > " + scope.data);//now scope.data is undefined //parent scpe not available
        }
    };
});

myapp.directive("dir03", function(){
    return {
        restrict:'A',
        scope:{

        },//scope isolation
        link:function(scope, element, attr){
            element.html("attr > " + attr.myname);//myname attribute can still be accessed
        }
    };
});

myapp.directive("dir04", function(){
    return {
        restrict:'A',
        scope:{
            data : '=myname'
        },//scope isolation //this scope is for templates
        template:"<div>usage of scope in templates> {{data}}</div>"
    };
});

myapp.directive("dir05", function(){
    return {
        restrict:'A',
        scope:{
            
        },//scope isolation
        link:function(scope, element, attr){
            element.html("attr > " + attr.myname);//myname attribute can still be accessed
        }
    };
});


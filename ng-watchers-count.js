'use strict';

var watchersCount = function () { 
  // credits to: http://stackoverflow.com/a/18526757/5194966
  var root = angular.element(document.getElementsByTagName('body'));
  var watchers = [];
  var f = function (element) {
    angular.forEach(['$scope', '$isolateScope'], function (scopeProperty) { 
      if (element.data() && element.data().hasOwnProperty(scopeProperty)) {
        angular.forEach(element.data()[scopeProperty].$$watchers, function (watcher) {
          watchers.push(watcher);
        });
      }
    });

    angular.forEach(element.children(), function (childElement) {
      f(angular.element(childElement));
    });
  };

  f(root);

  // Remove duplicate watchers
  var watchersWithoutDuplicates = [];
  angular.forEach(watchers, function(item) {
    if(watchersWithoutDuplicates.indexOf(item) < 0) {
      watchersWithoutDuplicates.push(item);
    }
  });

  (function(element, amount) {
    amount = 'Angular watchers: ' + amount;
    var over = angular.element('<div style="background-color: red; color: white; position: fixed; right: 20; bottom: 10;">' + amount + '</div>')
    over.width = element.width;
    over.height = element.height;
    var $elementId = 'ngWatchersCountContainer';
    var current = document.getElementById($elementId);
    if (current) {
      angular.element(current)
        .html('')
        .append(over)
    } else {
      angular.element(document.body).append(
        angular.element('<div/>')
          .attr('id', $elementId)
          .css({'z-index': 9999})
          .append(over)
      );
    }
  })(root[0], watchersWithoutDuplicates.length);
};
setInterval(watchersCount, 1500);

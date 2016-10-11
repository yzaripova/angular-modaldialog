(function() {
  'use strict';

  angular.module('rtb')
    .directive('modalDialog', function() {
      return {
        restrict: 'E',      
        scope: {
          show: '='
        },
        replace: false,
        transclude: true,
        templateUrl: 'directives/modal-dialog/modal-dialog.template.html',
        controller: ['$scope', '$element', '$attrs', '$transclude', function ($scope, $element, $attrs, $transclude) {
          $scope.hideModal = function() {
            $scope.show = false;
          };
          // $scope.$watch('show', function(newVal, oldVal) {
          //   console.log('modal-dialog.js');
          // })
        }],
        // link: function($scope, element, attrs) {
        //   $scope.hideModal = function() {
        //     $scope.show = false;
        //   };
        // }
      }
    });
})();
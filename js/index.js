(function (rtbUtils, rtbAPI) {
  angular.module('rtb', [])
    .directive('router', function () {
      return {
        replace: true,
        restrict: 'E',
        scope: {
          currentRoute: '='
        },
        template: '<div>'
        + '<board ng-if="currentRoute === \'board\'"></board>'
        + '<dashboard ng-if="currentRoute === \'dashboard\'"></dashboard>'
        + '<h2 ng-if="currentRoute !== \'board\' && currentRoute !== \'dashboard\'">Not found</h2>'
        + '</div>'
      }
    })
    .directive('board', function () {
      return {
        replace: true,
        restrict: 'E',
        scope: {},
        template: '<h1>You on the board</h1>'
      }
    })
    .directive('dashboard', function () {
      return {
        replace: true,
        restrict: 'E',
        scope: {},
        template: '<h1>You on the dashboard</h1>'
      }
    })
    .controller('MainController', ['$scope', '$location', function ($scope, $location) {
      var urlVars = rtbUtils.getUrlVars();
      var isFirstLogin = 'firstLogin' in urlVars;
      $scope.currentRoute = urlVars.path;
      if(!$scope.currentRoute && window.location.search === '') {
        window.location.search = 'path=board&firstLogin';
      }

      $scope.emails = [];
      $scope.firstLoginModalShown = isFirstLogin;
      $scope.secondLoginModalShown = false;
      $scope.inviteText = 'Invite';

      $scope.continueToInvite = function(name, companySize, phone) {
        rtbAPI.createTeam(name, companySize, phone);
        $scope.firstLoginModalShown = false;
        $scope.secondLoginModalShown = true;
      };

      $scope.setDisabled = function() {
        return $scope.emails.length > 0 ? '' : 'btn-disabled';
      };

      $scope.inviteUsersToTeam = function(inviteToFirstBoard) {
        $scope.inviteText = 'loading...';

        rtbAPI.inviteUsersToTeam($scope.emails, inviteToFirstBoard)
          .then(function() {
            $scope.$apply(function() {
               $scope.inviteText = 'Invite';
            })
          })
      };

      $scope.hideModal = function() {
        $scope.secondLoginModalShown = false;
      };
    }])

  angular.element(document).ready(function() {
    angular.bootstrap(document, ['rtb'], {strictDi: true});
  });
})(window.rtbUtils, window.rtbAPI)

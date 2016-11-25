app.directive("modalDialog", function() {
  return {
    restrict: "E",
    transclude: true,
    scope: {
      modalIdentifier: "@",
      modalTitle: "@",
      closeButtonFunction: "=",
      closeButtonParam: "=",
      closeButtonLabel: "@",
      chainedModalButtonNextModal: "@",
      chainedModalButtonLabel: "@",
      formSubmit: "=",
      formSubmitParam: "=",
      submitButtonLabel: "@",
      actionButtonLabel: "@",
      actionButtonFunction: "=",
      actionButtonParam: "="
    },
    templateUrl: "./directives/modalDirective/modalTemplate.html",
    link: function(scope, elem, attrs) {

      scope.showSubmitButton = false;
      scope.showActionButton = false;
      scope.showChainedModalButton = false;

      if(scope.submitButtonLabel && scope.submitButtonLabel.trim() !== "" &&
        scope.formSubmit && scope.formSubmit instanceof Function) {

          scope.showSubmitButton = true;
          scope.submitCallback = () => {
            scope.formSubmit(scope.formSubmitParam);
          };
      }

      if(scope.chainedModalButtonNextModal) {
        scope.showChainedModalButton = true;
      }

      if(scope.actionButtonLabel && scope.actionButtonLabel.trim() !== "" &&
        scope.actionButtonFunction &&
        scope.actionButtonFunction instanceof Function) {

          scope.showActionButton = true;
          scope.actionButtonCallback = () => {
            if(scope.actionButtonParam) {
              scope.actionButtonFunction(scope.actionButtonParam);
            } else {
              scope.actionButtonFunction();
            }

          }
      }

      if(scope.closeButtonFunction && scope.closeButtonFunction instanceof Function) {

        scope.closeButtonCallback = () => {
          if(scope.closeButtonParam) {
            scope.closeButtonFunction(scope.closeButtonParam);
          } else {
            scope.closeButtonFunction();
          }
        }
      }

      if(!scope.closeButtonLabel || scope.closeButtonLabel.trim() === "") {
        scope.closeButtonLabel = "Close";
      }
    }
  };
});

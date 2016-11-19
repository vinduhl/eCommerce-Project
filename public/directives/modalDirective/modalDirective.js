app.directive("modalDialog", function() {
  return {
    restrict: "E",
    transclude: true,
    scope: {
      modalIdentifier: "@",
      modalTitle: "@",
      closeButtonAction: "=",
      submitButtonLabel: "@",
      formSubmit: "=",
      formSubmitParam: "="
    },
    templateUrl: "./directives/modalDirective/modalTemplate.html",
    link: function(scope, elem, attrs) {

      scope.showSubmitButton = false;

      if(scope.submitButtonLabel && scope.submitButtonLabel.trim() !== "") {
        scope.showSubmitButton = true;
      }

      if(scope.formSubmit && scope.formSubmit instanceof Function) {
        console.log("Hi there");
        scope.submitCallback = () => {
          console.log("Submitting...");
          scope.formSubmit(scope.formSubmitParam);
        };
        console.log("scope.submitCallback", scope.submitCallback);
      }

    }
  };
});

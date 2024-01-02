import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useEffect } from "react";

import useError from "..";

function MyTestComponent({ testCaseHasError }: { testCaseHasError: boolean }) {
  const { err, handleError, ErrorComponent } = useError();

  useEffect(() => {
    if (testCaseHasError) {
      const error = new Error("some error");
      handleError(error);
    }
  }, [testCaseHasError]);

  return <div>{err ? <ErrorComponent /> : null}</div>;
}

describe("the useError hook", () => {
  [
    {
      description: "when an error occurs in the component",
      it: "displays the error modal",
      testCaseHasError: true,
    },
    {
      description: "when an error does not occur in the component",
      it: "does not display the error modal",
      testCaseHasError: false,
    },
  ].forEach((testCase) => {
    describe(testCase.description, () => {
      beforeEach(() => {
        render(
          <MyTestComponent testCaseHasError={testCase.testCaseHasError} />
        );
      });
      it(`${testCase.it}`, () => {
        const errorModal = screen.queryByTestId(/err-msg/);
        if (testCase.testCaseHasError) {
          expect(errorModal).toBeInTheDocument();
        } else {
          expect(errorModal).not.toBeInTheDocument();
        }
      });
    });
  });
});

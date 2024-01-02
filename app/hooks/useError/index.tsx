import React, { useState } from "react";
import Overlay from "~/components/shared/overlay";
import { toErrorWithMessage } from "~/utils/errors";

import './styles/index.css';
import Modal from "~/components/shared/modal";

export default function useError() {
  const [err, setErr] = useState<unknown>();

  const handleError = (error?: unknown, callback?:() => void) => {
    if(err) {
      setErr(undefined)
    } else {
      setErr(error)
    }
    if(callback) {
      callback();
    }
  };

 
  const ErrorComponent = (): React.JSX.Element => {
    return (
      <Overlay onClick={handleError}>
        {err !== undefined && 
          <Modal headerText="Error">
            <p data-testid='err-msg'>{toErrorWithMessage(err).message}</p>
          </Modal>
        }
      </Overlay>
    );
  };

  return {
    err,
    handleError,
    ErrorComponent,
  };
}

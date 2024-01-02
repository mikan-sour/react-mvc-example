import React, { useEffect } from "react";
import { IHomeModel } from "../types";

import "./styles/index.css";

import Button from '../../../components/shared/button'

export default function HomeView({
  loading,
  error,
  state,
  actions
}: IHomeModel): React.JSX.Element {
  return (
    <>
      {error.err ? <error.ErrorComponent /> : <></>}
      <section className="homeWrapper">
        <pre>{JSON.stringify(state.results, null, 2)}</pre>
        <Button onClick={actions.handleClick}>
          Next Post
        </Button>
      </section>
    </>
  );
}

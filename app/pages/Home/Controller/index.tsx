import React from "react";
import useHomeModel from "../Model";
import HomeView from "../View";

export default function HomeController():React.JSX.Element {
  const props = useHomeModel();
  return <HomeView {...props} />;
}

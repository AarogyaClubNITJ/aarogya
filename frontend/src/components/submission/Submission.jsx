import React from "react";
import { useLottie } from "lottie-react";
import groovyWalkAnimation from "../../assets/troffee/submission1.json";

const App = () => {
  const options = {
    animationData: groovyWalkAnimation,
    loop: true,
    autoplay: true,
    style: {
      width: "50%",
      height: "50%",
    },
  };

  const { View } = useLottie(options);

  return <>{View}</>;
};

export default App;
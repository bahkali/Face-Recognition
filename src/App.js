import React from "react";

import Navigation from "./components/navigation/navigation.component";
import Logo from "./components/Logo/logo.component.jsx";
import ImageLinkForm from "./components/ImageLinkForm/imageLinkForm.component";
import Rank from "./components/rank/rank.component";
import Particles from "react-particles-js";

import "./App.css";

const particleOptions = {
  particles: {
    number: {
      value: 50,
      density: { enable: true, value_area: 800 },
    },
    color: "#c01c1c",
    polygon: {
      nb_sides: 6,
    },
  },
};

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Navigation />

        <Logo />
        <Rank />
        <ImageLinkForm />
      </div>
    );
  }
}

export default App;

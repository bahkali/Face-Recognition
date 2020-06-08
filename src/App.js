import React from "react";

import Navigation from "./components/navigation/navigation.component";
import Logo from "./components/Logo/logo.component.jsx";
import ImageLinkForm from "./components/ImageLinkForm/imageLinkForm.component";
import Rank from "./components/rank/rank.component";
import FaceRecognition from "./components/faceRecognition/face-recognition.component";
import Particles from "react-particles-js";
import Clarifai from "clarifai";

import "./App.css";
import SignIn from "./components/signin/signin.component";
import Register from "./components/register/register.component";

const app = new Clarifai.App({
  apiKey: "16ca7c3e703b4dd59c73d41c929d911e",
});

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
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: "signin",
    };
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };
  onSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    console.log("click");
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) =>
        this.displayFaceBox(this.calculateFaceLocation(response))
      )
      .catch((error) => {
        console.log(error);
      });
  };
  onRouteChange = (route) => {
    this.setState({ route: route });
  };
  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Navigation onRouteChange={this.onRouteChange} />
        {this.state.route === "home" ? (
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
            />
            <FaceRecognition
              box={this.state.box}
              imageUrl={this.state.imageUrl}
            />
          </div>
        ) : this.state.route === "signin" ? (
          <SignIn onRouteChange={this.onRouteChange} />
        ) : (
          <Register onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;

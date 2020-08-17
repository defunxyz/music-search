import React from "react";

class Greeting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "Jerry",
      message: "",
      time: new Date().getHours()
    };
  }

  componentDidMount() {
    this.greet();
  }

  greet = () => {
    let t = this.state.time;
    if (t < 12 && t > 4) {
      this.setState({ message: "Good morning, "});
    }
    else if (t === 12) {
      this.setState({ message: "Noon, "});
    }
    else if (t < 17 && t > 12) {
      this.setState({ message: "Good afternoon, "});
    }
    else {
      this.setState({ message: "Good evening, "});
    }
  };

  render() {
    return (<h2>{this.state.message + this.state.name}</h2>);
  }
}
export default Greeting;

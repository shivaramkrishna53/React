import React, { Component } from "react";

export default class ClassComponentUserDetails extends Component {
  constructor() {
    super();
    this.address = "india";
    this.state = {
      uname: "shiva",
      uaddress: "hyderabad",
    };
    console.log("constructor is called");
  }

  componentDidMount() {
    console.log("componentdidmount is called");
  }

  componentDidUpdate() {
    console.log("componentdidupdate is called");
  }

  componentWillUnmount() {
    console.log("The component is about to unmount");
  }
  changeAddress = () => {
    this.setState({ uaddress: "banglore" });
    this.address = "usa";
  };
  render() {
    console.log("render is called");
    return (
      <div>
        <h1>User Details are::</h1>
        <h2>User Name::{this.state.uname}</h2>
        <h2>User Address::{this.state.uaddress}</h2>
        <h2>Address::{this.address}</h2>
        <button type="button" onClick={this.changeAddress}>
          ChangeAddress
        </button>
      </div>
    );
  }
}

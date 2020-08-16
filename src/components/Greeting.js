import React from "react";
import ReactDOM from "react-dom";

class Greeting extends React.Component{

   //const greet = () =>{
   getGreeting(){
        var h = new Date().getHours();
        var name = "Jerry";
        var text = "";
        if(h<12 && h>4){
          text = "Good morning, ";
        } else if(h<17 && h>12){
          text = "Good afternoon, ";
        }else {
          text = "Good evening, ";
        }
        return text+name+".";
      }

  render(){
    return(
       <h2>{this.getGreeting()}</h2>
    );
  }
}
export default Greeting;

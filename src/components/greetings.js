import React from "react";
import ReactDOM from "react-dom";

class Greeting extends React Component{

   const greet = () =>{
        var h = new Date().getHours();
        var name = "Jerry";
        if(h<12 && h>4){
          text = "Good morning, ";
        } else if(h<17 && h>12){
          text = "Good afternoon, ";
        }else {
          text = "Good evening, ";
        }
        return gtext+name+".";
      }

  render(){
    return(
       <h2>{this.greet}</h2>
    );
  }
}
export default Greeting;

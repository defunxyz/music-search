import React from "react";

class DialogsContainer extends React.Component 
{
    constructor(...args)
    {
        super(...args);
        this.state = {
            showChild: false
        }
    }

    closeChildDialog = () => {
        this.setState({
            showChild: false
        });
    }
}

ReactDOM.render(
    <DialogsContainer />,
    document.getElementById("root")
);
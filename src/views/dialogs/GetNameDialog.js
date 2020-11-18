import React from "react";
import Cookies from 'universal-cookie';
import 
{ Dialog, 
DialogTitle,
DialogBody,
DialogFooter,
ModalDialog, 
DialogBar}
from "../../components/Dialog";

export default class GetNameDialog extends React.Component{
    constructor(props) {
        super();
        this.state = {
            value: "",
            submitDisabled: true,
        };
    }

    handleInputChange = (e) => {
        var value = e.target.value;
        if (value.length > 0) {
            this.setState({value: value, submitDisabled: false});
        } else {
            this.setState({ value: value, submitDisabled: true});
        }
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        const cookie = new Cookies();
        const name = e.target.name.value;
        cookie.set('username', name, { path: '/' });
        this.props.updateState();
    }

    render = () => {
        const position = {marginTop: 100}
        const { hasShadowOverlay, show } = this.props;
        const { value, submitDisabled } = this.state;

        if(show === false){
            return null;
        }
        return (
            <ModalDialog id={"welcome-dialog"} hasShadowOverlay={hasShadowOverlay} display={show}>
                <Dialog id="welcomeDialog" marginTop={position} display={show}>
                    <DialogBar centerTitle={true} borderBottom={true} enableClose={false}>
                        <DialogTitle>Welcome</DialogTitle>
                    </DialogBar>
                    <form onSubmit={this.handleSubmit} autocomplete="off">
                    <DialogBody center={true}>
                        <div className="welcome-info">
                            <span className="info">Hi, there, let's get started</span>
                            <span className="inform">Your name will not be shared, it is only for personalized experience.</span>
                        </div>
                        <input value={value} onChange={this.handleInputChange.bind(this)} type="text" name="name" id="name" placeholder="Enter your name" required="" />
                    </DialogBody>
                    <DialogFooter borderTop={true}>
                        <input className={`btn fullSize ${submitDisabled ? 'disabled' : ''}`} type="submit" name="save" value="Save" />
                    </DialogFooter>
                    </form>
                </Dialog>
            </ModalDialog>
        );
    }
};

import React from "react";
import 
{ Dialog, 
DialogTitle,
DialogCloseBtn,
DialogBody,
DialogFooter,
ModalDialog, 
DialogBar}
from "../../components/Dialog";

export default class AboutDialog extends React.Component {
    constructor(props) {
        super();
        this.state = {};

        this.handleClose = this.handleClose.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentDidMount = () => {
        document.addEventListener("keydown", this.handleKeyDown, false);
    }

    handleClose = (e) => {
        e.preventDefault();
        console.log("Event fired!");
        this.setState({ show: false });
        this.props.refresh();
    }

    handleKeyDown = (e) => {
        if(e.keyCode === 27) {
            this.setState({ show: false });
            this.props.refresh();
        }
    }

    render = () => {
        const { hasShadowOverlay, show } = this.props;

        return (
            <ModalDialog id={"about-dialog"} hasShadowOverlay={hasShadowOverlay} display={show}>
                <Dialog id="about" display={show}>
                    <DialogBar centerTitle={true} borderBottom={false}>
                        <DialogTitle>About</DialogTitle>
                        <DialogCloseBtn handleClose={this.handleClose} enableClose={true}></DialogCloseBtn>
                    </DialogBar>
                    <DialogBody>
                        <div id="authors">
                            <h4 className="author">Fisnik <span className="title">[[nerd]]</span></h4>
                            <h4 className="author">Jerry <span className="title">[[mathematician]]</span></h4>
                        </div>
                    </DialogBody>
                    <DialogFooter></DialogFooter>
                </Dialog>
            </ModalDialog>
        );
    }
};
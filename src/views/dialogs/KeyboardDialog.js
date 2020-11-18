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

export default class KeyboardDialog extends React.Component {
    constructor(props) {
        super();
        this.state = {};

        this.handleClose = this.handleClose.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentDidMount = () => {
        document.addEventListener("keydown", this.handleKeyDown, false);
    }

    componentWillUnmount = () => {
        document.removeEventListener("keydown", this, false);
    }

    handleClose = (e) => {
        e.preventDefault();
        this.setState({ show: false });
        this.props.reset();
    }

    handleKeyDown = (e) => {
        if(e.keyCode === 27) {
            this.setState({ show: false });
            this.props.reset();
        }
    }

    render = () => {
        const { hasShadowOverlay, show } = this.props;

        return (
            <ModalDialog id={"keyboard-dialog"} hasShadowOverlay={hasShadowOverlay} display={show}>
                <Dialog id="keyboard" display={show}>
                    <DialogBar centerTitle={true} borderBottom={false}>
                        <DialogTitle>Keyboard Shortcuts</DialogTitle>
                        <DialogCloseBtn handleClose={this.handleClose} enableClose={true}></DialogCloseBtn>
                    </DialogBar>
                    <DialogBody>
                    </DialogBody>
                    <DialogFooter></DialogFooter>
                </Dialog>
            </ModalDialog>
        );
    }
};
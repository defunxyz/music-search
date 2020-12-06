import React from "react";
import 
{ Dialog,
DialogBody,
DialogFooter,
ModalDialog,
DialogTitle,
DialogBar, DialogCloseBtn}
from "../../components/Dialog";
import Track from "../../components/Track";

export default class TrackDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount = () => {
        document.addEventListener("keydown", this.handleKeyDown, false);
    }

    componentWillUnmount = () => {
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    handleClose = (e) => {
        e.preventDefault();
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
        const  { hasShadowOverlay, show } = this.props;
        return (
            <ModalDialog hasShadowOverlay={hasShadowOverlay} display={show}>
                <Dialog margintop={15} borderBottom={false} enableClose={true} display={show}>
                    <DialogBar centerTitle={true}>
                        <DialogTitle>Track</DialogTitle>
                        <DialogCloseBtn handleClose={this.handleClose} 
                        enableClose={true}></DialogCloseBtn>
                    </DialogBar>
                    <DialogBody>
                        <Track data={this.props.data} result={this.props.lyrics} />
                    </DialogBody>
                    <DialogFooter></DialogFooter>
                </Dialog>
            </ModalDialog>
        );
    }
};
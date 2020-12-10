/**
 * @file components/KeyboardDialog.js
 * @author Fisnik
 * @copyright 2020 Fisnik
 */

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
                    <DialogBar centerTitle={true} borderBottom={true}>
                        <DialogTitle>Keyboard Shortcuts</DialogTitle>
                        <DialogCloseBtn handleClose={this.handleClose} enableClose={true}></DialogCloseBtn>
                    </DialogBar>
                    <DialogBody>
                        <div className="kbd">
                            <ul>
                                <li>
                                    <div className="explain">Opens this dialog</div>
                                    <div className="shortcut"><kbd>SHIFT</kbd><span>+</span><kbd>?</kbd></div>
                                </li>
                                <li>
                                    <div className="explain">Close a dialog</div>
                                    <div className="shortcut"><kbd>Esc</kbd></div>
                                </li>
                                <li>
                                    <div className="explain">Move up and down in autosuggestion list</div>
                                    <dvi className="shortcut">
                                        <kbd><span className="up-key">&#8593;</span></kbd>
                                        <span></span>
                                        <kbd><span className="down-key">&#8595;</span></kbd>
                                    </dvi>
                                </li>
                            </ul>
                        </div>
                    </DialogBody>
                    <DialogFooter></DialogFooter>
                </Dialog>
            </ModalDialog>
        );
    }
};
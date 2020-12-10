/**
 * @file components/AboutDialog.js
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

export default class AboutDialog extends React.Component {
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
        const { hasShadowOverlay, show } = this.props;

        return (
            <ModalDialog id={"about-dialog"} hasShadowOverlay={hasShadowOverlay} blurEffect={false} display={show}>
                <Dialog id="about" display={show}>
                    <DialogBar centerTitle={true} borderBottom={false}>
                        <DialogTitle>About</DialogTitle>
                        <DialogCloseBtn handleClose={this.handleClose} enableClose={true}></DialogCloseBtn>
                    </DialogBar>
                    <DialogBody>
                        <div className="developers" id="developers">
                            <p className="about">{this.props.appinfo.about}</p>
                            <hr />
                            <h3>Developers</h3>
                            {this.props.appinfo.developers.map((developer) => (
                                <>
                                <h4>{developer.name} <span>{developer.title}</span></h4>
                                <p>{developer.about}</p>
                                </>
                            ))}
                        </div>
                    </DialogBody>
                    <DialogFooter></DialogFooter>
                </Dialog>
            </ModalDialog>
        );
    }
};
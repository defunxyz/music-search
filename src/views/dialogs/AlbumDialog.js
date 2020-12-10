/**
 * @file components/AlbumDialog.js
 * @author Fisnik
 * @copyright 2020 Fisnik
 */

import React from "react";
import 
{ Dialog,
DialogBody,
DialogFooter,
ModalDialog,
DialogTitle,
DialogBar, DialogCloseBtn}
from "../../components/Dialog";
import Album from "../../components/Album";

export default class AlbumDialog extends React.Component {
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
        const  { hasShadowOverlay, show, data, lyrics, scrollable } = this.props;
        let bordertop = true;
        let copyright = ""; 

        if(lyrics !== undefined && lyrics.result !== undefined) {
            copyright = lyrics.result.copyright.notice;
        } else {
            bordertop = false;
        }

        return (
            <ModalDialog hasShadowOverlay={hasShadowOverlay} display={show} scrollable={scrollable}>
                <Dialog margintop={15} borderBottom={false} enableClose={true} display={show}>
                    <DialogBar centerTitle={true}>
                    <DialogTitle>{data.album_type}</DialogTitle>
                        <DialogCloseBtn handleClose={this.handleClose} 
                        enableClose={true}></DialogCloseBtn>
                    </DialogBar>
                    <DialogBody>
                        <Album data={data} result={lyrics} />
                    </DialogBody>
                    <DialogFooter borderTop={bordertop}>
                        {bordertop && <div className="notice copyright">
                         &#169; {copyright}
                        </div>}
                    </DialogFooter>
                </Dialog>
            </ModalDialog>
        );
    }
};
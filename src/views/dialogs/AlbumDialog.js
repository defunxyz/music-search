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
        this.props.refresh();
    }

    handleKeyDown = (e) => {
        if(e.keyCode === 27) {
            this.setState({ show: false });
            this.props.refresh();
        }
    }

    render = () => {
        const  { hasShadowOverlay, show, data, lyrics } = this.props;
        return (
            <ModalDialog hasShadowOverlay={hasShadowOverlay} display={show}>
                <Dialog margintop={15} borderBottom={false} enableClose={true} display={show}>
                    <DialogBar centerTitle={true}>
                    <DialogTitle>{data.album_type}</DialogTitle>
                        <DialogCloseBtn handleClose={this.handleClose} 
                        enableClose={true}></DialogCloseBtn>
                    </DialogBar>
                    <DialogBody>
                        <Album data={data} result={lyrics} />
                    </DialogBody>
                    <DialogFooter borderTop={true}>
                        {lyrics.result !== undefined && <div className="notice copyright">
                         &#169; {lyrics.result.copyright.notice}
                        </div>}
                    </DialogFooter>
                </Dialog>
            </ModalDialog>
        );
    }
};
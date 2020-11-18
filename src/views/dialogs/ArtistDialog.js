import React from "react";
import 
{ Dialog, 
DialogTitle,
DialogBody,
DialogFooter,
ModalDialog, 
DialogBar}
from "../../components/Dialog";

export default class ArtistDialog extends React.Component {
    constructor(props) {
        super();
        this.state = {
            hasShadowOverlay: props.hasShadowOverlay,
            show: props.show,
        };
    }

    render = () => {
        const {hasShadowOverlay} = this.state;
        return (
            <ModalDialog hasShadowOverlay={hasShadowOverlay}>
                <Dialog borderBottom={false} enableClose={true}>
                    <DialogBar>
                        <DialogTitle></DialogTitle>
                    </DialogBar>
                    <DialogBody></DialogBody>
                    <DialogFooter></DialogFooter>
                </Dialog>
            </ModalDialog>
        );
    }
};
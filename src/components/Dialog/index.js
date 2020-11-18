import React from "react";
import "./dialog.css";

const Dialog = (props) => {
    return (<div className={`dialog ${props.display ? '' : 'hidden'}`}  
    style={{display: props.display ? 'block' : 'none'}}>
        {props.children}
    </div>)
};

const DialogBar = (props) => {
    return (
        <div className={`dialog-bar 
        ${props.centerTitle ? 'center-title' : ''} 
        ${props.borderBottom ? 'borderBottom' : ''} clearfix`}>
            {props.children}
        </div>
    )
};

const DialogCloseBtn = (props) => {
    return (<>
                {props.enableClose && <svg onClick={props.handleClose} className="close-btn rfloat" height="30px" width="30px" viewBox="0 0 24 24">
                <line stroke="#bec2c9" strokeLinecap="round" strokeWidth="2" x1="6" x2="18" y1="6" y2="18"></line>
                <line stroke="#bec2c9" strokeLinecap="round" strokeWidth="2" x1="6" x2="18" y1="18" y2="6"></line>
            </svg>}
    </>);
}

const DialogTitle = (props) => {
    return (
        <h3 className="lfloat dialog-title">
            {props.children}
        </h3>
    )
};

const DialogBody = (props) => {
    return (
        <div className={`dialog-body ${props.center ? 'center-content' : ''}`}>
            {props.children}
        </div>
    )
};

const DialogFooter = (props) => {
    return (
        <div className={`dialog-footer ${props.borderTop ? 'borderTop' : ''}`}>
            {props.children}
        </div>
    )
};

const ModalDialog = (props) => {
    return (
    <div id={props.id} className={`modal-dialog ${props.hasShadowOverlay ? 'overlay-effect' : ''}`} 
    style={{display: props.display ? 'block' : 'none'}}>
        {props.children}
    </div>
    );
};

export {
    Dialog, 
    DialogBar,
    DialogTitle,
    DialogCloseBtn,
    DialogBody,
    DialogFooter,
    ModalDialog
};
import React, {useState, forwardRef, useImperativeHandle} from 'react';
import ReactDOM from "react-dom";

const modalRoot: any  = document.getElementById("modal-root");

const Modal = forwardRef((props: any, ref: any) => {
    const [display, setDisplay] = useState(false);

    useImperativeHandle(ref, () => {
        return {
            openModal: () => open(),
            closeModal: () => close()
        } 
    });

    const open =() => {
        setDisplay(true)
    };

    const close = () => {
        setDisplay(false);
    };

    if (display) {

        return ReactDOM.createPortal(
        <div className={"modal-wrapper"}>
        <div onClick={close} className={"modal-backdrop"} />
            <div className={"modal-box"}>
            {props.children}
            </div>
        </div>, modalRoot);
    } 
    return null;
    });

export default Modal;
import { title } from 'process';
import React, {useState, forwardRef, useImperativeHandle} from 'react';
import ReactDOM from "react-dom";

const modalRoot: any  = document.getElementById("modal-root");

const Modal = forwardRef((props: any, ref: any) => {
    const [display, setDisplay] = useState(true);

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
                {props.title}
                <img className="img-in-modal" src={props.image} alt="" />
                {props.firstName}
                {props.lastName}
                <button onClick={close}>Close</button>
                {props.children}
            </div>
        </div>, modalRoot);
    } 
    return null;
    });

export default Modal;
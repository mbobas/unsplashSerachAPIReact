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
                <div className={"modal-inside"}>
                    <div className="profile-wrapper">
                        <img className="img-profile" src={props.portfolio_image} alt="" />
                        <div className="frist-and-last-name-and-username-wrapper">
                            <p><span className="frist-and-last-name">{props.firstName} {props.lastName} </span></p>
                            <p><span className="username">@{props.username}</span></p>
                        </div>  
                        
                    </div>
                    
                    <img className="img-in-modal" src={props.image} alt="" />
                    
                </div>
            </div>
        </div>, modalRoot);
    } 
    return null;
    });

export default Modal;
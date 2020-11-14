import React, {useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import Modal from './Modal';
import './Modal.css';

function TestPage() {
    const { modal, recivedPhoto } : any = useParams();
    const sModal = modal.slice(1, modal.length);
    const sRecivedPhoto = recivedPhoto.slice(1, recivedPhoto.length);
    const modalRef: any = useRef();

    const openModal = () => {
      modalRef.current.openModal()
    };
    
    return (
      <div className="ModalPage">
          <button onClick={openModal}>Open Modal</button>
          
          <Modal ref={modalRef}>
            <h1>Modal Header</h1>
            <p>
              <span>{sModal} {sRecivedPhoto} </span>
              <span>Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum</span>
            </p>

          </Modal>

      </div>
    );
}

export default TestPage;
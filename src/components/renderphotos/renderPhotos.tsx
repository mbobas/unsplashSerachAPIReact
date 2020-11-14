import React, {useState, Component, useRef, useEffect, } from 'react';
import { isTemplateExpression } from 'typescript';
import Modal from '../modal/Modal';
import '../modal/Modal.css';
import "./renderPhotos.css";


const RenderPhotos = (props: any) => {
    const [modaltitle, setModaltitle] = useState("empty");
    const [image, setImage] = useState("empty");
    const [firstName, setFirstName] = useState("empty");
    const [lastName, setLastName] = useState("empty");
    const modalRef: any = useRef();

    const openModal = () => {
      modalRef.current.openModal()
    };

    const closeModal = () => {
      modalRef.current.closeModal()
    };

    const updateModalParam =(title: string, image: string, firstName: string, lastName: string) => {
        setModaltitle(title);
        setImage(image);
        setFirstName(firstName);
        setLastName(lastName);
        console.log(modaltitle)
    }

    useEffect(() => {
        closeModal();
        }, []);
   

    return (
        <div className="show-images-container">
            {props.resultPhotos.map((item: any) => (
                <div   onClick={() => {
                            openModal();
                            updateModalParam(
                                item.description, 
                                item.urls.regular, 
                                item.user.first_name,
                                item.user.last_name,
                                );
                        }} 
                        key={item.id} 
                        className="one-result-container"
                    >
                    <span className="title">{item.description}</span>    
                    <h4 className="title">{item.alt_description}</h4>
                    <img src={item.urls.small} alt="" />
                    
                </div>
                ))}
            <div className="">
                    <Modal 
                    title={modaltitle} 
                    image={image} 
                    firstName={firstName} 
                    lastName={lastName} 
                    ref={modalRef}>
                        
                    </Modal>   
            </div>
        </div>
    )};

export default RenderPhotos;



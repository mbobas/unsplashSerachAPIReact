import React, {useState, Component, } from 'react';
import Modal from '../modal/Modal';
// import '../modal/Modal.css';
// import "./renderPhotos.css";


const RenderPhotos = (props: any) => {

    return (
        <div className="show-images-container">
            {props.resultPhotos.map((item: any) => (
                    <div 
                        key={item.id} 
                        className="one-result-container"
                    >
                    <span className="title">{item.title}</span>    
                    <h4 className="title">{item.alt_description}</h4>
                    <img src={item.urls.small} />
                    </div>
                ))}
        </div>
    )};

export default RenderPhotos;



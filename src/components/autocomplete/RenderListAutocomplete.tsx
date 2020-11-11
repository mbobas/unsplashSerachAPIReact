import React, {useState} from 'react';

const RenderListAutocomplete = (resultCollection: any) => {
    return (
        <div className="field-container">
        {resultCollection.map((item: any) => (
            <div className="item">
            <span className="title">{item.title}</span>    
            </div>
        ))}
        </div>
    )
  };


export default RenderListAutocomplete;
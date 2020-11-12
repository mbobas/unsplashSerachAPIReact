import React, {useState, Component} from 'react';
import "./autocompletefield.css";

interface RenderListAutocompleteProps {
    resultCollection: any,
    updatePhotoCollections: any,
    handleSearchCollections: any,
    toggleAutoCompleeteFields: any,
    updateSearchPhoto: any
}

class RenderListAutocomplete extends Component<RenderListAutocompleteProps> {
    render() {
    return (
        <div className="field-container">
        {this.props.resultCollection.map((item: any) => (
            <div className="item">
                <button 
                    className="title"
                    onClick={() => {
                        this.props.updatePhotoCollections(item.title);
                        this.props.toggleAutoCompleeteFields(false); 
                        this.props.updateSearchPhoto(item.title)
                    }}
                >
                
                        {item.title}
                </button>    
            </div>
            
        ))}
        </div>
    )}
  };


export default RenderListAutocomplete;



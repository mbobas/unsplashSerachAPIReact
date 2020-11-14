import React, {useState, Component} from 'react';
import { Link } from 'react-router-dom';
import "./RenderListAutocomplete.css";

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
                <div className="button"
                    onClick={() => {
                        this.props.toggleAutoCompleeteFields(false); 
                        this.props.updateSearchPhoto(item.title)}}>
                    {item.title}
            </div>
            
        ))}
        </div>
    )}
  };

export default RenderListAutocomplete;



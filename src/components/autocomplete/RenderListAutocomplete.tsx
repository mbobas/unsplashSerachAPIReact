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
    if (this.props.resultCollection.length > 0) {
        return (
        <div className="field-container">
        {this.props.resultCollection.map((item: any) => (
                <Link to={'/:' + item.title}><div key={item.id} className="button"
                onClick={() => {
                    this.props.toggleAutoCompleeteFields(false);
                    this.props.updateSearchPhoto(item.title);
                } }>
                {item.title}
            </div></Link>
            
        ))}
        
        </div>
    )} else {
        return (<span>No matches! 👎</span>)
    }    
    }
  };

export default RenderListAutocomplete;



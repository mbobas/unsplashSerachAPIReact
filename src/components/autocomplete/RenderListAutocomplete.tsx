import React, {useState, Component} from 'react';
interface RenderListAutocompleteProps {
    resultCollection: any,
    updatePhoto: any,
    handleSearchCollections: any,
}
class RenderListAutocomplete extends Component<RenderListAutocompleteProps> {
    render() {
    return (
        <div className="field-container">
        {this.props.resultCollection.map((item: any) => (
            <div className="item">
                <button 
                    className="title"
                    onClick={this.props.updatePhoto(item.title) && this.props.handleSearchCollections() }
                >
                        {item.title}
                </button>    
            </div>
            
        ))}
        </div>
    )}
  };


export default RenderListAutocomplete;



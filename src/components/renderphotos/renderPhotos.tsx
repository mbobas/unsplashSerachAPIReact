import React, {useState, Component} from 'react';
import "./renderPhotos.css";

interface RenderPhotosProps {
    resultPhotos: any,
    updatePhotoCollections: any,
    handleSearchCollections: any,
    toggleAutoCompleeteFields: any,
    updateSearchPhoto: any,
}
class RenderPhotos extends Component<RenderPhotosProps> {
    render() {
    return (
        <div className="show-images-container">
            {this.props.resultPhotos.map((item: any) => (
                    <div className="one-result-container">
                    <span className="title">{item.title}</span>    
                    <h4 className="title">{item.alt_description}</h4>
                    <img src={item.urls.small} />
                    </div>
                ))}
        </div>
    )}
  };

export default RenderPhotos;



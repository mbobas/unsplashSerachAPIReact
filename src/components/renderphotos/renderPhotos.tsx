import React, {useState, Component} from 'react';
import "./renderPhotos.css";

interface RenderPhotosProps {
    resultPhotos: any,
    updateModalParam: any
}
class RenderPhotos extends Component<RenderPhotosProps> {
    render() {
    return (
        <div className="show-images-container">
            {this.props.resultPhotos.map((item: any) => (
                    <div 
                        onClick={() => {
                            this.props.updateModalParam(item.title); 
                        }}
                        key={item.id} 
                        className="one-result-container"
                    >
                    <span className="title">{item.title}</span>    
                    <h4 className="title">{item.alt_description}</h4>
                    <img src={item.urls.small} />
                    </div>
                ))}
        </div>
    )}
  };

export default RenderPhotos;



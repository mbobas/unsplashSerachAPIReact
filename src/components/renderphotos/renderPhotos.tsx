import React, {useState, Component} from 'react';
interface renderPhotosProps {
    resultCollection: any,
}
class renderPhotos extends Component<renderPhotosProps> {
    render() {
    return (
        <div className="field-container">
        {this.props.resultCollection.map((item: any) => (
            <div className="item">
            <span className="title">{item.title}</span>    
            </div>
        ))}
        </div>
    )}
  };


export default renderPhotosProps;



import React, {useState } from 'react';
import ReactDOM from "react-dom";
import axios from 'axios';
import Unsplash, { toJson } from 'unsplash-js';
import env from './env.json'
import "./App.css";
import AutocompleteField from './components/autocomplete/AutocompleteField';

export default function App() { 
    const unsplash = new Unsplash({ accessKey: env.API_KEY });

    const [photo, setPhoto] = useState("");
    const [clientId, setClientId] = useState(env.API_KEY);
    const [resultCollection, setResultCollection] = useState([]);
    const [resultPhotos, setResultPhotos] = useState([]);
    const [toggleAutocomplete, settoggleAutocomplete] = useState(false);

    const handleChange = (event: any ) => {
        setPhoto(event.target.value);
        console.log("handleChange: value");
    }

    const handleSearchPhotos = (event:any) => {
        console.log("handleSearchPhotos: " + photo)
        unsplash.search.photos(photo, 1, 10)
            .then(toJson)
            .then(json => {
                console.log("handlePhotosJsonOnly");
                console.log(json);
                setResultPhotos(json.results)
            });
    }
    const handleSearchCollections = (event:any) => {
        console.log("handleSearchCollections: " + photo)
        unsplash.search.collections(photo, 1, 50)
            .then(toJson)
            .then(json => {
                console.log("result: Collection");
                console.log(json.results);
                setResultCollection(json.results)
            });
    }

    const onKeyDown = (event:any ) => {
        if (event.key === 'Enter') {
            handleSearchCollections(event);
          }
    }
    const autoCompleete = (event: any) => {
        if (event.target.value.length == 3){
            settoggleAutocomplete(true);
            console.log(toggleAutocomplete);
        }
        if (event.target.value.length > 3) {
        console.log(event.target.value.length + "StartAutocomplete")
        }
        if (event.target.value.length < 3){
            settoggleAutocomplete(false);
            console.log(toggleAutocomplete);
        }
    }

    const renderListAutocomplete = (resultCollection: any) => {
        return (
            <div className="">
            {resultCollection.map((item: any) => (
                <div>
                <h1>{item.title}</h1>    
                </div>
            ))}
            </div>
        )
      };


    return (
        <div className="App">
            <div className="top-of-app">
                <div className="logo-and-searchbar-container">
                    <h1 className="logo-unsplash-h1">Usnplash Photo Search in React</h1>
                    <h4 className="logo-unsplash-h4">The internet’s source of freely-usable images.
                        Powered by creators everywhere.</h4>
                    <div className="search-bar-with-button-container">
                        <button 
                            className="searchButton"
                            onClick={handleSearchCollections} 
                            type="submit">
                            Search
                        </button>
                        <input className="search-bar"
                            onChangeCapture={autoCompleete}
                            onChange={handleChange} 
                            onKeyDown={onKeyDown}
                            type="text" name="photo" 
                            placeholder="Search for high resolution photos" 
                        />
                    </div>
                    <div className="toogleAutocomplete">
                            {toggleAutocomplete ? renderListAutocomplete(resultCollection) : <span>No! 👎</span>}
                    </div>
                </div>  
            </div>

           

            <div className="show-images-container">
            {resultCollection.map((item: any) => (
                <div className="one-result-container">
                <h1>{item.title}</h1>    
                <h4 className="logo-unsplash-h4">{item.cover_photo.alt_description}</h4>
                <img src={item.cover_photo.urls.small} />
                </div>
            ))}
            </div>
        </div>
    );
}


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);



import React, {useState } from 'react';
import ReactDOM from "react-dom";
import axios from 'axios';
import Unsplash, { toJson } from 'unsplash-js';
import env from './env.json'
import "./App.css";


export default function App() { 
    const unsplash = new Unsplash({ accessKey: env.API_KEY });

    const [photo, setPhoto] = useState("");
    const [clientId, setClientId] = useState(env.API_KEY);
    const [result, setResult] = useState([]);

    const handleChange = (event: any ) => {
        setPhoto(event.target.value);
        console.log("handleChange: value");
    }

    const handleSearchPhotos = (event:any) => {
        console.log("handleSearchPhotos: " + photo)
        unsplash.search.photos(photo, 1, 10)
            .then(toJson)
            .then(json => {
                console.log(json);
                setResult(json.results)
            });
    }

    const onKeyDown = (event:any ) => {
        if (event.key === 'Enter') {
            handleSearchPhotos(event);
          }
    }
    const autoCompleete = (event: any) => {
        if (event.target.value.length > 3)
        console.log(event.target.value.length + "StartAutocomplete")
    }

    return (
        <div className="App"> 
            <div className="logo-and-searchbar-container">
                <h1 className="logo-unsplash-h1">Usnplash Photo Search in React</h1>
                <h4 className="logo-unsplash-h4">The internet’s source of freely-usable images.
                    Powered by creators everywhere.</h4>
                <div className="search-bar-with-button-container">
                    <input className="search-bar"
                        onChangeCapture={autoCompleete}
                        onChange={handleChange} 
                        onKeyDown={onKeyDown}
                        type="text" name="photo" 
                        placeholder="Search for high resolution photos" 
                    />
                    <button 
                        onClick={handleSearchPhotos} 
                        type="submit">
                        Search
                    </button>
                </div>
            </div>
            
            <div>
            {result.map((item: any) => (
                <img src={item.urls.small} />
            ))}
            </div>
        </div>
    );
}


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);



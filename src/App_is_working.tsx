  
import React, {useState } from 'react';
import ReactDOM from "react-dom";
import axios from 'axios';
//import Unsplash from 'unsplash-js';
import env from './env.json'
import "./App.css";

// require syntax
// const Unsplash = require('unsplash-js').default;
// const toJson = require('unsplash-js').toJson;


// const unsplash = new Unsplash({ accessKey: env.API_KEY });

export default function App() { 
    const [photo, setPhoto] = useState("");
    const [clientId, setClientId] = useState("Fh_M0A0Ou9gGMNFk41QFpiX_lY9VjwXH6K7RFidx0MA");
    
    const [result, setResult] = useState([]);

    const handleChange = (event: any ) => {
        setPhoto(event.target.value);
    }
    const handleSubmit = (event: any) => {
        console.log(photo);
        const url = 
        "https://api.unsplash.com/search/photos?page=1&query="+
        photo+
        "&client_id="+
        clientId;

        axios.get(url).then(response => {
            console.log(response.data.results);
            setResult(response.data.results)
        });
    }
    const onKeyDown = (event:any ) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
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
                        onClick={handleSubmit} 
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



import React, {useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Unsplash, { toJson } from 'unsplash-js';
import env from '../../env.json'
import "./ResultsPage.css";
import RenderListAutocomplete from '../../components/autocomplete/RenderListAutocomplete';
import RenderPhotos from '../../components/renderphotos/RenderPhotos';
import { Link } from 'react-router-dom';


export default function ResultsPage() { 
    const unsplash = new Unsplash({ accessKey: env.API_KEY });
    const { recivedPhoto } : any = useParams();
    const recivedPhotoShort = recivedPhoto.slice(1, recivedPhoto.length);

    const [photo, setPhoto] = useState("");
    const [clientId, setClientId] = useState(env.API_KEY);
    const [resultCollection, setResultCollection] = useState([]);
    const [resultPhotos, setResultPhotos] = useState([]);
    const [toggleAutocomplete, settoggleAutocomplete] = useState(false);

    const handleChange = (event: any ) => {
        setPhoto(event.target.value);
        console.log("handleChange: value");
        handleSearchCollections(event);
    }

    const handleSearchPhotos = (event:any) => {
        unsplash.search.photos(photo, 1, 15)
            .then(toJson)
            .then(json => {
                console.log("handleSearchPhotos" + photo);
                console.log(json);
                setResultPhotos(json.results)
            });
    }
    const handleSearchCollections = (event:any) => {
        unsplash.search.collections(photo, 1, 20)
            .then(toJson)
            .then(json => {
                console.log("handleSearchCollections");
                console.log(json.results);
                setResultCollection(json.results)
            });
    }

    const onKeyDown = (event:any ) => {
        if (event.key === 'Enter') {
            console.log('OnKeyDown: ' + photo);
            updateSearchPhoto(photo);
            settoggleAutocomplete(false);
          }
    }
    const autoCompleete = (event: any) => {
        if (event.target.value.length === 3){
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


    const updatePhotoCollections = (photo: any) => {
        setPhoto(photo);
        unsplash.search.collections(photo, 1, 20)
            .then(toJson)
            .then(json => {
                console.log("updateCollections");
                console.log(json.results);
                setResultCollection(json.results)
            });
    }

    const updateSearchPhoto = (photo: any) => {
        setPhoto(photo);
        unsplash.search.photos(photo, 1, 15)
        .then(toJson)
        .then(json => {
            console.log("updateSearchPhoto");
            console.log(json);
            setResultPhotos(json.results)
        });
    }

    const toggleAutoCompleeteFields = (toggleStatus: any) => {
            settoggleAutocomplete(toggleStatus);
            console.log("Toggle" + toggleStatus);
    }

    function ShowAutoCompleete() {
        if (toggleAutocomplete) {  
            return (
                <RenderListAutocomplete 
                resultCollection={resultCollection} 
                updatePhotoCollections={updatePhotoCollections} 
                handleSearchCollections={handleSearchCollections}
                toggleAutoCompleeteFields={toggleAutoCompleeteFields}
                updateSearchPhoto={updateSearchPhoto}
            />)
        } else {
            return (<span>No matches! 👎</span>)
        }
    }

    useEffect(() => {
        setPhoto(recivedPhotoShort);
        console.log("useEffect updated " + recivedPhotoShort);
        unsplash.search.photos(recivedPhotoShort, 1, 10)
        .then(toJson)
        .then(json => {
            console.log("useEffect updated list of Photos: ");
            console.log(json);
            setResultPhotos(json.results)
        });
        
        }, [recivedPhotoShort]);
   


    return (
        <div className="App">
            <div className="top-of-app">
                <div className="logo-and-searchbar-container">
                    <h1 className="logo-unsplash-h1">Usnplash Photo Search in React</h1>
                    <h4 className="logo-unsplash-h1">The internet’s source of freely-usable images.
                        Powered by creators everywhere.</h4>
                    <div className="search-bar-with-button-container">
                      <button 
                            className="searchButton"
                            onClick={handleSearchCollections && handleSearchPhotos} 
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
                            <ShowAutoCompleete />
                    </div>
                </div>  
            </div>
            
            <RenderPhotos  
            resultPhotos={resultPhotos} 
            updatePhotoCollections={updatePhotoCollections} 
            handleSearchCollections={handleSearchCollections}
            toggleAutoCompleeteFields={toggleAutoCompleeteFields}
            updateSearchPhoto={updateSearchPhoto}
            />

        </div>
    );
    
}




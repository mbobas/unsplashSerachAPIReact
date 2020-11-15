import React, {useState } from 'react';
import ReactDOM from "react-dom";
import Unsplash, { toJson } from 'unsplash-js';
import env from '../../env.json'
import "./Home.css";
import RenderListAutocomplete from '../../components/autocomplete/RenderListAutocomplete';
import { Link, Redirect, Route, useLocation, withRouter } from 'react-router-dom';
import {IconContext} from "react-icons"
import {FaSearch} from "react-icons/fa"


export default function Home() { 
    //unplashs settings
    const unsplash = new Unsplash({ accessKey: "sDI3L3I2mgA91a4deHN4BevefU63v8_yMhgYmrtHy6k"});
    //states of 
    const [photo, setPhoto] = useState("sunset");
    const [clientId, setClientId] = useState(env.API_KEY);
    const [resultCollection, setResultCollection] = useState([]);
    const [resultPhotos, setResultPhotos] = useState([]);
    const [toggleAutocomplete, settoggleAutocomplete] = useState(false);
    const [modalTitle, setModalTitle] = useState("");

    const location = useLocation();

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
        unsplash.search.collections(photo, 1, 5)
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
                />
                )
        } else {
            return (<span>No matches! 👎</span>)
        }
    }
    return (
        <div className="AppH">
            <div className="top-of-appH">

                <Link to="/"><div className="home-linkH">Home</div></Link>
                <a className="about-linkH" target='_blank' href="https://github.com/mbobas">About</a>

                <div className="logo-and-searchbar-containerH">
                    <span className="logo-unsplash-bigH">Usnplash Photo Search in React</span>
                    <span className="logo-unsplash-smallH">The internet’s source of freely-usable images.
                        <br />Powered by creators everywhere.</span>
                    <div className="search-bar-with-button-containerH">
                        <Link to={'/:'+photo}>
                            <div className="searchButtonH"
                                onClick={handleSearchCollections && handleSearchPhotos}>
                            <IconContext.Provider value={{ style: {fontSize: '30px', color: "rgb(255,255,255,0.7)"}}}>
                                <FaSearch />
                            </IconContext.Provider>
                            </div>
                        </Link>

                        <input className="search-barH"
                            onChangeCapture={autoCompleete}
                            onChange={handleChange} 
                            onKeyDown={onKeyDown}
                            type="text" name="photo" 
                            placeholder="Search for high resolution photos" 
                        />
                    </div>
                    <div className="toogleAutocompleteH">
                        <ShowAutoCompleete />
                    </div>
                </div>  
            </div>
        </div>
    );
}








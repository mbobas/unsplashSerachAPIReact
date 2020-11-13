import React, {useState } from 'react';
import { useParams } from 'react-router';
import Unsplash, { toJson } from 'unsplash-js';
import env from '../../env.json'
import "./Home.css";
import RenderListAutocomplete from '../../components/autocomplete/RenderListAutocomplete';
import RenderPhotos from '../../components/renderphotos/RenderPhotos';
import { Link } from 'react-router-dom';

export default function TestPage2() { 
    const unsplash = new Unsplash({ accessKey: env.API_KEY });
    const { recivedPhoto } : any = useParams();
    const recivedPhotoShort = recivedPhoto.slice(1, recivedPhoto.length);
    console.log("recivedPhotoShort: " + recivedPhotoShort);

    const [photo, setPhoto] = useState("");
    const [clientId, setClientId] = useState(env.API_KEY);
    const [resultCollection, setResultCollection] = useState([]);
    const [resultPhotos, setResultPhotos] = useState([]);
    const [toggleAutocomplete, settoggleAutocomplete] = useState(false);
    const [word, setWord] = useState("");
    const [wordArray, setWordArray] = useState(["test"]);
    const [toggleAutocompleteField, settoggleAutocompleteField] = useState(false);

    const handleChange = (event: any ) => {
        setPhoto(event.target.value);
        console.log("handleChange: value");
        ifTheSameWord(resultCollection);
        handleSearchCollections(event);
    }

    const handleSearchPhotos = (event:any) => {
        console.log("handleSearchPhotos: " + photo)
        unsplash.search.photos(photo, 1, 15)
            .then(toJson)
            .then(json => {
                console.log("handlePhotosJsonOnly");
                console.log(json);
                setResultPhotos(json.results)
            });
    }
    const handleSearchCollections = (event:any) => {
        console.log("handleSearchCollections: " + photo)
        unsplash.search.collections(photo, 1, 20)
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

    const ifTheSameWord = (resultCollection: any) => {
        setWordArray([]);
        resultCollection.map((item: any) => {
            if (item.title.toString() != word) {
                console.log("item.title");
                console.log(item.title);
                setWord(item.title);
                wordArray.push(item.title);
                
                console.log("Dobre" + item.title)
            } else {
                console.log("Złe" + item.title)
            }
        });
        console.log("wordArray");
        console.log(wordArray);
    }

    const updatePhotoCollections = (photo: any) => {
        setPhoto(photo);
        console.log("photo updated" + photo);
        unsplash.search.collections(photo, 1, 20)
            .then(toJson)
            .then(json => {
                console.log("result: Collection");
                console.log(json.results);
                setResultCollection(json.results)
            });
    }

    const updateSearchPhoto = (photo: any) => {
        setPhoto(photo);
        console.log("photo updated" + photo);
        unsplash.search.photos(photo, 1, 15)
        .then(toJson)
        .then(json => {
            console.log("Photos Search List");
            console.log(json);
            setResultPhotos(json.results)
        });
    }

    const toggleAutoCompleeteFields = (toggleStatus: any) => {
            settoggleAutocomplete(toggleStatus);
            console.log("toggleAutoCompleeteFields: ");
            console.log(toggleStatus);
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

    return (
        <div className="App">
            <div className="top-of-app">
                <div className="logo-and-searchbar-container">
                    <h1 className="logo-unsplash-h1">Usnplash Photo Search in React</h1>
                    <h4 className="logo-unsplash-h1">The internet’s source of freely-usable images.
                        Powered by creators everywhere.</h4>
                    <div className="search-bar-with-button-container">
                        <Link to="/about"><button 
                            className="searchButton"
                            onClick={handleSearchCollections && handleSearchPhotos} 
                            type="submit">
                            Search
                        </button></Link>
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
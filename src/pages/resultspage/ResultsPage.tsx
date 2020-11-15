import React, {useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import Unsplash, { toJson } from 'unsplash-js';
import env from '../../env.json'
import "./ResultsPage.css";
import RenderListAutocomplete from '../../components/autocomplete/RenderListAutocomplete';
import RenderPhotos from '../../components/renderphotos/RenderPhotos';
import '../../components/modal/Modal.css';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { FaSearch } from 'react-icons/fa';


export default function ResultsPage() { 
    const unsplash = new Unsplash({ accessKey: env.API_KEY });
    const { recivedPhoto } : any = useParams();
    const recivedPhotoShort = recivedPhoto.slice(1, recivedPhoto.length);

    const [photo, setPhoto] = useState("");
    const [clientId, setClientId] = useState(env.API_KEY);
    const [resultCollection, setResultCollection] = useState([]);
    const [resultPhotos, setResultPhotos] = useState([]);
    const [toggleAutocomplete, settoggleAutocomplete] = useState(false);
    const [modalTitle, setModalTitle] = useState("");

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

    const updateModalParam = (title: any) => {
        setModalTitle(title);
        console.log('Modal title: ' + modalTitle)
        console.log('Modal title: ' + modalTitle)
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
        <div className="AppR">
            <div className="top-of-appR">
                <Link to="/"><div className="home-linkR">Home</div></Link>
                <a className="about-linkR" target='_blank' href="https://github.com/mbobas">About</a>

                <div className="logo-and-searchbar-containerR">
                    <div className="search-bar-with-button-containerR">
                        <Link to={'/:'+photo}>
                            <div className="searchButtonR"
                                onClick={handleSearchCollections && handleSearchPhotos}>
                            <IconContext.Provider value={{ style: {fontSize: '30px', color: "rgb(0,0,0,0.6)"}}}>
                                <FaSearch />
                            </IconContext.Provider>
                            </div>
                        </Link>
                        <input className="search-barR"
                            onChangeCapture={autoCompleete}
                            onChange={handleChange} 
                            onKeyDown={onKeyDown}
                            type="text" name="photo" 
                            placeholder="Search for high resolution photos" 
                        />
                    </div>
                    <div className="toogleAutocompleteR">
                        <ShowAutoCompleete />     
                    </div>
                    <span className="text-to-findeR">{photo}</span>
                </div>  
                
            </div>
            
            <RenderPhotos  
                resultPhotos={resultPhotos} 
            />

        </div>
    );
    
}




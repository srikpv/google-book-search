import React, {useState, useEffect, useRef} from 'react'
import API from "./utils/API";


export default function Saved() {
    const bookNameRef = useRef();
    const maxResultsRef = useRef();
    const [results, setResults] = useState({});


    const getSavedBooks = _ => {
        return API.getAllSavedBooks()
        .then(data => {
                setResults(data);
            })
    }

      useEffect(() => {
        API.getAllSavedBooks()
        .then(data => {
                setResults(data);
            })
    }, []);
    
   

    const handleSaveBook = async id => {
            API.deleteBooksById(id)
            .then(res => getSavedBooks());
    }


    return (
        <>
        
        
        <div className="row">

        </div>
        <div className="row">
            <div class="col s1"></div>
            <div class="col s10">
                {results && results.length > 0 && results.map(result =>
                <div class="row">
                    <div class="col s12">
                        <div class="card horizontal">
                        <div class="card-image">
                            <img style={{'height': '149px', 'width': '100px'}} src={result.thumbnail}></img>
                        </div>
                        <div class="card-stacked">
                            <div class="card-action">
                                <a target='_blank' href={result.canonicalVolumeLink}>{result.title} + {result.subtitle}</a>
                            </div>
                            <div class="card-content">
                                <p>{result.description}</p>
                                <a onClick={() => handleSaveBook(result.id)} class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons" id={"Icon_" + result.id}>remove</i></a>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                )}
            </div>
            <div class="col s1"></div>
        </div>
        
        </>
    )
}

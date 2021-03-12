import React, {useState, useEffect, useRef} from 'react'
import API from "./utils/API";


export default function Home() {
    const bookNameRef = useRef();
    const maxResultsRef = useRef();
    const [search, setSearch] = useState({'search' : '', 'maxResults' : 10, 'startIndex' : 0});
    const [results, setResults] = useState({});
    const [savedBooks, setSavedBooks] = useState({});

      useEffect(() => {
          if(search.search !== ""){
                API.getBookSearch(search.search, search.maxResults, search.startIndex)
                .then(data => {
                    const ids = data.items.map(item => item.id);
                    API.getSavedBooksById(ids)
                    .then(res => {
                        const saved_ids = res.map(book => book.id);
                        data.items.forEach(item => {
                            if(saved_ids.includes(item.id))
                                item.saved = 1;
                            else
                                item.saved = 0;
                        });
                        setResults(data.items);
                    })
                    
                });
        }
    }, [search])
    
    const handleFormSubmit = event => {
        event.preventDefault();
        setSearch({...search, 'search' : bookNameRef.current.value, 'maxResults' : 10, 'startIndex' : 0});
    }

    const handleNextPage = e => {
        setSearch({...search, 'startIndex' : search.startIndex + search.maxResults})
    }
    const handlePreviousPage = e => {
        setSearch({...search, 'startIndex' : (search.startIndex - search.maxResults) < 0 ? 0 : (search.startIndex - search.maxResults)})
    }
    

    const handleSaveBook = async id => {
        const saveBook = results.filter(book => book.id === id)[0];
        if(document.getElementById('Icon_'+saveBook.id).innerHTML === 'remove'){
            API.deleteBooksById(saveBook.id)
            .then(res => document.getElementById('Icon_'+saveBook.id).innerHTML = 'add');
        }
        else
        {
            const bookObj = {
                'id' : saveBook.id,
                description : DisplayDescription(saveBook.volumeInfo.description),
                thumbnail : saveBook.volumeInfo.imageLinks && saveBook.volumeInfo.imageLinks.thumbnail,
                canonicalVolumeLink : saveBook.volumeInfo.canonicalVolumeLink,
                title : saveBook.volumeInfo.title,
                subtitle : saveBook.volumeInfo.subtitle
            }
            API.postBookInfo(bookObj)
            .then(res => document.getElementById('Icon_'+saveBook.id).innerHTML = 'remove');
        }
    }

    const DisplayDescription = description => {
        if(typeof(description) === 'undefined') return ""
        else return(String(description).substr(0, 210));        
    }

    return (
        <>
        
        <div className="row">

        </div>
        <div className="row">
            <div class="col s1"></div>
            <div class="col s10">
                <div class="row">
                    <form class="col s12" onSubmit={handleFormSubmit}>
                    <div class="row">
                        <div class="input-field col s10">
                        <input ref={bookNameRef} id="book_name" type="text" class="validate"  />
                        <label for="book_name">Book Name</label>
                        </div>
                        <div class="input-field col s2">
                            <button class="btn waves-effect waves-light" type="submit" name="action">Search
                                <i class="material-icons right">search</i>
                            </button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
            <div class="col s1"></div>
        </div>

        <div className="row">

        </div>
        <div className="row">
            <div class="col s1"></div>
            <div class="col s10">
                {results.length > 0 && results.map(result =>
                <div class="row">
                    <div class="col s12">
                        <div class="card horizontal">
                        <div class="card-image">
                            <img style={{'height': '149px', 'width': '100px'}} src={result.volumeInfo.imageLinks && result.volumeInfo.imageLinks.thumbnail}></img>
                        </div>
                        <div class="card-stacked">
                            <div class="card-action">
                                <a target='_blank' href={result.volumeInfo.canonicalVolumeLink}>{result.volumeInfo.title} + {result.volumeInfo.subtitle}</a>
                            </div>
                            <div class="card-content">
                                <p>{result.volumeInfo.description && DisplayDescription(result.volumeInfo.description)}</p>
                                <a onClick={() => handleSaveBook(result.id)} class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons" id={"Icon_" + result.id}>{result.saved === 1 ? 'remove' : 'add'}</i></a>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                )}
            </div>
            <div class="col s1"></div>
        </div>
        
        <div className="row">
            <div class="col s1"></div>
            <div class="col s8">
                <button onClick={handlePreviousPage} class="btn waves-effect waves-light" type="button" name="action">Pre<i class="material-icons left">arrow_back</i></button>
            </div>
            <div class="col s2" style={{'float' : 'right'}}>
                <button onClick={handleNextPage} class="btn waves-effect waves-light" type="button" name="action">Next
                    <i class="material-icons right">arrow_forward</i>
                </button>
            </div>
            <div class="col s1"></div>
        </div>
        </>
    )
}

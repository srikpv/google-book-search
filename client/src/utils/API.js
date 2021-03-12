import axios from 'axios';
const myHeaders = new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });

export default {

    postBookInfo: function(saveBook) {
        return axios.post('/app/saveBook', saveBook, {
      headers : myHeaders,
        })
            .then(res => res.data);
        },

        deleteBooksById: function(id) {
            return axios.put('/app/deleteBooksById/' + id, {
          headers : myHeaders,
            })
                .then(res => res.data);
            },

    getSavedBooksById: function(ids) {
        return axios.get('/app/getSavedBooksById/' + ids.join(','), {
        headers : myHeaders,
        })
            .then(res => res.data);
        },

        getAllSavedBooks: function(ids) {
            return axios.get('/app/getAllSavedBooks', {
            headers : myHeaders,
            })
                .then(res => res.data);
            },
    

    getBookSearch: function(search, maxResults, startIndex) {
        const reqParams = {
            'q' : search,
            'maxResults' : maxResults,
            'startIndex' : startIndex,
            'key' : process.env.REACT_APP_GOOGLE_BOOK_API_KEY
        }
        return axios.get(process.env.REACT_APP_GOOGLE_BOOK_API, { params : reqParams})
            .then(response => response.data);
    }
}






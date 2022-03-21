const axios  = require("axios")
class ApiHandler {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'https://imdb-api.com/en/API'
        })
        this.key=process.env.API_KEY_DEV
    }


    searchMovie(query) {
        return this.axiosApp.get(`/search/${this.key}/${query}`)
    }

    getCommingSoon() {
        return this.axiosApp.get(`/comingsoon`)
    }

    getReview(filmId) {
        return this.axiosApp.get(`/reviews/${this.key}/${filmId}`)
    }
    

    getRating(filmId) {
        return this.axiosApp.get(`/ratings/${this.key}/${filmId}`)
    }

    // editCharacter(characterId, characterInfo) {
    //     return this.axiosApp.put(`/characters/${characterId}`, characterInfo)
    // }
}

module.exports = ApiHandler

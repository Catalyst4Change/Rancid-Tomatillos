import React, { Component } from 'react';
import './Search.css';

class Search extends Component {
  constructor() {
    super()
    this.state = {
      query: '',
      error: false,
      sort: ''
    }
  }

  handleChange = (event) => {
    console.log("change");
    this.setState({ ...this.state, [event.target.name]: event.target.value})
    setTimeout(() => {
      this.sortMovies()
    }, 500);
  }

  sortMovies = () => {
    const sort = this.state.sort
    if (sort === "release_date") {
      const sortedMovies = this.props.movies.map(movie => {
      const newDate = new Date(movie.release_date)
        console.log(newDate);
      movie.release_date = newDate
      return movie
      }).sort((a ,b) => b.release_date - a.release_date)
      this.props.filterMovies(sortedMovies)

    } else if (sort === "average_rating") {
      const sortedMovies = this.props.movies.sort((a ,b) => b.average_rating - a.average_rating)
      this.props.filterMovies(sortedMovies)
    }
  }

  submitSearch = (event) => {
    event.preventDefault()
    this.searchMovie()
    this.clearInput()
  }

  searchMovie = () => {
    const capitalizeSearchedMovie = (string) => {
      return string.split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1)
      }).join(" ")
    }
    
    const movie = this.props.movies.find(movie => {
      const foundMovie = movie.title === capitalizeSearchedMovie(this.state.query)
      if (foundMovie) {
        window.location.pathname = `/${movie.id}`
        return foundMovie
      }
    })
    movie ? this.props.addMovie(movie) : this.errorMessage()
  }

  clearInput = () => {
    this.setState({query: ''})
  }

  errorMessage = () => {
    this.setState({error: true})
    setTimeout(this.clearMessage, 4000)
  }
  
  clearMessage = () => {
    this.setState({error: false})
  }

  render() {
    return (
      <>
        <fieldset className='filter-container'>        
          <legend>Sort movies by:</legend>
          <div className='rating-sort'> 
            <input type="radio" value="average_rating" id='sort-rating' name="sort" onChange={event => this.handleChange(event)}/>
            <label htmlFor='sort-rating'>Average Rating</label>
          </div>
          <div className='date-sort'>
            <input type="radio" id='sort-newset' value="release_date" name="sort" onChange={event => this.handleChange(event)}/>
            <label htmlFor='sort-newset'>Realease Date</label>
          </div>
          <div className='search-bar'>
            <input
              id='search-input'
              className='search-input'
              type='text' 
              name='query' 
              value={this.state.query} 
              placeholder='Search for a movie here' 
              onChange={event => this.handleChange(event)}
              />
            <label className='hidden' htmlFor='search-input'>movie search by name</label>
            <button className='search-button' onClick={event => this.submitSearch(event)}>Search</button>
          </div>
        </fieldset>
          {this.state.error && <h2 className='search-error-message' >Sorry! No movies were found. Please check that your spelling is correct and try again.</h2>}
      </>
    )
  }
}

export default Search;
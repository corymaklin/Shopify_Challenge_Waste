import React, { Component } from 'react';
import _ from 'lodash';
import './App.css';
import Result from './Result';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      results: []
    };

    this.form = null;
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.favourite = this.favourite.bind(this);
  }

  handleChange(e) {
    this.setState({
        query: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.search(this.state.query);

    e.target.reset();
  }

  handleClick(e) {
    this.search(this.state.query);
  }

  favourite(title, favourited) {

    const newResults = _.map(this.state.results, value => {
      if (value.title === title) {
        value.favourited = !favourited;
        return value;
      }
      return value;
    });

    this.setState({
      results: newResults
    });
  }

  search(query) {
    fetch('https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000')
    .then(response => {
      response.json().then(data => {
          const results = _.filter(data, value => value.keywords.includes(query));

          const r = _.map(results, value => {
              const { body, title } = value;
              const description = body.replace(/&amp;nbsp;/g, " ").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
              const favourited = false;
              
              return {
                title,
                description,
                favourited
              };
          });
         
          this.setState({
              results: r,
              query: ''
          });
      });
    })
    .catch(err => {
        console.log(err);
    });
  }

  render() {
    const results = _.map(this.state.results, (value, index) => {
        return <Result key={index} title={value.title} favourite={this.favourite} description={value.description} favourited={value.favourited}/>
    });

    const favourites = _.map(_.filter(this.state.results, value => value.favourited), (value, index) => {
        return <Result key={index} title={value.title} favourite={this.favourite} description={value.description} favourited={value.favourited}/>
    });

    return (
      <div>
        <h1>Toronto Waste Lookup</h1>
        <form onSubmit={this.handleSubmit} ref={form => this.form = form}>
          <input type='text' onChange={this.handleChange}/>
          <i onClick={this.handleClick} className="fas fa-search"></i>
        </form>
        <div className='results'>
          <ul>
            {results}
          </ul>
        </div>
        <h2>Favourites</h2>
        <ul>
          {favourites}
        </ul>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import axios from 'axios';
import PubSub from 'pubsub-js';

export default class Header extends Component {
  state = { userInput: '' };

  saveInput = (event) => {
    const userInput = event.target.value;
    this.setState({ userInput });
  };

  getDemoData = () => {
    const { userInput } = this.state;
    //"then" is a method of promice
    axios.get(`/github-api/search/users?q=${userInput}`).then(
      (response) => {
        console.log(response.data.items);
        PubSub.publish('returnUserResults', response.data.items);
      },
      (error) => {
        console.log('Failed', error.message);
      }
    );
  };

  render() {
    return (
      <div className="header">
        <h1>Github search</h1>
        <input
          onChange={this.saveInput}
          type="text"
          placeholder="input the id to search"
        />
        <input onClick={this.getDemoData} type="button" value="search" />
      </div>
    );
  }
}

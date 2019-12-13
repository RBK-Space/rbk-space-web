import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class SearchPeople extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postsSearchResult: []
    };
  }

  getData = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    console.log(query);
    var that = this;
    axios(`http://localhost:4000/posts/?query=${query}`).then((result) => {
      console.log(result.data);
      that.setState({
        postsSearchResult: result.data
      });
    });
  };
  componentDidMount() {
    this.getData(this.props);
  }
  componentWillReceiveProps(props) {
    this.getData(props);
  }

  render() {
    return (
      <div>
        {this.state.postsSearchResult.length === 0 ? (
          <div>
            <img
              src='https://flevix.com/wp-content/uploads/2019/07/Ring-Preloader.gif'
              alt=''
            />
          </div>
        ) : (
          <h1>Post Post</h1>
        )}
      </div>
    );
  }
}

export default SearchPeople;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class SearchPeople extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peopleSearchResult: []
    };
  }

  getData = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    console.log(query);
    var that = this;
    axios(`http://localhost:4000/users/?query=${query}`).then((result) => {
      console.log(result.data);
      that.setState({
        peopleSearchResult: result.data
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
        {this.state.peopleSearchResult.length === 0 ? (
          <div>
            {/* <img
              src='https://flevix.com/wp-content/uploads/2019/07/Ring-Preloader.gif'
              alt=''
            /> */}
            <h1>No People found</h1>
          </div>
        ) : (
          <div className='general-wrapper'>
            <h1 id='user-profile-heading'>Users Result</h1>
            {this.state.peopleSearchResult.map((user, index) => (
              <>
                <div className='general' key={index}>
                  <div className='general-border'>
                    <div className='img-social-wrapper'>
                      <div className='user-img'>
                        <img src={user.image} alt='' />
                      </div>
                    </div>
                    <div className='general-info'>
                      <p>
                        Hello! My name is {user.fullName} &amp; I'm from cohort
                        {user.cohort}
                      </p>
                      <p>Employment status: {user.empStat} </p>
                      <Link to={`/profile/${user.userId}`}>
                        <span className='search-profile-link'>
                          Profile Link
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default SearchPeople;

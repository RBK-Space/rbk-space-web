import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TimeAgo from 'react-timeago';
import { Button } from 'antd';

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
  myFunction(e) {
    let dots = document.getElementById('dots' + e);
    let moreText = document.getElementById('more' + e);
    let btnText = document.getElementById('myBtn' + e);

    if (dots.style.display === 'none') {
      dots.style.display = 'inline';
      btnText.innerHTML = 'Read more';
      moreText.style.display = 'none';
    } else {
      dots.style.display = 'none';
      btnText.innerHTML = 'Read less';
      moreText.style.display = 'inline';
    }
  }

  render() {
    console.log(this.state.postsSearchResult);
    return (
      <div>
        {this.state.postsSearchResult.length === 0 ? (
          <div>
            {/* <img
              src='https://flevix.com/wp-content/uploads/2019/07/Ring-Preloader.gif'
              alt=''
            /> */}
            <h1>No Posts found</h1>
          </div>
        ) : (
          <div className='post-wrapper'>
            {this.state.postsSearchResult.map((post, index) => (
              <>
                <div className='post' key={index}>
                  <div className='user-img'>
                    <img src={post.imgUrl} alt='' />
                  </div>
                  <div className='post-data'>
                    <div className='user-time'>
                      <Link to={`/profile/${post.userId}`}>
                        <span className='post-writer'>{post.userName}</span>
                      </Link>
                      <span className='post-date'>
                        <TimeAgo
                          date={`${post.createdAt.substring(0, 19)}-0200`}
                        />
                      </span>
                    </div>
                    <div className='post-body'>
                      <p>
                        {post.postBody
                          .split(' ')
                          .splice(0, 30)
                          .join(' ')}
                        <span id={`dots${post.postId}`}>...</span>
                        <span id={`more${post.postId}`} className='hide'>
                          {post.postBody
                            .split(' ')
                            .splice(30)
                            .join(' ')}
                        </span>
                      </p>
                      {post.postBody.split(' ').length > 30 ? (
                        <Button
                          onClick={(event) => {
                            this.myFunction(event.target.id.substring(5));
                          }}
                          id={`myBtn${post.postId}`}
                        >
                          Read more
                        </Button>
                      ) : null}
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

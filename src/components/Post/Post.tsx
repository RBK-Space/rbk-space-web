import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
import './style.css';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { store } from './../../App';
// import * as postActions from './../../actions/posts';
import { getAllPosts } from './../../actions/posts';
import TimeAgo from 'react-timeago';

interface IPostProps {
  posts?: any;
  getAllPosts?: any;
}

class Post extends Component<IPostProps> {
  myFunction(e: any) {
    let dots: HTMLElement = document.getElementById('dots' + e)!;
    let moreText: HTMLElement = document.getElementById('more' + e)!;
    let btnText: HTMLElement = document.getElementById('myBtn' + e)!;

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

  componentDidMount = async () => {
    const { getAllPosts } = this.props;
    getAllPosts();
  };

  render() {
    const { posts } = this.props;
    console.log(store.getState());
    if (posts.length > 0) console.log(posts[0][0].createdAt);
    return (
      <>
        {posts.length > 0 ? (
          <div>
            <div className='post-wrapper'>
              {posts[0].map((post: any, index: any) => (
                <div className='post' key={index}>
                  <div className='user-img'>
                    <img src={post.imgUrl} alt='' />
                  </div>
                  <div className='post-data'>
                    <div className='user-time'>
                      <span className='post-writer'>{post.userName}</span>
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
                          onClick={(event: React.MouseEvent<HTMLElement>) => {
                            this.myFunction(
                              (event.target as HTMLElement).id.substring(5)
                            );
                          }}
                          id={`myBtn${post.postId}`}
                        >
                          Read more
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>Nothing to show</div>
        )}
      </>
    );
  }
}
const mapStateToProps = (state: any) => ({
  posts: state.allPostsReducer.posts
});

// const mapDispatchToProps = (dispatch: any) => {
//   return bindActionCreators(postActions, dispatch);
// };

// Actions
const mapDispatchToProps = {
  getAllPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);

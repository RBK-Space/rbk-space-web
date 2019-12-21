import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { getAllPosts } from './../../actions/posts';
import TimeAgo from 'react-timeago';
import './style.css';

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
    return (
      <>
        {posts && posts.length > 0 ? (
          <div>
            <div className='post-wrapper'>
              {posts.map((post: any, index: any) => (
                <div className='post' key={index}>
                  <div className='user-img'>
                    <img src={post.imgUrl} alt='' />
                  </div>
                  <div className='post-data'>
                    <div className='user-time'>
                      <Link to={`/api/profile/${post.userId}`}>
                        <span className='post-writer'>{post.fullName}</span>
                      </Link>
                      <span className='post-date'>
                        <TimeAgo
                          date={`${post.createdAt.substring(0, 19)}`}
                        />
                      </span>
                    </div>
                    {post.postType === 1 ? (
                      <div className='post-body'>
                        <img src={post.postBody} alt='' className='post-img' />
                      </div>
                    ) : (
                      <div className='post-body'>
                        <p>
                          {post.postBody
                            .split(' ')
                            .splice(0, 30)
                            .join(' ')}
                          <span id={`dots${post.postId}`}></span>
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
                    )}
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

const mapDispatchToProps = {
  getAllPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);

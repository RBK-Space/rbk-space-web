import React, { Component } from 'react';
import './style.css';
import { Button } from 'antd';

class Post extends Component {
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

  render() {
    return (
      <div>
        <div className='post-wrapper'>
          <div className='post'>
            <div className='user-img'>
              <img src='https://via.placeholder.com/100/100' alt='' />
            </div>
            <div className='post-data'>
              <div className='user-time'>
                <span className='post-writer'>Kareem</span>
                <span className='post-date'>date</span>
              </div>
              <div className='post-body'>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Libero eius repellat nam quo, illo assumenda dolorem expedita
                  vitae eum, culpa odit, delectus esse corporis veniam eligendi
                  atque rerum. Omnis, rerum!
                  <span id={`dots${51}`}>...</span>
                  <span id={`more${51}`} className='hide'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quibusdam suscipit architecto ducimus consectetur fuga nam
                    sunt, magni incidunt corrupti consequatur blanditiis officia
                    aut. Aspernatur corrupti, odio aperiam eveniet quidem ex?
                  </span>
                </p>
                <Button
                  onClick={(event: React.MouseEvent<HTMLElement>) => {
                    this.myFunction(
                      (event.target as HTMLElement).id.substring(5)
                    );
                  }}
                  id={`myBtn${51}`}
                >
                  Read more
                </Button>
              </div>
            </div>
          </div>
          <div className='post'>
            <div className='user-img'>
              <img src='https://via.placeholder.com/100/100' alt='' />
            </div>
            <div className='post-data'>
              <div className='user-time'>
                <span className='post-writer'>Kareem</span>
                <span className='post-date'>date</span>
              </div>
              <div className='post-body'>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Libero eius repellat nam quo, illo assumenda dolorem expedita
                  vitae eum, culpa odit, delectus esse corporis veniam eligendi
                  atque rerum. Omnis, rerum!
                  <span id={`dots${52}`}>...</span>
                  <span id={`more${52}`} className='hide'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quibusdam suscipit architecto ducimus consectetur fuga nam
                    sunt, magni incidunt corrupti consequatur blanditiis officia
                    aut. Aspernatur corrupti, odio aperiam eveniet quidem ex?
                  </span>
                </p>
                <Button
                  onClick={(event: React.MouseEvent<HTMLElement>) => {
                    this.myFunction(
                      (event.target as HTMLElement).id.substring(5)
                    );
                  }}
                  id={`myBtn${52}`}
                >
                  Read more
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;

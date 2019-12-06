import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faTwitter,
  faLinkedin,
  faGithub
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';

library.add(fas, faFacebookF, faTwitter, faLinkedin, faGithub);

class Sidebar extends Component {
  render() {
    return (
      <div className='home-page'>
        <aside>
          <div className='user-img'>
            <img
              src='http://pronksiapartments.ee/wp-content/uploads/2015/10/placeholder-face-big.png'
              alt=''
            />
          </div>
          <span className='user-name'>Kareem Abdelwahed</span>
          <ul className='social-links'>
            <li className='social-item'>
              <a href='#'>
                <FontAwesomeIcon icon={faGithub} color='#211F1F' size='2x' />
              </a>
            </li>
            <li className='social-item'>
              <a href='#'>
                <FontAwesomeIcon icon={faFacebookF} color='#3b5998' size='2x' />
              </a>
            </li>
            <li className='social-item'>
              <a href='#'>
                <FontAwesomeIcon icon={faLinkedin} color='#0e76a8' size='2x' />
              </a>
            </li>
            <li className='social-item'>
              <a href='#'>
                <FontAwesomeIcon icon={faTwitter} color='#1da1f2' size='2x' />
              </a>
            </li>
          </ul>
          <span className='bio'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
            hic distinctio laborum, possimus, sunt, fuga nesciunt sed laudantium
            eaque dolores consectetur odit dicta!
          </span>
          <span className='employment-status'>Employed</span>
          <span className='edit-profile'>
            <a href='#'>
              <FontAwesomeIcon icon={faUserEdit} color='#000' size='lg' />
              <span className='edit-profile-text'>Edit Profile</span>
            </a>
          </span>
        </aside>
      </div>
    );
  }
}

export default Sidebar;

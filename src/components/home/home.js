import React, { Component } from 'react';
import { css } from 'glamor';
import './home.css';

const baseurl = process.env.REACT_APP_SUB_URL;

class Home extends Component {
  render() {
    const home__image__Css = css({
      backgroundImage: `url(${baseurl}/images/traffic-blurred.jpg)`,
    });

    return (
      <div className="home">
        <div {...home__image__Css} className="home__image">
          <div className="home__image--text">PROJECT NAME HERE</div>
        </div>
        <div className="home__detail content-contained">
          <div>some text about why u want this</div>
          <div>some more text about why you want to give us money</div>
          <div>about the project</div>
          <div>this is amazing</div>
          <div>huge image of me here, very important</div>
        </div>
      </div>
    );
  }
}

export default Home;

import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Navbar from './components/other/Navbar';
import Home from './components/other/Home';
import Farmer from './components/farmer/Farmer';
import Vendor from './components/vendor/Vendor';

export default class Routes extends Component {
  render () {
    return (
      <BrowserRouter>
        <Navbar />
        <Route exact path="/" component={ Home } />
        <Route path="/farmer" component={ Farmer } />
        <Route path="/vendor" component={ Vendor } />
      </BrowserRouter>
    );
  };
}

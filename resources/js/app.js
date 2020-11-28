/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';


import Master from './components/Master';
import CreateKaryawan from './components/CreateKaryawan';
import DisplayKaryawan from './components/DisplayKaryawan';
import UpdateKaryawan from './components/UpdateKaryawan';


render(
  <Router history={browserHistory}>
  	<div>
      <Route path="/" component={Master} >
        <Route path="/add-item" component={CreateKaryawan} />
        <Route path="/display-item" component={DisplayKaryawan} />
        <Route path="/edit/:iKaryawanId" component={UpdateKaryawan} />
      </Route>
      </div>
    </Router>,
        document.getElementById('crud-app'));



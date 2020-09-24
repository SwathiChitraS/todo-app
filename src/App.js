import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Layout from './components/Layout/Layout';
import ToDoComponent from './containers/ToDoComponent';
import AddItem from './containers/AddItem/AddItem';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route exact path="/add-item" component={AddItem}></Route>
          <Route exact path="/search" component={ToDoComponent}></Route>
          <Route path="/" component={ToDoComponent}></Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;

import React, {Component} from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Home from "./components/home";
import History from "./components/history";
import Players from "./components/players";
import Login from "./components/login";
import Gallery from "./components/gallery";
import PlayerRankingsForm from "./components/player-rankings-form";

import "./styles/all.styl"

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Header />
          <Switch>
            <Route path="/history" component={History} />
            <Route path="/players" component={Players} />
            <Route path="/login"  component={Login} />
            <Route path="/gallery"  component={Gallery} />
            <Route path="/rankings"  component={PlayerRankingsForm} />
            <Route path="/" component={Home} />
          </Switch>
          <Footer/>
        </Router>
      </div>
    );
  }
}

// function App() {
//   return (
//     <Router>
//       <Route path="/" exact component={Home} />
//       <Route path="/history" component={History} />
//       <Route path="/players" component={Players} />
//       <Route path="/login"  component={Login} />
//       <Route path="/gallery"  component={Gallery} />
//     </Router>
//   )
// }

export default App;
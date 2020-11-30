import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Header from "./components/common/header";
import Footer from "./components/common/footer";
import Home from "./components/home";
import History from "./components/history";
import Players from "./components/players";
import Admin from "./components/admin/admin";
import Gallery from "./components/gallery";
import Profile from "./components/profile";

const App = () => (
  <div className="ca-eagles">
    <Router>
      <Header />
      <div className="content-wrapper">
        <Switch>
          <Route path="/history" component={History} />
          <Route path="/players" component={Players} />
          <Route path="/admin" component={Admin} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/:id" component={Profile} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
      <Footer />
    </Router>
  </div>
);

export default App;

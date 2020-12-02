import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Header from "./components/common/header";
import Footer from "./components/common/footer";
import Home from "./components/pages/home";
import Players from "./components/pages/players";
import Admin from "./components/admin/admin";
import Gallery from "./components/pages/gallery";
import Profile from "./components/pages/profile";
import About from "./components/pages/about";
import Schedule from "./components/pages/schedule";
import Results from "./components/pages/results";

const App = () => (
  <div className="ca-eagles">
    <Router>
      <Header />
      <div className="content-wrapper">
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/players" component={Players} />
          <Route path="/admin" component={Admin} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/schedule" component={Schedule} />
          <Route path="/results" component={Results} />
          <Route path="/:id" component={Profile} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
      <Footer />
    </Router>
  </div>
);

export default App;

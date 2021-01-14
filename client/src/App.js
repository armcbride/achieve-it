import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Footer from "./components/Layouts/Footer";
import Navbar from "./components/Layouts/Navbar";
import Dashboard from "./components/Pages/Dashboard";
import Login from "./components/Pages/Login";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div className="App">
        <React.Fragment>
          <Router>
            <CssBaseline />
            <Navbar />

            <Route path="/dashboard/" component={Dashboard} />
            {/* <Route path="/dashboard/goals" component={Dashboard} /> */}
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/" component={Login} />

            <Footer />
          </Router>
        </React.Fragment>
      </div>
    </>
  );
}

export default App;

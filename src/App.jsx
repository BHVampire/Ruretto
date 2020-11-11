import { Fragment, useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Error from "./components/alerts/Error";
import Loading from "./components/alerts/Loading";
import NotFound from "./components/alerts/NotFound";
import Dashboard from "./components/layout/Dashboard";
import Navbar from "./components/layout/Navbar";
import { DataContext } from "./store/DataProvider";

function App() {
  const { isLoading, error } = useContext(DataContext)
  return (
    <Fragment>
      {
        error
          ?
          <Error />
          :
          isLoading
            ?
            <Loading />
            :
            <Router>
              <Switch>

                <Route path={`/:pageID`}>
                  <Navbar />
                  <Dashboard />
                </Route>

                <Route path={`/`}>
                  <Navbar />
                  <Dashboard />
                </Route>

                <Route>
                  <Navbar />
                  <NotFound />
                </Route>

              </Switch>
            </Router>
      }

    </Fragment >
  );
}

export default App;
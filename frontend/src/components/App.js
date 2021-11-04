import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Shorten from "./Shorten";
import HandleRedirect from "./HandleRedirect";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Shorten />
        </Route>
        <Route exact path="/redirect/:hash">
          <HandleRedirect />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
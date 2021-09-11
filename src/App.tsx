import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import PlayIndex from "./pages/play";
import UtilityIndex from "./pages/utility";

function App() {

  const target = "A";
  const dependencies = {
    "A": ["B", "C"],
    "B": ["C"],
    "C": ["D"],
    "D": []
  }

  packageTest(target, dependencies);

  return (
    <div className="App">
      <BrowserRouter>
            <Switch>
                <Route path={"/utility/"}>
                    <UtilityIndex />
                </Route>
                <Route path={"/play"}>
                    <PlayIndex />
                </Route>
                <Route exact path={'/'}>
                    <div>
                      <h1>React Man</h1>
                        <div>
                          <Link to={'/play'}>Play</Link>
                        </div>
                        <div>
                          <Link to={'/utility'}>Utilities</Link>
                        </div>
                    </div>
                </Route>
            </Switch>
        </BrowserRouter>
    </div>
  );
}

function packageTest(target: string, dependencies: {[target: string]: string[]}) {
  console.log("PACKAGE TEST");

  const d = dependencies[target];
  console.log(d);
}

export default App;

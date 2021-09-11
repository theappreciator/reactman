import {
    BrowserRouter,
    Switch,
    Route,
    useLocation,
    Link,
  } from "react-router-dom";
import MapConvert from "./BoardConvert";

const UtilityIndex: React.FunctionComponent = () => {

    const location = useLocation();
    const path = location.pathname;

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={`/utility/convert`}>
                    <MapConvert />
                </Route>
                <Route>
                    <div>
                        <h1>Utility Page</h1>
                        <Link to={`${path}/convert`}>Convert Maps</Link>
                    </div>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default UtilityIndex;
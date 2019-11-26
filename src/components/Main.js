import React from 'react';
import {Route, Switch} from "react-router";
import {FavoritesPage, HomePage,DetailsPage} from "../pages";

function Main(props) {
    return (
        <div>
            <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route exact path="/favoriler" component={FavoritesPage}/>
              <Route exact path="/details/:id" component={DetailsPage}/>
            </Switch>
        </div>
    );
}

export default Main;

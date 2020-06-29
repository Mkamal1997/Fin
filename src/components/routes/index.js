import { useKeycloak } from '@react-keycloak/web';

import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Contact from "../ContactComponent";
import SignUp from "../SignUpComponent";
import About from "../AboutComponent";
import Phase1 from "../Phase1";
import Phase2 from "../Phase2";
import Phase3 from "../Phase3";
import Phase4 from "../Phase4";
import UserInfo from "../UserInfo";
import HomeComponent from '../HomeComponent';
import ProjectsMenu from '../ProjectsMenu';
import Profile from '../Profile';
import EspaceAdmin from '../espaceAdmin/EspaceAdmin';
import EspaceCP from "../EspaceCP";
import EspaceCD from "../EspaceCD";
import EspaceClient from "../EspaceClient";
import {PrivateRoute} from '../utilities/PrivateRoute'

export const AppRouter = () => {
    const [, initialized] = useKeycloak();
    if (!initialized) {
        return <h3>Loading ... !!!</h3>;
    }
    return (<>
        
        <BrowserRouter>
            <Switch>
            <Route exact path="/" component={HomeComponent} />
            <Route exact path="/projectsMenu" component={() => <ProjectsMenu />} />
            <Route exact path="/contactus" component={Contact} />
            <Route exact path="/signUp" component={SignUp} />
            <PrivateRoute roles={['PorteurProjet']} path="/depot" component={() => <Phase1 />} />
            <Route exact path="/depot1" component={() => <Phase1 />} />
            <Route exact path="/depot2" component={() => <Phase2 />} />
            <Route exact path="/depot3" component={() => <Phase3 />} />
            <Route exact path="/depot4" component={() => <Phase4 />} />
            <Route exact path="/espaceChargéPrésélection" component={EspaceCP} />
            <Route exact path="/espaceAdmin" component={EspaceAdmin} />
            <Route exact path="/espacePersonnelCD" component={EspaceCD} />
            <Route exact path="/espaceClient" component={EspaceClient} />
            <Route exact path="/profile" component={UserInfo} />
            <Redirect to="/" />
            </Switch>
        </BrowserRouter>
    </>
    );
}
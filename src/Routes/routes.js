import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Logon from '../pages/Logon';

import Register from '../pages/Register';

import Profile from '../pages/Profile';

import CheckMail from '../pages/CheckMail';

import Recovery from '../pages/Recovery';

import Update from '../pages/Update';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />

                <Route path="/register" component={Register} />

                <Route path="/profile" component={Profile} />

                <Route path="/email/:id" component={CheckMail} />

                <Route path="/recovery" component={Recovery} />

                <Route path="/update/:id" component={Update} />
            </Switch>  
        </BrowserRouter>
    );
}

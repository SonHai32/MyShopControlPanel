import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {UserContext} from './components/context/UserContext'

import Login from './components/auth/Login'
import Products from './components/products/products.component'

const Index = () =>{
    const [user, setUser] = useState(null)
    return(
        <UserContext.Provider value={[user, setUser]}>
            <Router>
                <Switch>
                    <Route exact path='/' component={App} />
                    <Route path='/Login' component={Login} />
                    <Route path='/Products' component={Products} />
                </Switch>
            </Router>
        </UserContext.Provider>
        
    )
}


ReactDOM.render(<Index />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

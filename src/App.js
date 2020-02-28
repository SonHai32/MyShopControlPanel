import React, {useContext, useEffect}  from 'react';
import {useHistory} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {UserContext} from './components/context/UserContext'
import Header from './components/Header/Header'
import Content from './components/Contents/Content'

function App() {
  
  const [user, setUser] = useContext(UserContext)
  let history = useHistory() 

    useEffect(() =>{
      if(!user){
        history.push('/Login')
      }
    }, [])

  return (
      <div className="App">
        {user ?
        <React.Fragment>
          <Header user={user} />
          <Content />
        </React.Fragment> 
        
        : ''}
      </div>
  )
}

export default App;

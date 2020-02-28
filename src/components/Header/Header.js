import React, {useContext} from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';

const Header = (props) =>{
    
    const style={
        header: {
            width: '100%',
            height: 80,
            zIndex: 1000
        },
        avatar:{
            width: 48,
            height: 48,
            background: '#f8f8f8'
        },
        logo: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)'
        }
    }

    const user = props.user


    return(
        <div className='header position-fixed d-flex align-items-center justify-content-end bg-dark' style={style.header}>
            <div className='Admin-info d-inline d-flex align-items-center mr-5' style={style.adminInfo} >
                <div className='user-avavtar d-inline rounded-circle' style={style.avatar} />
                <span className='username text-light ml-3'>{user.username}</span>
            </div>
            <div className="logo position-absolute" style={style.logo}>
                <h1 className='text-danger'>CONTROL PANEL</h1>
            </div>
        </div>
    )
}    


export default Header;
import React from 'react';

import {Modal, Button} from 'react-bootstrap'



const Notification = (props) =>{

    

    return(
        <Modal 
            {...props}
        >
            <Modal.Header>
                <Modal.Title>
                    {props.notification.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.notification.message}
            </Modal.Body>
            <Modal.Footer>
                <Button variant='danger' onClick={props.onHide}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Notification
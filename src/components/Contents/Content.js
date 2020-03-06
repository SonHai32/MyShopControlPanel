import React from 'react'
import {Card, Button} from 'react-bootstrap'
import { useState } from 'react'



import AddProductModal from '../Modals/AddProductModal'
import productListModal from '../Modals/ProductLstModal'
import ProductListModal from '../Modals/ProductLstModal'

const Content = () =>{

    const style={
        controlList: {
            top: '50%',
            left: '50%',
            transform : 'translate(-50%,-50%)'
        }
    }

    const [productListModal, setProductListModal] = useState(false);
    const [addProductModal, setAddProductModal]   = useState(false);

    return(
        <div className="content h-auto min-vw-100  bg-info ">
            <div className="control-list position-absolute w-50 h-auto bg-light" style={style.controlList}>
              <Card>
                <Card.Header>
                  <Button block variant='info' onClick={() => setAddProductModal(true)} >Thêm Sản Phẩm</Button>
                </Card.Header>
              </Card>
              <Card>
                <Card.Header>
                  <Button block variant='info' onClick={() => setProductListModal(true)}>Danh Sách Sản Phẩm</Button>
                </Card.Header>
              </Card>
              <Card>
                <Card.Header>
                  <Button block variant='info'>OK</Button>
                </Card.Header>
              </Card>
              {addProductModal ?

                <AddProductModal show={addProductModal} onHide={() => setAddProductModal(false)} />
             : ''}
             {productListModal ? 
             
                <ProductListModal show={productListModal} onHide={() => setProductListModal(false)} />
             : ''}
            </div>
        </div>
    )
}

export default Content;
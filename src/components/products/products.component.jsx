import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Card} from 'react-bootstrap'

import './products.style.scss'

import Notification from '../Modals/Notification'
import ProductItem from '../product-item/product-item.coponent'
const Products = ()  =>{

    const [products, setProducts] = useState([]);
    const [notification, setNotification] = useState();
    const [notificationModal, setNotificationModal] = useState(false);



    useEffect(() =>{
        const fetchProductData = () =>{
            axios.get('http://localhost:1337/api/products')
                .then(res => {
                    if(res.data){
                        setProducts(res.data)
                    }else{
                        setNotification({title: 'ERROR', massage: res.message});
                        setNotificationModal(true)
                    }
                })
                .catch(err =>{
                    setNotification({title: 'ERROR', message: err.message})
                    setNotificationModal(true)
                })
        }

        fetchProductData()

    }, [])

    const deleteProduct = productId =>{
        axios.delete(`http://localhost:1337/api/products?productId=${productId}`)
            .then(res =>{
                if(res.data.success){
                    setNotification({title: 'Hoàn Thành', mesmess: 'Xoá Thành Công'})
                    setNotificationModal(true);

                    setProducts(products.filter(product => product.productId !== productId))
                }
            })
            .catch(err =>{
                console.log(err)
            })
    }

    return(
        <div className="products container-fluid h-100" >
            <div className="product-list row align-items-center">
                {products ? (
                    products.map((product, key) =>(
                        <ProductItem key={key} product={product} deleteProduct={deleteProduct}/>
                    ))
                ) : ''}
            </div>
                {notification ? 
                
                    <Notification show={notificationModal} notification={notification} onHide={() => setNotificationModal(false)} />
                : ''}
        </div>
    )
}

export default Products
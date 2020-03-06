import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Spinner, Accordion, Card,Button, Image, InputGroup, FormControl, DropdownButton, Dropdown, Form } from "react-bootstrap";

const ProductListModal = props => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notifiction, setNotification] = useState();
  const [searchInput, setSearchInput] = useState('')
  const [sort, setSort] = useState({
    name: 'A-Z',
    price: 'higher',
  })
  useEffect(() => {
    const getData = () => {
      setIsLoading(true);
      axios
        .get("http://localhost:1337/api/products")
        .then(result => {
          if (result.data) {
            setIsLoading(false);
            return setProducts(result.data);
          }
        })
        .catch(err => {
          setIsLoading(false);
          setNotification({ title: "ERROR", message: err.mesage });
        });
    };
    getData();
  }, []);

  const displayProduct = React.Children.toArray(
    products.map((item, index) => {
      return (
        <div className="product-item w-100 d-flex align-items-center border border-darken-1 rounded my-2" style={{height: "300px"}}>
            <Image src={`http://localhost:1337/${item.image_link}`} fluid rounded style={{width: 48, height: 48}} className='product-image ml-3' />
            <div className="product-info w-50 d-flex flex-column ml-4 float-left">
                <h4 className='h-50'>{item.name}</h4>
                <span className='h-50'>{item.productId}</span>
            </div>
            <div className="product-method ml-5  d-flex" >
                <Button variant='outline-success' className='mr-2'>
                   SỬA
                </Button>
                <Button variant='outline-danger' className='ml-2'>
                    XOÁ
                </Button>
            </div>
        </div> 
      );
    })
  );
    const searchProduct = (event) =>{
        const currentProducts = products;
        const regex = new RegExp(event.target.value, 'gi');

        const searchResult = currentProducts.reduce((acc, product) =>{
          if(product.name && product.name.match(regex)){
            acc.push(product)
          }
          return acc;

        }, [])


    }
  return (
    <Modal 
        centered
    {...props}
        size='lg' 
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title">
      <Modal.Header closeButton >
        {products? console.log(products) : ''}
        <Modal.Title >Danh Sách Sản Phẩm</Modal.Title>
         </Modal.Header>
      <Modal.Body
        className=" d-flex flex-column justify-content-center align-items-center "
        style={{'maxHeight': 'calc(100vh - 350px)', 'overflowY': 'auto'}}
      >
        {isLoading ? (
          <Spinner animation="border" variant="danger" />
        ) : products ? (
        displayProduct
        ) : (
          <h2>Không có sản phẩm nào</h2>
        )}
      </Modal.Body>
      <Modal.Footer>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text className='bg-danger text-light'> 
              Bộ Lọc
            </InputGroup.Text>
          </InputGroup.Prepend>
          <DropdownButton
            as={InputGroup.Prepend}
            title='Lọc Theo Tên'
            variant='success'
          >
          
            <Dropdown.Item as='button'  active={sort.name.includes('A-Z')} onClick={() => setSort({...sort, name: 'A-Z'})}>
              Sắp xếp từ A-Z
            </Dropdown.Item>
            <Dropdown.Item as='button' active={sort.name.includes('Z-A')} onClick={() => setSort({...sort, name: 'Z-A'})} >
              Sắp xếp từ Z-A
            </Dropdown.Item>
            </DropdownButton>
           <DropdownButton
            as={InputGroup.Prepend}
            title='Lọc Theo Giá'
            variant='success'
          >
               <Dropdown.Item as='button' active={sort.price.includes('higher')} onClick={() => setSort({...sort, price: 'higher'})} >
              Giá tăng dần
            </Dropdown.Item>
               <Dropdown.Item as='button' active={sort.price.includes('lower')} onClick={() => setSort({...sort, price: 'lower'})} >
              Giá giảm dần 
            </Dropdown.Item>
            </DropdownButton> 
        </InputGroup>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductListModal;

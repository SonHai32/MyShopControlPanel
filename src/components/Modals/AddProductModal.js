import React, { useState } from "react";
import axios from "axios";

import {
  Modal,
  Button,
  Form,
  Container,
  Image,
  Row,
  Col
} from "react-bootstrap";

import Notification from "./Notification";

const AddProductModal = props => {
  const [images, setImages] = useState([]);
  const [productName, setProductName] = useState("");
  const [productId, setProductId] = useState("");
  const [collectionId, setCollectionId] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDiscount, setProductDiscount] = useState("");

  const [notificationModal, setNotificationModal] = useState(false);
  const [notification, setNotification] = useState();

  const closeModal = () => {
    props.onHide();
    setImages([]);
  };

  const handleImagesChange = event => {
    event.preventDefault();
    let files = event.target.files;

    let imagesUpload = [];

    const dataHandle = file => {
      return new Promise((reslove, reject) => {
        const reader = new FileReader();
        setNotification(null);

        reader.onloadend = () => {
          if (imageSizeLimit(file)) {
            if (isImage(file)) {
              reslove({ image: file, imageReader: reader.result });
            } else {
              reject({ message: "Ảnh Phải Có Đuôi Dạng .jpg/.png" });
            }
          } else {
            reject({ message: "Kích Thước File Không Được Vượt Quá 5MB" });
          }
        };

        reader.readAsDataURL(file);
      });
    };

    for (let i = 0; i < files.length; i++) {
      dataHandle(files[i])
        .then(image => {
          imagesUpload.push(image);
        })
        .catch(err => {
          setNotification({title: 'ERROR', message: err.message});
          setNotificationModal(true)
        });
    }

    setTimeout(() => {
      setImages(imagesUpload);
    }, 100);
  };

  const isImage = file => {
    console.log(file.type)
    return file.type === "image/png" || file.type === "image/jpeg";
  };

  const imageSizeLimit = file => {
    const limits = 5 * 1024 * 1024;

    return file.size <= limits;
  };

  const ShowImage = React.Children.toArray(
    images.map((item, index) => {
      return (
        <Col xs={3} md={3} className="image-item d-flex align-items-center">
          <Image
            src={item.imageReader}
            rounded
            style={{ width: "120px", height: "120px" }}
          />
        </Col>
      );
    })
  );

  const handleInputChange = event => {
    switch (event.target.name) {
      case "name":
        setProductName(event.target.value);
        break;
      case "productId":
        setProductId(event.target.value);
        break;
      case "collectionId":
        setCollectionId(event.target.value);
        break;
      case "price":
        setProductPrice(event.target.value);
        break;
      case "discount":
        setProductDiscount(event.target.value);
      default:
        return;
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (
      productName &&
      productId &&
      productPrice &&
      productDiscount &&
      images.length >= 4  
    ) {
      let imageFiles = [];
      images.forEach(image => {
        imageFiles.push(image.image);
      });

      let formData = new FormData();
      formData.append("name", productName);
      formData.append("collectionId", collectionId);
      formData.append("productId", productId);
      formData.append("price", productPrice);
      formData.append("discount", productDiscount);

      await imageFiles.forEach((file, index) => {
        formData.append(`file${index}`, file);
      });

      console.log(formData)

      axios
        .post("http://localhost:1337/api/Products", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(result => {
          if(result.data.success){
            setNotification({title: 'Thông Báo', message: 'Thêm Đơn Hàng Thành Công ✨'});
            setNotificationModal(true);
            
            clearFormData()
          }else{
            setNotification({title:'ERROR', message: result.data.message})
            setNotificationModal(true)
          }
        })
        .catch(err => {
          setNotification({title:'ERROR', message: err.message})
          setNotificationModal(true)
        });
    } else {
      setNotification({ title:'ERROR',message: "Bạn Chưa Nhập Đầy Đủ Thông Tin Sản Phẩm" });
      setNotificationModal(true)
    }
  };

  const clearFormData = () =>{
    setCollectionId('');
    setProductId('');
    setProductName('');
    setProductDiscount('');
    setProductPrice('');
    setImages([]);
  }

  return (
    <React.Fragment>
      <Modal
        {...props}
        size="lg"
        centered
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm Sản Phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicProductName">
              <Form.Label>Tên Sản Phẩm</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={handleInputChange}
                value={productName}
              />
            </Form.Group>
            <Form.Group controlId="formBasicProductId">
              <Form.Label>Mã Sản Phẩm</Form.Label>
              <Form.Control
                type="text"
                name="productId"
                onChange={handleInputChange}
                value={productId}
              />
            </Form.Group>
            <Form.Group controlId="formBasicCollectionId">
              <Form.Label>Mã Danh Mục</Form.Label>
              <Form.Control
                type="text"
                name="collectionId"
                onChange={handleInputChange}
                value={collectionId}
              />
            </Form.Group>
            <Form.Group controlId="formBasicProductPrice">
              <Form.Label>Giá Sản Phẩm</Form.Label>
              <Form.Control
                type="number"
                name="price"
                onChange={handleInputChange}
                value={productPrice}
              />
            </Form.Group>
            <Form.Group controlId="formBasicProductDiscount">
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type="number"
                name="discount"
                onChange={handleInputChange}
                value={productDiscount}
              />
            </Form.Group>
            <Form.Group controlId="formBasicImage">
              <Form.Label>Ảnh Sản Phẩm (Ít nhất 4 ảnh)</Form.Label>
              <Form.Control
                type="file"
                name="images"
                multiple
                onChange={handleImagesChange}
              />
            </Form.Group>
          </Form>
          {images.length > 0 ? (
            <Container className="images-upload">
              <Row className="list-image d-flex justify-content-between align-items-center">
                {ShowImage}
              </Row>
            </Container>
          ) : (
            ""
          )}
          <Modal.Footer>
            <Button variant="danger" onClick={closeModal}>
              Huỷ
            </Button>
            <Button variant="success" onClick={handleSubmit}>
              Thêm
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
      {notification ? <Notification show={notificationModal} onHide={() => setNotificationModal(false)} notification={notification}  />   : ''}
    </React.Fragment>
  );
};

export default AddProductModal;

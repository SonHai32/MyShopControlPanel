import React from "react";

import { Card, Button, Image } from "react-bootstrap";

import "./product-item.style.scss";

const ProductItem = props => {
  const displayPriceVND = originalPrice => {
    const priceNumberToString = originalPrice.toString();

    const priceReverse = priceNumberToString
      .split("")
      .reverse()
      .join("");

    let pricePart = [];

    for (let i = 0; i <= priceReverse.length / 3; i++) {
      let part = priceReverse.slice(i * 3);
      if (part.length > 3) {
        pricePart.push(part.slice(0, 3) + ".");
      } else {
        pricePart.push(part);
      }
    }

    return pricePart
      .join("")
      .split("")
      .reverse()
      .join("") + " Đ ";
  };

  const {
    _id,
    productId,
    collectionId,
    image_link,
    name,
    price
  } = props.product;

  return (
    <div className="product-item col-lg-3 col-md-4 col-sm-12 col-12  p-2">
      <Card style={{ width: "100%", height: "100%" }}>
        <Card.Header className="bg-info">
          <Card.Title>{name}</Card.Title>
        </Card.Header>
        <Card.Body className="d-flex justify-content-between align-items-center justify-content-between">
          <div className="product-contents d-flex justify-content-between align-items-center h-75 w-100">
            <div className="image w-50 h-100 d-flex justify-content-center align-items-center">
              <Image
                className="product-image"
                src={`http://localhost:1337/${image_link}`}
              />
            </div>
            <div className="info w-50 d-flex flex-column">
              <h3>{name}</h3>
              <span>{productId}</span>
              <span>{displayPriceVND(price)}</span>
            </div>
          </div>
        </Card.Body>
        <Card.Footer className="bg-light">
          <Button variant="outline-success" className="product-edit-option m-1">
            Sửa
          </Button>
          <Button
            variant="outline-danger"
            className="product-delete-option m-1"
            onClick={() => props.deleteProduct(productId)}
          >
            Xoá
          </Button>
          <Button
            variant="outline-primary"
            className="product-show-info-option m-1"
          >
            Chi tiết
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default ProductItem;

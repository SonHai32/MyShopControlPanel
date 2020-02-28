import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Spinner } from "react-bootstrap";

import { UserContext } from "../context/UserContext";
import Notification from "../Contents/Modals/Notification";

import dotenv from "dotenv";

dotenv.config();

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useContext(UserContext);
  const [notification, setNotification] = useState();
  const [notificationModal, setNotificationModal] = useState(false);

  let history = useHistory();

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  });

  const handleChange = event => {
    switch (event.target.name) {
      case "username":
        setUsername(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      default:
        break;
    }
  };

  const isFormValid = (username, password) => {
    return username && password;
  };

  const loginHandle = event => {
    event.preventDefault();
    if (isFormValid(username, password)) {

      setLoading(true);
     
      axios
        .post(`http://localhost:1337/auth/login`, {
          username: username,
          password: password
        })
        .then(res => {
          console.log(res);
          if (res.data.success) {
            const token = res.data.token;
            axios
              .get(`http://localhost:1337/api/users?token=${token}`)
              .then(res => {
                if (res.data) {
                  setUser(res.data);
                  history.push("/");
                } else {
                  console.log(res);
                }
              })
              .catch(err => {
                setNotification({ title: "ERROR", message: err.message });
                setNotificationModal(true);
              });

            setLoading(false);
          } else {
            setNotification({ title: "ERROR", message: res.data.message });
            setNotificationModal(true);
            setLoading(false);
          }
        })
        .catch(err => {
          setLoading(false);
          setNotification({ title: "ERROR", message: "Something Went Wrong" });
          setNotificationModal(true);
        });
    }else{
        setNotification({title: 'ERROR', message: 'Tài Khoản Hoặc Mật Khẩu Không Được Bỏ Trống'})
        setNotificationModal(true);
    }

  };

  return (
    <div className="login-form absolute-center d-flex flex-column align-items-center justify-content-center">
      <Form style={{ width: "100%" }}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="d-block">Username</Form.Label>
          <Form.Control
            name="username"
            type="text"
            size="lg"
            value={username}
            onChange={handleChange}
            placeholder="Enter username"
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label className="d-block">Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            size="lg"
            value={password}
            onChange={handleChange}
            placeholder="Password"
          />
        </Form.Group>
        <Button
          className="btn-block"
          variant="primary"
          onClick={loginHandle}
          disabled={loading}
        >
          {loading ? (
            <Spinner
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            "LOGIN"
          )}
        </Button>
      </Form>
      {notification ? (
        <Notification
          show={notificationModal}
          notification={notification}
          onHide={() => setNotificationModal(false)}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Login;

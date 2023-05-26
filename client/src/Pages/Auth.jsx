import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "../Styles/Auth.module.css";

const Auth = () => {
  const [login, setLogin] = useState(true);

  return (
    <div className={styles.mainform}>
      <div className={styles.buttons_div}>
        <button
          className={styles.buttons}
          onClick={() => {
            setLogin(true);
          }}
          style={login ? { background: "#000", color: "#fff" } : {}}
        >
          Login
        </button>
        <button
          className={styles.buttons}
          onClick={() => {
            setLogin(false);
          }}
          style={login == false ? { background: "#000", color: "#fff" } : {}}
        >
          Register
        </button>
      </div>
      {login ? (
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Button variant="dark" style={{ width: "100%" }} type="submit">
            Login
          </Button>
        </Form>
      ) : (
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Who Are You ?</Form.Label>
            <Form.Select aria-label="Default select example">
              <option>Open this select menu</option>
              <option value="banker">Banker</option>
              <option value="customer">Customer</option>
            </Form.Select>{" "}
          </Form.Group>

          <Button variant="dark" style={{ width: "100%" }} type="submit">
            Register
          </Button>
        </Form>
      )}
    </div>
  );
};

export default Auth;

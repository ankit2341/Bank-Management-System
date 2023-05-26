import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "../Styles/Auth.module.css";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import { LoginSuccess } from "../Provider/Action";

const Auth = () => {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const handleRegister = () => {
    if (email === "" || pass === ""||role==="") {
      alert("please fill all fields");
    } else {
      const payload = {
        email: email,
        password: pass,
        role:role,
        funds:0
      };
      fetch(`${import.meta.env.VITE_SOME_KEY}users/register`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setLogin(true)
          alert("Registration success");
        })
        .catch((err) => {
          console.log(err);
          alert("wrong cred");
        });
    }
  };

  const handleLogin = () => {
    if (email === "" || pass === "") {
      alert("please fill all fields");
    } else {
      const payload = {
        email: email,
        password: pass,
      };
      fetch(`${import.meta.env.VITE_SOME_KEY}users/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          dispatch(LoginSuccess(res))
          alert("login success");
          if (res.role == "banker") {
            navigate("/accounts");
          } else {
            navigate("/transaction");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("wrong cred");
        });
    }
  };

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
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={pass}
              onChange={(e) => {
                setPass(e.target.value);
              }}
              placeholder="Password"
            />
          </Form.Group>

          <Button
            variant="dark"
            onClick={handleLogin}
            style={{ width: "100%" }}
          >
            Login
          </Button>
        </Form>
      ) : (
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={pass}
              onChange={(e) => {
                setPass(e.target.value);
              }}
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Who Are You ?</Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
              }}
            >
              <option>Open this select menu</option>
              <option value="banker">Banker</option>
              <option value="customer">Customer</option>
            </Form.Select>{" "}
          </Form.Group>

          <Button
            variant="dark"
            onClick={handleRegister}
            style={{ width: "100%" }}
          >
            Register
          </Button>
        </Form>
      )}
    </div>
  );
};

export default Auth;

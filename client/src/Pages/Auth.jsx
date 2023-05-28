import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "../Styles/Auth.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginSuccess } from "../Provider/Action";
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/esm/Spinner";

const Auth = () => {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userdata = useSelector((store) => store.AuthReducer.userData);

  if (userdata != "") {
    toast.warn("Already logged in logout to access page");
    return (
      <div style={{ width: "100%", marginTop: "100px", textAlign: "center" }}>
        Altready logged in logout first
      </div>
    );
  }

  const handleRegister = () => {
    if (email === "" || pass === "" || role === "") {
      alert("please fill all fields");
    } else {
      const payload = {
        email: email,
        password: pass,
        role: role,
        funds: 0,
      };
      // console.log(payload)
      setLoading(true);
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
          setLogin(true);
          setLoading(false);
          if (res.msg == "already registered") {
            toast.warn("Already registered");
          } else {
            toast.success("Registration success");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to register");
          setLoading(false);
          toast.error("");
        });
    }
  };

  const handleLogin = () => {
    if (email === "" || pass === "") {
      toast.warn("Please fill all the fields");
    } else {
      const payload = {
        email: email,
        password: pass,
      };
      setLoading(true);
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
          dispatch(LoginSuccess(res));
          toast.success("Login Success");
          setLoading(false);
          if (res.role == "banker") {
            navigate("/accounts");
          } else {
            navigate("/transaction");
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          toast.error("Wrong credentials");
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

          {loading ? (
            <Button variant="dark" style={{ width: "100%" }}>
              <Spinner animation="border" variant="light" />
            </Button>
          ) : (
            <Button
              variant="dark"
              onClick={handleLogin}
              style={{ width: "100%" }}
            >
              Login
            </Button>
          )}
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

          {loading ? (
            <Button variant="dark" style={{ width: "100%" }}>
              <Spinner animation="border" variant="light" />
            </Button>
          ) : (
            <Button
              variant="dark"
              onClick={handleRegister}
              style={{ width: "100%" }}
            >
              Register
            </Button>
          )}
        </Form>
      )}
    </div>
  );
};

export default Auth;

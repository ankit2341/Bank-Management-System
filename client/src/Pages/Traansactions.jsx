import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const Traansactions = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const userdata = useSelector((store) => store.AuthReducer.userData);
  const navigate=useNavigate();

  useEffect(() => {
    if(userdata===""){
      return navigate("/")
    }
    setLoading(true);
    fetch(`${import.meta.env.VITE_SOME_KEY}users/${userdata.id}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setUserData(res[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setUserData([]);
        setLoading(false);
      });
  }, [amount]);

  const addData = (method) => {
    const date = new Date();
    const payload = {
      trans_date:
        date.getDate() + "-" + date.getMonth() + 1 + "-" + date.getFullYear(),
      amount: amount,
      method: method,
      user_id: userdata.id,
    };
    console.log(payload);
    fetch(`${import.meta.env.VITE_SOME_KEY}accounts/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": `${userdata.token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
        alert("Prccessed successfully");
      })
      .catch((err) => {
        console.log(err);
        alert("error in processing");
      });
  };

  const handlewihtdraw = () => {
    if (amount > userData.funds) {
      alert("Insufficient Funds");
    } else {
      const payload = { funds: Number(userData.funds) - Number(amount) };
      fetch(`${import.meta.env.VITE_SOME_KEY}users/${userdata.id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          "Authorization": `${userdata.token}`,
        },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          addData("Withdrawl");
          alert("withdrwal success");
        })
        .catch((err) => {
          console.log(err);
          alert("wrong cred");
        });
    }
  };

  const handleDeposit = () => {
    const payload = { funds: Number(userData.funds) + Number(amount) };
    console.log(payload);
    fetch(`${import.meta.env.VITE_SOME_KEY}users/${userdata.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "Authorization": `${userdata.token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        addData("Deposit");
        alert("deposit success");
      })
      .catch((err) => {
        console.log(err);
        alert("wrong cred");
      });
  };

  return (
    <>
      <Card style={{ width: "90%", margin: "auto", background: "#f9f9f9",marginTop:"100px" }}>
        <Card.Body>
          <Card.Title>{userData.email}</Card.Title>
          <Card.Text>Funds {userData.funds}</Card.Text>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Enter Amount</Form.Label>
            <Form.Control
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
              type="number"
              placeholder="Enter amount"
            />
          </Form.Group>
          <Button variant="dark" onClick={handlewihtdraw}>
            Withdraw
          </Button>
          <Button variant="dark" onClick={handleDeposit}>
            Deposit
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default Traansactions;

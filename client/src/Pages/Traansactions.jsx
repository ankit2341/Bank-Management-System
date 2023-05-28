import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/esm/Spinner";
import { toast } from "react-toastify";
import Table from "react-bootstrap/Table";

const Traansactions = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const userdata = useSelector((store) => store.AuthReducer.userData);
  const navigate = useNavigate();
  const [accountsData, setAccountsData] = useState([]);

  useEffect(() => {
    if (userdata === "") {
      toast.error("Not Authorized");
      return navigate("/");
    }
    if (userdata.role !== "customer") {
      toast.error("Not Authorized");
      return navigate("/accounts");
    }
    setLoading(true);
    fetch(`${import.meta.env.VITE_SOME_KEY}accounts`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `${userdata.token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        const data = res.filter((el) => {
          return el.user_id === userdata.id;
        });
        setAccountsData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setAccountsData([]);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (userdata === "") {
      return navigate("/");
    }
    setLoading(true);
    fetch(`${import.meta.env.VITE_SOME_KEY}users/${userdata.id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `${userdata.token}`,
      },
    })
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
  }, []);

  const addData = (method) => {
    const date = new Date();
    const payload = {
      trans_date:
        date.getDate() + "-" + date.getMonth() + 1 + "-" + date.getFullYear(),
      amount: amount,
      method: method,
      user_id: userdata.id,
    };
    fetch(`${import.meta.env.VITE_SOME_KEY}accounts/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `${userdata.token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        window.location.reload();
        toast.success("Prccessed successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("error in processing");
      });
  };

  const handlewihtdraw = () => {
    if (amount > userData.funds) {
      toast.warn("Insufficient Funds");
    } else {
      const payload = { funds: Number(userData.funds) - Number(amount) };
      fetch(`${import.meta.env.VITE_SOME_KEY}users/${userdata.id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `${userdata.token}`,
        },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          addData("Withdrawl");
          toast.success("withdrwal success");
        })
        .catch((err) => {
          console.log(err);
          toast.error("withdrawl failed");
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
        Authorization: `${userdata.token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        addData("Deposit");
        toast.success("Deposit success");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Deposit failed");
      });
  };

  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          height: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spinner variant="dark" animation="grow"></Spinner>
      </div>
    );
  }

  return (
    <>
      <Card
        style={{
          width: "90%",
          margin: "auto",
          background: "#f9f9f9",
          marginTop: "100px",
        }}
      >
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
      <br />
      {accountsData.length > 0 ? (
        <Table
          responsive
          striped
          style={{
            width: "80%",
            marginTop: "20px",
            padding: "20px 20px",
            margin: "auto",
            marginBottom: "100px",
          }}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Transaction date</th>
              <th>Amount</th>
              <th>Method</th>
            </tr>
          </thead>
          <tbody>
            {accountsData.map((el, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{el.trans_date}</td>
                  <td>{el.amount}</td>
                  <td>{el.method}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <p style={{ margin: "auto", textAlign: "center", marginTop: "100px" }}>
          No data found
        </p>
      )}
    </>
  );
};

export default Traansactions;

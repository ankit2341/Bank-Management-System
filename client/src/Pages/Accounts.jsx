import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Accounts = () => {
  const [accountsData, setAccountsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const userdata = useSelector((store) => store.AuthReducer.userData);
  const navigate = useNavigate();
  // console.log(userdata)
  useEffect(() => {
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
        setAccountsData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setAccountsData([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Spinner
        style={{ marginTop: "100px", margin: "auto" }}
        animation="border"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <>
      {accountsData.length >= 0 && userdata.role === "banker" ? (
        <Table responsive striped style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Transaction date</th>
              <th>Amount</th>
              <th>Method</th>
              <th>User Id</th>
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
                  <td>{el.user_id}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : accountsData.length > 0 && userdata.role !== "banker" ? (
        <p style={{ margin: "auto", textAlign: "center", marginTop: "100px" }}>
          Not Authorized
        </p>
      ) : (
        <p style={{ margin: "auto", textAlign: "center", marginTop: "100px" }}>
          No data found
        </p>
      )}
    </>
  );
};

export default Accounts;

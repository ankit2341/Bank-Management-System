import React, { useEffect, useState } from 'react'

const Traansactions = () => {
  const [userData,setUserData]=useState([]);

  useEffect(()=>{
       
  },[])

  return (
   <>
    <Card style={{ width: "90%" }}>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
         Funds {}
        </Card.Text>
        <Button variant="dark">Withdraw</Button>
        <Button variant="dark">Deposit</Button>
      </Card.Body>f
    </Card>
   </>
  )
}

export default Traansactions
import React, { useEffect, useState } from 'react';
import  Card from '@mui/material/Card';
import  List  from '@mui/material/List';





const Receiver = ({ payload }) => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (payload.topic) {
      setMessages(messages => [...messages, payload])
    }
    console.log(messages)
  }, [payload])

   

  return (
    <></>
  );
}

export default Receiver;
import React from 'react';
import Card from '@mui/material/Card';
import Button  from '@mui/material/Button';
import AWS from 'aws-sdk'
import { useEffect , useState} from 'react';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const ConnectionPubIOT = ({ connect, disconnect, connectBtn, publish, raspFl,detect }) => {
  const [started, setStarted] = useState(false);

const onFinish = () => {
     
    const url = `ws://broker.emqx.io:8083/mqtt`;
    const options = {
      keepalive: 30,
      protocolId: 'MQTT',
      protocolVersion: 4,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
      will: {
        topic: 'WillMsg',
        payload: 'Connection Closed abnormally..!',
        qos: 0,
        retain: false
      },
      rejectUnauthorized: false
    };
    options.clientId = `mqttjs_ + ${Math.random().toString(16).substr(2, 8)}`;

    connect(url, options);
    console.log("connected")
  };

  const handlePublish = async () => {
    const values={topic:"viu/test/procesorasp", qos: 0, payload:detect}
    publish(values)
    console.log("publicado")
    raspFl(true)
   
  
  };

  const handleDisconnect = () => {
    disconnect();
  };


  
  
  useEffect(() => {

    if(started===false){
    setStarted(true)
    onFinish()
  
  }
  }, []);
   

  return (
    // <Card
    // >
    //          <Button type="primary" onClick={handleConnect}>{connectBtn}</Button>,
    //     <Button onClick={handleDisconnect}>Disconnect</Button>
    // </Card>
    <Button variant="outlined" component="label" endIcon={<PhotoCamera />} sx={{py: 2.0625, mb:1.875}} onClick={()=> handlePublish()} >
                    Capturar Video
                  </Button>
   
  );
}

export default ConnectionPubIOT;
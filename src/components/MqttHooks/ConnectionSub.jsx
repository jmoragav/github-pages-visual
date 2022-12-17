import React from 'react';
import Card from '@mui/material/Card';
import Button  from '@mui/material/Button';
import AWS from 'aws-sdk'
import { useEffect , useState} from 'react';
import { ConsoleLogger } from '@aws-amplify/core';

const ConnectionSub = ({ connect, disconnect, subscribe, unsubscribe, payl, set_video_up_aws, set_video_name, cliente}) => {
const [started, setStarted] = useState(false);
const [messages, setMessages] = useState([])


const dominio_cloud="https://d1spirfjvgfz53.cloudfront.net"
AWS.config.update({
    accessKeyId: 'AKIA2KWV7ZFJOEEXUPVH', //env
    secretAccessKey: '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'
})

const myBucket = new AWS.S3({
    params: { Bucket: "memoria-storage-videos"},
    region: "sa-east-1",
})

const onFinish = () => {
    //const url = `ws://broker.emqx.io:8083/mqtt`;
    const url = `wss://mqtt.flespi.io:443`;
    
    const options = {
      keepalive: 30,
      protocolId: 'MQTT',
      protocolVersion: 4,
      clean: true,
      username: "FlespiToken Q12GzEEI7nHLEuJ1KsIte1qd13tGJfbn61Tuvm2tzA21SBQsRoJVdXX4Qeyokxze",
      password:"",
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
    console.log("valores")

  };

const getJsonData = async (name) =>{

  await fetch("https://memoria-storage-videos.s3.amazonaws.com/detections/"+name.slice(6)+"_detections.json").
  then((response) => response.json()).
  then(data => {console.log(data)})
}

  const handleDisconnect = () => {
    disconnect();
  };

  //start component
useEffect(() => {
    if(started===false){
    setStarted(true)
    onFinish()
  }
  }, []);

useEffect(()=>{
    if(cliente){
    const values={topic:"viu/test/resultadoec2", qos: 0}
    subscribe(values);
    }
},[cliente])

  useEffect(() => {
    if (payl.topic) {
      setMessages(messages => [...messages, payl])

      set_video_up_aws(true)
      set_video_name(dominio_cloud+'/'+payl.message)
      
      console.log(payl.message)
      getJsonData(payl.message)
    }
    
  }, [payl])

  return (
      <></>
  );
}

export default ConnectionSub;


import React, { createContext, useEffect, useState } from 'react';
import Connection from './ConnectionPub';
 
import Receiver from './Receiver';
import mqtt from 'mqtt';
import ConnectionSub from './ConnectionSub';

export const QosOption = createContext([])
const qosOption = [
  {
    label: '0',
    value: 0,
  }, {
    label: '1',
    value: 1,
  }, {
    label: '2',
    value: 2,
  },
];

const HookMqttSub = ({ set_payload, realpayload , set_video_aws, set_video_name_aws }) => {
  const [client, setClient] = useState(null);
  const [isSubed, setIsSub] = useState(false);
 
  const [connectStatus, setConnectStatus] = useState('Connect');



  
  const mqttConnect = (host, mqttOption) => {
     
    setConnectStatus('Connecting');
    setClient(mqtt.connect(host, mqttOption));
  };
 

  useEffect(() => {
    if (client) {
      client.on('connect', () => {
        setConnectStatus('Connected');
         
      });
      client.on('error', (err) => {
        console.error('Connection error: ', err);
        client.end();
      });
      client.on('reconnect', () => {
        setConnectStatus('Reconnecting');
      });
      client.on('message', (topic, message) => {
        const payload = { topic, message: message.toString() };
        console.log(payload)
        
        set_payload(payload);
      
      });
    }
  }, [client]);

  const mqttDisconnect = () => {
    if (client) {
      client.end(() => {
        setConnectStatus('Connect');
      });
    }
  }

   

  const mqttSub = (subscription) => {

    if (client) {
    
      const { topic, qos } = subscription;
  
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
       
        setIsSub(true)
        console.log("subbed")
      });
    }
  };

  const mqttUnSub = (subscription) => {
    if (client) {
      const { topic } = subscription;
      client.unsubscribe(topic, error => {
        if (error) {
          console.log('Unsubscribe error', error)
          return
        }
        setIsSub(false);
      });
    }
  };

  return (
    <>
      <ConnectionSub connect={mqttConnect} disconnect={mqttDisconnect}  subscribe={mqttSub} unsubscribe={mqttUnSub}  payl={realpayload} set_video_name={set_video_name_aws} set_video_up_aws={set_video_aws} cliente={client} />
    
      
    </>
  );
}

export default HookMqttSub;
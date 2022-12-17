import React from 'react';
import Card from '@mui/material/Card';
import Button  from '@mui/material/Button';
import AWS from 'aws-sdk'
import { useEffect , useState} from 'react';

const ConnectionPub = ({ connect, disconnect, videoup, publish, setprog, resetSt, file_bun ,detect}) => {
  const [started, setStarted] = useState(false);
  AWS.config.update({
    accessKeyId: 'AKIA2KWV7ZFJA6GK2R6Q', //env
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
    console.log("connected")
  };

  const handlePublish = async (file) => {

    if(videoup){

      resetSt()
      await uploadFile(file)
    }
    else{
        await uploadFile(file)
    }
    
   
  
  };

  const handleDisconnect = () => {
    disconnect();
  };


  const uploadFile  =  async  (file) => {
    const params = {
        Body: file,
        Bucket: "memoria-storage-videos",
        Key: file.name
    };
    myBucket.putObject(params)
        .on('httpUploadProgress', (evt) => {
          setprog(Math.round((evt.loaded / evt.total) * 100))
        })
        .send((err) => {
            if (err) console.log(err)
            else{
              const values={topic:"viu/test/procesoec2", qos: 0, payload:file.name+";"+detect }
              publish(values)
              console.log("publicado")
            }

        })
}
  
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

    <Button variant="outlined" component="label" onClick={()=> handlePublish(file_bun)} sx={{py: 2.0625, mb:1.875}} >
                    Subir Video
    </Button>
  );
}

export default ConnectionPub;

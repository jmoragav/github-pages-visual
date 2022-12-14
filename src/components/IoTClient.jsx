 
import { mqtt, io, aws_iot } from 'aws-iot-device-sdk-v2';

 
export class IoTClient {
 

  constructor(props,context) {
 

    const clientBootstrap = new io.ClientBootstrap();

    const cert = '../aws-cert/computer-iot-certificate.pem.crt';
    const pk = '../aws-cert/computer-iot-private.pem.crt';

    const configBuilder = aws_iot.AwsIotMqttConnectionConfigBuilder.new_mtls_builder(
      cert,
      pk,
    );

    configBuilder.with_clean_session(false);
    configBuilder.with_client_id('asjdhakjhdkasjhdkj');

    this.endpoint = 'a3jg0sj9qjaxhz-ats.iot.us-east-2.amazonaws.com';
    configBuilder.with_endpoint(this.endpoint);
    configBuilder.with_keep_alive_seconds(5);
    configBuilder.with_ping_timeout_ms(3000);
    configBuilder.with_protocol_operation_timeout_ms(3000);

    const config = configBuilder.build();
    const client = new mqtt.MqttClient(clientBootstrap);
    this.connection = client.new_connection(config);

    this.connection.on('error', (error) => {
      console.error('Connection error: ' + JSON.stringify(error));
    });
    

    this.connection.on('interrupt', (error) => {
      console.error('Connection interrupted: ' + JSON.stringify(error));
    });

    this.connection.on('resume', (returnCode, sessionPresent) => {
      console.error(
        `Connection resumed with returnCode=${returnCode} and sessionPresent=${sessionPresent}`,
      );
    });
  }

  async onModuleInit() {
     

    console.log('Connecting to AWS IoT Core at ' + this.endpoint);
    this.connection.connect();
    console.log('Connected to AWS IoT Core at ' + this.endpoint);

 
  }

  /**
   * Publishes a message to the specified topic.
   * @param topic The topic to publish to.
   * @param payload The string payload to publish.
   */
  publish(topic, payload) {
    return this.connection.publish(topic, payload, mqtt.QoS.AtLeastOnce);
  }

  onDisconnect(callback) {
    this.connection.on('interrupt', async (error) => {
      console.error('Connection interrupted: ' + JSON.stringify(error));

      await callback(error);
    });
  }

  onReconnect(callback) {
    this.connection.on('resume', async (returnCode, sessionPresent) => {
      console.error(
        `Connection resumed with returnCode=${returnCode} and sessionPresent=${sessionPresent}`,
      );

      await callback();
    });
  }

  
}

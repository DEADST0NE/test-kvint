import amqp from 'amqplib';
import dotenv from 'dotenv';

dotenv.config();

class MessageBroker {
  async init() {
    const conn = await amqp.connect({
      hostname: process.env.APP_RABBITMQ_HOST,
      port: process.env.EXPOSE_RABBITMQ_PORT  && + process.env.EXPOSE_RABBITMQ_PORT,
      username: process.env.APP_MONGO_INITDB_ROOT_USERNAME,
      password:  process.env.APP_MONGO_INITDB_ROOT_PASSWORD,
    });

    conn.on("error", (err) => {
      if (err.message !== "Connection closing") {
        console.log("[MessageBroker] conn error", err.message);
      }
    });

    conn.on("close", function() {
      console.log("[MessageBroker] reconnecting");
    });

    return conn;
  }

};

export default MessageBroker;
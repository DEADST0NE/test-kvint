import MessageBroker from './_utils/rabbit';
import Params from './_models/Params';
import { ACTION_TEST } from './_utils/rabbit/actions';

const processMessage = async (msg: { content: Buffer }) => {
  const { value } = JSON.parse(msg.content.toString());
  if(!value) {
    console.log('Error not params value');
    return
  }
  const param = new Params({
    value,
  });
  param.save().then((data) => console.log('Save data success', data));
}

(async () => {
    const messageBroker = new MessageBroker();
    const connection = await messageBroker.init();
    const channel = await connection.createChannel();
  
    channel.prefetch(10);
    const queue = ACTION_TEST;

    process.once('SIGINT', async () => { 
      console.log('got sigint, closing connection');
      await channel.close();
      await connection.close(); 
      process.exit(0);
    });

    await channel.assertQueue(queue, {durable: true});
    await channel.consume(queue, async (msg) => {
      console.log('processing messages');
      await processMessage(msg);
      channel.ack(msg);
    }, 
    {
      noAck: false,
      consumerTag: 'email_consumer'
    });
    console.log(" [*] Waiting for messages. To exit press CTRL+C");
})();
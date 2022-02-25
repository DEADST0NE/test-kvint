import MessageBroker from './_utils/rabbit';

import { ACTION_TEST } from './_utils/rabbit/actions';

(async () => {
  const params = process.argv[2];

  const messageBroker = new MessageBroker();
  const connection = await messageBroker.init();
  const channel = await connection.createChannel();

  try {
    console.log('Create client message');

    const exchange = 'test';
    const queue = ACTION_TEST;
    const routingKey = 'test';
    
    await channel.assertExchange(exchange, 'direct', {durable: true});
    await channel.assertQueue(queue, {durable: true});
    await channel.bindQueue(queue, exchange, routingKey);
    
    const msg = { value: params };

    channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(msg)));

    console.log('Message published');
  } catch(e) {
    console.error('Error in publishing message', e);
  } finally {
    console.info('Closing channel and connection if available');
    await channel.close();
    await connection.close();
    console.info('Channel and connection closed');
  }
  process.exit(0);
})();



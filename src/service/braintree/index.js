import braintree from 'braintree';
import config from './config';

const gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: config().merchantId,
    publicKey: config().publicKey,
    privateKey: config().privateKey,
});

console.log('Connected to brain tree');

export default gateway;


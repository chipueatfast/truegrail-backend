import { Api, JsonRpc, RpcError } from 'eosjs';
import { TextEncoder, TextDecoder } from 'util';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import fetch from 'node-fetch';


const eosioKey = process.env.EOSIO_PRIVATE_KEY;
const signatureProvider = new JsSignatureProvider([eosioKey]); // eosio;
const rpc = new JsonRpc('http://127.0.0.1:8888', {
    fetch,
});
const textDecoder = new TextDecoder();
const textEncoder = new TextEncoder();
const api = new Api({
    rpc,
    signatureProvider,
    textEncoder,
    textDecoder,
});

function basicPermissionConfiguration(publicKey) {
    return {
        threshold: 1,
        keys: [{
            key: publicKey,
            weight: 1,
        }],
        accounts: [],
        waits: [],
    };
}

function generateRandomEosAccountName() {
    let result = '';
    const length = 12;
    const characters = '12345abcdefghijklmnopqrstuvwxyz';
    for (let i=0; i<length; i++) {
        const randomIndex = Math.floor(Math.random() * length);
        result += characters.charAt(randomIndex);
    }
    return result;
}
 
export async function createNewAccount(publicKey) {
    try  {
        const randomValidEosAccountName = generateRandomEosAccountName();
        const receipt = await api.transact({
            actions: [{
                account: 'eosio',
                name: 'newaccount',
                authorization: [
                    {
                        actor: 'eosio',
                        permission: 'active',
                    },
                ],
                data: {
                    creator: 'eosio',
                    name: randomValidEosAccountName,
                    owner: basicPermissionConfiguration(publicKey),
                    active: basicPermissionConfiguration(publicKey),
                },
            }],
        }, {
            blocksBehind: 3,
            expireSeconds: 30,
            broadcast: true,
        });
        console.log(receipt);
        return receipt;
    } catch (e) {
        console.log('\nCaught exception: ' + e);
        if (e instanceof RpcError) {
            console.log(JSON.stringify(e.json, null, 2));
        }}
};
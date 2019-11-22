import { Api, JsonRpc, RpcError } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import fetch from 'node-fetch';
import { TextEncoder, TextDecoder } from 'util';

const defaultPrivateKey = process.env.GENACCOUNT_PRIVATE_KEY; // eosio

const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
const textDecoder = new TextDecoder();
const textEncoder = new TextEncoder();

const rpc = new JsonRpc(process.env.NODEOS_URL, {
    fetch,
});

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

export async function createNewEosAccount(publicKey) {
    try  {
        const randomValidEosAccountName = generateRandomEosAccountName();
        await api.transact({
            actions: [{
                account: 'eosio',
                name: 'newaccount',
                authorization: [
                    {
                        actor: process.env.GENACCOUNT_NAME,
                        permission: 'active',
                    },
                ],
                data: {
                    creator: process.env.GENACCOUNT_NAME,
                    name: randomValidEosAccountName,
                    owner: basicPermissionConfiguration(publicKey),
                    active: basicPermissionConfiguration(publicKey),
                },
            },
            {
                account: 'eosio',
                name: 'buyrambytes',
                authorization: [{
                    actor: process.env.GENACCOUNT_NAME,
                    permission: 'active',
                }],
                data: {
                    payer: process.env.GENACCOUNT_NAME,
                    receiver: randomValidEosAccountName,
                    bytes: 8192,
                },
            },
            ],
        }, {
            blocksBehind: 3,
            expireSeconds: 30,
            broadcast: true,
        });
        console.log('no error');
        return {
            eosName: randomValidEosAccountName,
        };
    } catch (e) {
        if (e instanceof RpcError) {
            return {
                error: e.json,
            };
            console.log(JSON.stringify(e.json, null, 2));
        }
        return {
            error: {
                message: e.message,
            },
        }
    };
};

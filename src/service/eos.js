import { Api, JsonRpc, RpcError } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import fetch from 'node-fetch';
import { TextEncoder, TextDecoder } from 'util';
import { isProduction } from '~/util/environment';

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
        const actions = [
            {
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
        ];
        if (isProduction()) {
            actions.push({
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
            });
        }
        await api.transact({
            actions,
        }, {
            blocksBehind: 3,
            expireSeconds: 30,
            broadcast: true,
        });
        return {
            eosName: randomValidEosAccountName,
        };
    } catch (e) {
        if (e instanceof RpcError) {
            return {
                error: e.json,
            };
        }
        return {
            error: {
                message: e.message,
            },
        }
    };
};

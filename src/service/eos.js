import { Api, JsonRpc, RpcError } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import fetch from 'node-fetch';
import { TextEncoder, TextDecoder } from 'util';
import { isProduction } from '~/util/environment';

const smartContractName = isProduction() ? 'truegrail123' : 'truegrail2';

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

export async function createNewEosAccount({
    publicKey,
    eosName,
}) {
    try  {
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
                    name: eosName,
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
                    receiver: eosName,
                    bytes: 8192,
                },
            });
            actions.push({
                account: 'eosio',
                name: 'delegatebw',
                authorization: [{
                    actor: process.env.GENACCOUNT_NAME,
                    permission: 'active',
                }],
                data: {
                    from: process.env.GENACCOUNT_NAME,
                    receiver: eosName,
                    stake_net_quantity: '1.0000 EOS',
                    stake_cpu_quantity: '1.0000 EOS',
                    transfer: false,
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
            eosName: eosName,
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

export async function executeSmartContractMethod({
    method, 
    namedParams,
}) {
    try {
        await api.transact({
            actions: [
                {
                    account: smartContractName,
                    name: method,
                    authorization: [
                        {
                            actor: process.env.GENACCOUNT_NAME,
                            permission: 'active',
                        },
                    ],
                    data: namedParams,
                }]}, {
            blocksBehind: 3,
            expireSeconds: 30,
        });
        return {};
    } catch (e) {
        console.log('\nCaught exception: ' + e);
        if (e instanceof RpcError) {
            console.log(JSON.stringify(e.json, null, 2));
            return {
                error: e.json,
            }
        }
        return {
            error: e.message,
        }
    }

}
import { Api, JsonRpc, RpcError } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import fetch from 'node-fetch';
import { TextEncoder, TextDecoder } from 'util';

const defaultPrivateKey = process.env.EOSIO_PRIVATE_KEY; // eosio

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

export async function getRecordFromTableByKey({
    table,
    tableKey,
}) {
    return rpc.get_table_rows({
        json: true,
        code: 'truegrail2',
        scope: 'truegrail2',
        table,
        table_key: tableKey,
    });
}

// export async function executeSmartContractMethod({
//     method,
//     namedParams,
// }) {
//     try {
//         const rs = await api.transact({
//             actions: [
//                 {
//                     account: 'truegrail2',
//                     name: method,
//                     authorization: [
//                         {
//                             actor: 'truegrail2',
//                             permission: 'active',
//                         },
//                     ],
//                     data: namedParams,
//                 }]}, {
//             blocksBehind: 3,
//             expireSeconds: 30,
//         });
//         console.log('response ne: ', rs);
//     } catch (e) {
//         console.log('\nCaught exception: ' + e);
//         if (e instanceof RpcError) {
//             console.log(JSON.stringify(e.json, null, 2));
//             return {
//                 error: e.json,
//             }
//         }   
//     }
// }

export async function createNewEosAccount(publicKey) {
    try  {
        const randomValidEosAccountName = generateRandomEosAccountName();
        await api.transact({
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
        return {
            eosName: randomValidEosAccountName,
        };
    } catch (e) {
        if (e instanceof RpcError) {
            return {
                error: e.json,
            };
            console.log(JSON.stringify(e.json, null, 2));
        }}
};

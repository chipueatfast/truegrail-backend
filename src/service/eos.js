import { Api, JsonRpc, RpcError } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import fetch from 'node-fetch';
import { TextEncoder, TextDecoder } from 'util';

const defaultPrivateKey = process.env.EOS_DEV_PRIVATE_KEY; // truegrail2
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

export async function executeSmartContractMethod({
    method,
    namedParams,
}) {
    try {
        console.log('at eos transaction: ', method, namedParams);
        const rs = await api.transact({
            actions: [
                {
                    account: 'truegrail2',
                    name: method,
                    authorization: [
                        {
                            actor: 'truegrail2',
                            permission: 'active',
                        },
                    ],
                    data: namedParams,
                }]}, {
            blocksBehind: 3,
            expireSeconds: 30,
        });
        console.log('response ne: ', rs);
    } catch (e) {
        console.log('\nCaught exception: ' + e);
        if (e instanceof RpcError) {
            console.log(JSON.stringify(e.json, null, 2));
        }   
    }
}

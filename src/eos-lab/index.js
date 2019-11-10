import Eos, { Api, JsonRpc } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import fetch from 'node-fetch';
import { TextEncoder, TextDecoder } from 'util';

const defaultPrivateKey = '5JRk3jnCWVVFfTonRRBA6DTLVbcFV4rqMP7YTcERp4ZyPRteZm3' // truegrail2
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
const textDecoder = new TextDecoder();
const textEncoder = new TextEncoder();


const rpc = new JsonRpc('http://127.0.0.1:8888', {
    fetch,
});

const api = new Api({
    rpc,
    signatureProvider,
    textEncoder,
    textDecoder,
});

export async function testContract() {
    const config = {
        keyProvider: ['5JRk3jnCWVVFfTonRRBA6DTLVbcFV4rqMP7YTcERp4ZyPRteZm3'],
        httpEndpoint: 'http://127.0.0.1:8888',
        expireInSeconds: 60,
        broadcast: true,
        verbose: false,
        sign: true,
    }
    const eos = Eos(config);
    const eosinfo = eos.getInfo((error, info) => {console.log(error, info);});
        
    // Promise
    eos.getBlock(1)
        .then(result => console.log(result))
        .catch(error => console.error(error));
}

export async function getRowsOfOwnershipsTable() {
    const resp = await rpc.get_table_rows({
        json: true,
        code: 'truegrail2',
        scope: 'truegrail2',
        table: 'ownerships',
        limit: 10,
    });
    console.log(resp);
    return resp.rows;
}   

export async function callIssueMethod({sneaker_id, sneaker_info_hash}) {
    const result = await api.transact({
        action: [
            {
                account: 'truegrail2',
                name: 'issue',
                authorization: [
                    {
                        actor: 'truegrail2',
                        permission: 'active',
                    },
                ],
                data: {
                    sneaker_id,
                    sneaker_info_hash,
                },
            }]}, {
        blocksBehind: 3,
        expireSeconds: 30,
    });

    console.dir(result);
}
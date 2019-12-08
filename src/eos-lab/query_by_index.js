import { Api, JsonRpc, RpcError } from 'eosjs';
import { TextEncoder, TextDecoder } from 'util';
import fetch from 'node-fetch';

const rpc = new JsonRpc('http://127.0.0.1:8888', {
    fetch,
});
const textDecoder = new TextDecoder();
const textEncoder = new TextEncoder();
const api = new Api({
    rpc,
    textEncoder,
    textDecoder,
});

export async function getSingleRowBaseOnSecondIndex(index) {
    console.log(await rpc.get_table_rows({
        json: true,                 // Get the response as json
        code: 'truegrail2',           // Contract that we target
        scope: 'truegrail2',          // Account that owns the data
        table: 'sneakers',          // Table name
        table_key: 'ownerId',
        lower_bound: index,     // Table primary key value
        reverse: false,             // Optional: Get reversed data
        show_payer: false,          // Optional: Show ram payer
    }));
}


export async function getSingleRowBaseOnIndex(index) {
    console.log(await rpc.get_table_rows({
        json: true,                 // Get the response as json
        code: 'truegrail2',           // Contract that we target
        scope: 'truegrail2',          // Account that owns the data
        table: 'sneakers',          // Table name
        lower_bound: index,     // Table primary key value
        limit: 1,                   // Here we limit to 1 to get only the single row with primary key equal to 'testacc'
        reverse: false,             // Optional: Get reversed data
        show_payer: false,          // Optional: Show ram payer
    }));
};
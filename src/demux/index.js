import { BaseActionWatcher } from 'demux';
import { NodeosActionReader } from 'demux-eos';

import EosActionHandler from './EosActionHandler';
import handlerVersion from './handlerVersions/v1/index';




export function watchEosBlockchain() {
    console.log(`listening eos blockchain ${process.env.NODEOS_URL}`)
    const actionHandler = new EosActionHandler([handlerVersion])
    const actionReader = new NodeosActionReader({
        startAtBlock: 0,
        onlyIrreversible: false,
        nodeosEndpoint: process.env.NODEOS_URL,

    })
    const actionWatcher = new BaseActionWatcher(
        actionReader,
        actionHandler,
        100);
    actionWatcher.watch();
}
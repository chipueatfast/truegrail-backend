import { AbstractActionHandler } from 'demux';

let state = {
    volumeBySymbol: {},
    totalTransfer: 0,
    indexState: {
        blockNumber: 0,
        blockHash: '',
        isReplay: false,
        handlerVersionName: 'v1',
    },
}

const stateHistory = {};
const stateHistoryMaxLength = 300;

export default class EosActionHandler extends AbstractActionHandler {
    async handleWithState(handle) {
        await handle(state)
        const { blockNumber } = state.indexState;
        stateHistory[blockNumber] = state;
        if (blockNumber > stateHistoryMaxLength && stateHistory[blockNumber - stateHistoryMaxLength]) {
            delete stateHistory[blockNumber - stateHistoryMaxLength];
        }
    }

    loadIndexState() {
        return state.indexState;
    }


    updateIndexState(stateObj, block, isReplay, handlerVersionName) {
        stateObj.indexState.blockNumber = block.blockInfo.blockNumber;
        stateObj.indexState.blockHash = block.blockInfo.blockNumber;
        stateObj.indexState.isReplay = isReplay;
        stateObj.indexState.handlerVersionName = handlerVersionName;
    }

    rollbackTo(blockNumber) {
        const lastestBlockNumber = state.index.blockNumber;
        const toDelete = 
            [...Array(lastestBlockNumber - blockNumber + 1).keys()]
                .map(n => blockNumber + n);

        for (const n of toDelete) {
            delete stateHistory[n];
        }
        state = stateHistory[blockNumber];
    }

    setup() {
        
    }
}
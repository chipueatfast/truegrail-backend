import { isProduction } from '~/util/environment';


const truegrailSmartContract = isProduction() ? 'truegrail123' : 'truegrail2';


const updaters = [
    {
        actionType: `truegrail2::issue`,
        apply: (state, payload) => {
            console.log('issue: ', JSON.stringify(payload))
        },
    },
    {
        actionType: `${truegrailSmartContract}::checkfactory`,
        apply: (state, payload) => {
            console.log("checkfactory updater: ", JSON.stringify(payload));
        },
    },
];

const effects = [
    {
        actionType: `${truegrailSmartContract}::issue`,
        run: (payload) => {
            console.log('issue effect: ', JSON.stringify(payload))
        },
    },
    {
        actionType: `${truegrailSmartContract}::checkcreator`,
        run: () => {
            console.log("checkcreator");
        },
    },
    {
        actionType: `${truegrailSmartContract}::checkfactory`,
        run: (payload) => {
            console.log("checkfactory: ", JSON.stringify(payload));
        },
    },
]

const handlerVersion = {
    versionName: 'v1',
    updaters,
    effects,
}

export default handlerVersion;

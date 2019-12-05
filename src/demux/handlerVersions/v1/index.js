import { userEffects, userUpdaters } from './user';



const updaters = [
    ...userUpdaters,
];

const effects = [
    ...userEffects,
]

const handlerVersion = {
    versionName: 'v1',
    updaters,
    effects,
}

export default handlerVersion;

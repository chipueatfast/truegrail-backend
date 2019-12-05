import { userEffects, userUpdaters } from './user';
import { sneakerUpdaters } from './sneaker';



const updaters = [
    ...userUpdaters,
    ...sneakerUpdaters,
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

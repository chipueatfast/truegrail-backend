import { userEffects, userUpdaters } from './user';
import { 
    sneakerUpdaters, 
    sneakerEffects,
} from './sneaker';



const updaters = [
    ...userUpdaters,
    ...sneakerUpdaters,
];

const effects = [
    ...userEffects,
    ...sneakerEffects,
]

const handlerVersion = {
    versionName: 'v1',
    updaters,
    effects,
}

export default handlerVersion;

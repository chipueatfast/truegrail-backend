import { sequelize } from "~/sequelize/models/index";
import { getSmartContract } from '~/util/environment';

const ISSUE_SNEAKER = `${getSmartContract()}::issue`;

export const sneakerUpdaters = [
    {
        actionType: ISSUE_SNEAKER,
        apply: async (state, payload) => {
            const {
                data: {
                    sneaker_id,
                },
            } = payload;
            await sequelize.Sneaker.update({
                isBlockchainSynced: true,
            }, {
                where: {
                    id: sneaker_id,
                },
            });
        },
    },
];

export const sneakerEffects = [
    {
        actionType: ISSUE_SNEAKER,
        run: (payload) => {            
            const {
                data: {
                    sneaker_id,
                },
            } = payload;
            console.log('the issuation of sneaker with id of ', sneaker_id);
        },
    },
];
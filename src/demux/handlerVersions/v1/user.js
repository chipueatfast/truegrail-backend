import { sequelize } from "~/sequelize/models/index";
import { getSmartContract } from '~/util/environment';

const UPDATE_USER_INFO = `${getSmartContract()}::updateuser`;

export const userUpdaters = [
    {
        actionType: UPDATE_USER_INFO,
        apply: async (state, payload) => {
            const {
                data: {
                    user_id,
                },
            } = payload;
            await sequelize.User.update({
                isBlockchainSynced: true,
            }, {
                where: {
                    id: user_id,
                },
            });
        },
    },
];

export const userEffects = [

]


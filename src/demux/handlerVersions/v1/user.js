import { sequelize } from "~/sequelize/models/index";
import { getSmartContract } from '~/util/environment';

const UPDATE_USER_INFO = `${getSmartContract()}::updateuser`;
const INSERT_FACTORY = `${getSmartContract()}::insertuser`; // with the role 'factory' only


export const userUpdaters = [
    {
        actionType: INSERT_FACTORY,
        apply: async (state, payload) => {
            const {
                data: {
                    user_id,
                    role,
                }}= payload;

            if (role === 'factory') {
                await sequelize.User.update({
                    isBlockchainSynced: true,
                }, {
                    where: {
                        id: user_id,
                    },
                });
            }
        },
    },
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
    {
        actionType: INSERT_FACTORY,
        run: async (payload) => {
            const {
                data: {
                    user_id,
                },
            } = payload;
            console.log('insert user id with the id of ', user_id)
        },
    },
    {
        actionType: UPDATE_USER_INFO,
        run: async (payload) => {
            const {
                data: {
                    user_id,
                },
            } = payload;
            console.log('Update info with the id of ', user_id)
        },
    },
]


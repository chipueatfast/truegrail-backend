import { sequelize } from "~/sequelize/models/index";

const UPDATE_USER_INFO = 'updateuser';

const userUpdaters = [
    {
        actionType: UPDATE_USER_INFO,
        apply: async (state, payload) => {
            const {
                data: {
                    user_id,
                },
            } = payload;
            await sequelize.User.update({
                where: {
                    id: user_id,
                },
            });

        },
    },
]


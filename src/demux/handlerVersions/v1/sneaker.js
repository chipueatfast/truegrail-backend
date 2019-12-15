import { sequelize } from "~/sequelize/models/index";
import { getSmartContract } from '~/util/environment';
import { sendFCM } from "~/service/fcm";
import { execSync } from "child_process";

const ISSUE_SNEAKER = `${getSmartContract()}::issue`;
const TRANSFER_SNEAKER =`${getSmartContract()}::transfer`;

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
    {
        actionType: TRANSFER_SNEAKER,
        apply: async (state, payload) => {
            const {
                data: {
                    sneaker_id,
                    new_owner_id,
                },
            } = payload;
            execSync(`echo 'file log ${TRANSFER_SNEAKER}, sneaker_id: ${sneaker_id}, new_owner_id: ${new_owner_id}' >> ./demux_log.txt`)
            const buyerUser = await sequelize.User.findOne({
                id: new_owner_id,
            });
            const mentionedSneaker = await sequelize.Sneaker.findOne({
                id: sneaker_id,
            });
            sendFCM(buyerUser.fcmToken, {
                title: 'New asset added to your collection',
                body: `Check out your new ${mentionedSneaker.model}(size ${mentionedSneaker.size})`,
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
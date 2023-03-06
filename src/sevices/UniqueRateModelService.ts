import {Model} from "../entity/Model";

export const verifUniqueRateModelService = async (id_modal: Number, id_manager: string): Promise<boolean> => {
    return Model.find({id_modal}).then((model) => {
        let unique = true;
        model.rating.forEach((rate) => {
            if (id_manager === rate.id_manager) {
                unique = false;
            }
        });

        return unique;
    });
};

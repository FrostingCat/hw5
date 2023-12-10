import {RequestHandler} from "express";
import {ChairModel} from "../../../models/furnitureModel";

export const changeById: RequestHandler = async (req, res) => {
	const id = req.params.id;
	const data = await ChairModel.findById(id);
    if (data === null) {
        res.json("Стул не найден");
    } else {
        await ChairModel.findByIdAndUpdate(id, req.body)
		res.status(200);
        res.json("Информация успешно обновлена.")
    }
}
import {RequestHandler} from "express";
import {TableModel} from "../../../models/furnitureModel";

export const changeById: RequestHandler = async (req, res) => {
	const id = req.params.id;
	const data = await TableModel.findById(id);
    if (data === null) {
        res.json("Стол не найден");
    } else {
        await TableModel.findByIdAndUpdate(id, req.body)
		res.status(200);
        res.json("Информация успешно обновлена.")
    }
} 
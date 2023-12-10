import {RequestHandler} from "express";
import {ClosetModel} from "../../../models/furnitureModel";

export const changeById: RequestHandler = async (req, res) => {
	const id = req.params.id;
	const data = await ClosetModel.findById(id);
    if (data === null) {
        res.json("Шкаф не найден");
    } else {
        await ClosetModel.findByIdAndUpdate(id, req.body)
		res.status(200);
        res.json("Информация успешно обновлена.")
    }
} 
import {RequestHandler} from "express";
import {ClosetModel} from "../../../models/furnitureModel";

export const deleteById: RequestHandler = async (req, res) => {
    const id = req.params.id;
    const data = await ClosetModel.findByIdAndDelete(id);
    if (data === null) {
        res.json("Шкаф не найден");
    } else {
        res.json("Шкаф удален");
    }
}
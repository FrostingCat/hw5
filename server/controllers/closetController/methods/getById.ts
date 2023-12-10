import {RequestHandler} from "express";
import {ClosetModel} from "../../../models/furnitureModel";

export const getById: RequestHandler = async (req, res) => {
    const id = req.params.id;
    const data = await ClosetModel.findById(id);
    if (data === null) {
        res.json("Шкаф не найден");
    } else {
        res.json(data);
    }
}
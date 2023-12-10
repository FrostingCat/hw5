import {RequestHandler} from "express";
import {ChairModel} from "../../../models/furnitureModel";

export const deleteById: RequestHandler = async (req, res) => {
    const id = req.params.id;
    const data = await ChairModel.findByIdAndDelete(id);
    if (data === null) {
        res.json("Стул не найден");
    } else {
        res.json("Стул удален");
    }
}
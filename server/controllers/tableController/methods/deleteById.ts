import {RequestHandler} from "express";
import {TableModel} from "../../../models/furnitureModel";

export const deleteById: RequestHandler = async (req, res) => {
    const id = req.params.id;
    const data = await TableModel.findByIdAndDelete(id);
    if (data === null) {
        res.json("Стол не найден");
    } else {
        res.json("Стол удален");
    }
}
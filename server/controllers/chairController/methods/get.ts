import {RequestHandler} from "express";
import {ChairModel} from "../../../models/furnitureModel";

export const get: RequestHandler = async (req, res) => {
    const params = req.query;
    const data = await ChairModel.find(params);
    if (data.length == 0) {
        res.json("В коллекции нет стульев");
    } else {
        res.json({data});
    }
}
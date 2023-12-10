import {RequestHandler} from "express";
import {ClosetModel} from "../../../models/furnitureModel";

export const get: RequestHandler = async (req, res) => {
    const params = req.query;
    const data = await ClosetModel.find(params);
    if (data.length == 0) {
        res.json("В коллекции нет шкафов");
    } else {
        res.json({data});
    }
}
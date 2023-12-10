import {Router} from "express";
import {post} from "./methods/post";
import {get} from "./methods/get";
import {getById} from "./methods/getById";
import {changeById} from "./methods/changeById";
import {deleteById} from "./methods/deleteById";

const router = Router();

const chairController = {
    post: post,
    get: get,
    getById: getById,
	changeById: changeById,
	deleteById: deleteById
}

router.post('/', chairController.post);
router.get('/', chairController.get);
router.get('/:id', chairController.getById)
router.put('/:id', chairController.changeById)
router.delete('/:id', chairController.deleteById)

export default router;
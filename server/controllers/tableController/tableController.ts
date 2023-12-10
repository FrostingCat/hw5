import {Router} from "express";
import {post} from "./methods/post";
import {get} from "./methods/get";
import {getById} from "./methods/getById";
import {changeById} from "./methods/changeById";
import {deleteById} from "./methods/deleteById";

const router = Router();

const tableController = {
    post: post,
    get: get,
    getById: getById,
	changeById: changeById,
	deleteById: deleteById
}

router.post('/', tableController.post);
router.get('/', tableController.get);
router.get('/:id', tableController.getById);
router.put('/:id', tableController.changeById)
router.delete('/:id', tableController.deleteById)

export default router;
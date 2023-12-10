import {Router} from "express";
import {post} from "./methods/post";
import {get} from "./methods/get";
import {getById} from "./methods/getById";
import {changeById} from "./methods/changeById";
import {deleteById} from "./methods/deleteById";

const router = Router();

const closetController = {
    post: post,
    get: get,
    getById: getById,
	changeById: changeById,
	deleteById: deleteById
}

router.post('/', closetController.post);
router.get('/', closetController.get);
router.get('/:id', closetController.getById)
router.put('/:id', closetController.changeById)
router.delete('/:id', closetController.deleteById)

export default router;
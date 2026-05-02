import  express from "express"
import { protect } from "../middleware/authMiddleware";
import { authorize } from "../middleware/rbac";
import { storeController, getStores } from "../controllers/storeController";


const router = express.Router();

router.post("/", protect, authorize("ADMIN"), storeController);
router.get("/", protect, authorize("ADMIN"), getStores);

export default router;
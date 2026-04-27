import  express from "express"
import { protect } from "../middleware/authMiddleware";
import { authorize } from "../middleware/rbac";
import { storeController } from "../controllers/storeController";


const router = express.Router();

router.post("/", protect, authorize("ADMIN"), storeController);

export default router;
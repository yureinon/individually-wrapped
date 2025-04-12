import express from "express";
import * as auth from "../controllers/authController.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const results = auth.login();
    res.send(results).status(200);
  } catch(error) {
    if (error) {
      res.status(404);
    }
  }
})

export default router;

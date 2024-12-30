import express from "express";
import {
  addExpense,
  getAllExpense,
  markAsDoneOrUndone,
  removeExpense,
  updateExpense,
} from "../controllers/expense.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/add").post(isAuthenticated, addExpense);
router.route("/getall").post(isAuthenticated, getAllExpense);
router.route("/remove/:id").post(isAuthenticated, removeExpense);
router.route("/update/:id").post(isAuthenticated, updateExpense);
router.route("/:id/done").post(isAuthenticated, markAsDoneOrUndone);

export default router;

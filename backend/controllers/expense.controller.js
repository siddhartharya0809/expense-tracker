import { Expense } from "../models/expense.model.js";

export const addExpense = async (req, res) => {
  try {
    const { description, amount, category } = req.body;
    const userId = req.id; // current loggedin user id
    if (!description || !amount || !category) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false,
      });
    }

    const expense = await Expense.create({
      description,
      amount,
      category,
      // to get the userID we need to check authentication
      userId,
    });

    return res.status(201).json({
      message: "Expense added successfully.",
      success: true,
      // expense
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllExpense = async (req, res) => {
  try {
    const userId = req.id; //logged in user id
    let category = req.query.category || "";
    let done = req.query.done || "";

    const query = {
      userId,
    };
    if (category.toLowerCase() === "all") {
      // no need to filter by cateogory
    } else {
      // filter by category
      query.category = { $regex: category, $options: "i" };
    }

    if (done.toLowerCase() === "true") {
      query.done = true;
    } else if (done.toLowerCase() === "undone") {
      query.done = false; // filter for expense mark as pending (False)
    }

    const expense = await Expense.find(query);

    if (!expense || expense.length === 0) {
      return res.status(404).json({
        message: "No expense found.",
        success: false,
      });
    }

    res.status(200).json({
      expense,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const markAsDoneOrUndone = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const done = req.body;
    const expense = await Expense.findByIdAndUpdate(expenseId, done, {
      new: true,
    });
    if (!expense) {
      return res.status(404).json({
        message: "Expense not found.",
        success: false,
      });
    }
    return res.status(200).json({
      message: `Expense marked as ${expense.done ? "done" : "undone"}.`,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeExpense = async (req, res) => {
  try {
    const expenseId = req.params.id; // get the expense id from the url
    await Expense.findByIdAndDelete(expenseId); // find the expense by id and delete it
    return res.status(200).json({
      message: "Expense deleted successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateExpense = async (req, res) => {
  try {
    const { category, description, amount } = req.body;

    const expenseId = req.params.id;
    const updateDate = { category, description, amount };
    const expense = await Expense.findByIdAndUpdate(expenseId, updateDate, {
      new: true,
    });

    return res.status(200).json({
      message: "Expense updated successfully.",
      success: true,
      expense,
    });
  } catch (error) {
    console.log(error);
  }
};

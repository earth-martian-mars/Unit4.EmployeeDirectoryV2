// routes/employees.js
import express from "express";
import employees from "#db/employees";

const router = express.Router();

// GET all employees
router.get("/", (req, res) => {
  res.send(employees);
});

// GET a random employee
router.get("/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.send(employees[randomIndex]);
});

// GET an employee by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const employee = employees.find((e) => e.id === +id);

  if (!employee) {
    return res.status(404).send("Employee not found");
  }

  res.send(employee);
});

// POST a new employee
router.post("/", (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== "string") {
    return res.status(400).send("Invalid request body or name");
  }

  const newEmployee = {
    id: employees.length + 1, // Unique ID based on array length
    name,
  };

  employees.push(newEmployee);
  res.status(201).send(newEmployee);
});

export default router;

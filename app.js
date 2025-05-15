import express from "express";
const app = express();
import employeesRouter from "./api/employees.js";

// Middleware to parse JSON request bodies
app.use(express.json());

app.route("/").get((req, res) => {
  res.send("Hello employees!");
});

app.use("/employees", employeesRouter);

// Note: this middleware has to come first! Otherwise, Express will treat
// "random" as the argument to the `id` parameter of /employees/:id.
app.route("/employees/random").get((req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.send(employees[randomIndex]);
});

app.route("/employees/:id").get((req, res) => {
  const { id } = req.params;
  
  // req.params are always strings, so we need to convert `id` into a number
  // before we can use it to find the employee
  const employee = employees.find((e) => e.id === +id);
  
  if (!employee) {
    return res.status(404).send("Employee not found");
  }
  
  res.send(employee);
});

// Catch-all error handling middleware
app.use((err, req, res, next) => {
  console.log(err);
  res.status(400).send("Internal Server Error");
})
export default app;
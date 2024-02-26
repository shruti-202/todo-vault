import * as React from "react";
import { useState } from "react";
import Fab from "@mui/material/Fab";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import alerts from "../utils/Alerts";
import { titleValidator, descriptionValidator } from "../constants/Validators";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  p: 4,
};

const addButtonStyle = {
  position: "fixed",
  bottom: 16,
  right: "calc(50% - 28px)",
};

const priorityOptions = [
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
];

export default function CreateTodo({ fetchTodos }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleInputTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleInputDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleInputPriority = (e, value) => {
    setPriority(value.value);
  };
  const handleInputDueDate = (value) => {
    setDueDate(value.format("DD-MM-YYYY"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title) {
      alerts("Please enter the Title", "error");
      return;
    }
    if (title?.length < 3 || title?.length >= 100) {
      alerts("Title should be more than 2 less than 100 characters", "error");
      return;
    }

    if (!titleValidator(title)) {
      alerts(
        "Invalid Title Format: Start with uppercase followed by lowercase & contains only alphabetical characters",
        "error"
      );
      return;
    }

    if (description.trim()) {
      if (description?.length < 4 || description?.length >= 500) {
        alerts(
          "Description should be more than 4 & less than 500 characters",
          "error"
        );
        return;
      }

      if (!descriptionValidator(description)) {
        alerts("Invalid Description Format: Start with Uppercase", "error");
        return;
      }
    }

    if (!priority || !dueDate) {
      alerts("Please fill all the required fields", "error");
      return;
    }

    fetch(
      "https://todo-d528e-default-rtdb.asia-southeast1.firebasedatabase.app/todo.json",
      {
        method: "POST",
        body: JSON.stringify({
          title: title,
          description: description,
          priority: priority,
          dueDate: dueDate,
          isCompleted: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(() => {
        alerts("Todo created successfully", "success");
        fetchTodos();
        handleClose();
      })
      .catch(() => {
        alerts("Something went wrong", "error");
      });
    setTitle("");
    setDescription("");
    setPriority("");
    setDueDate("");
  };
  return (
    <div>
      <Fab
        color="primary"
        size="medium"
        aria-label="add"
        onClick={handleOpen}
        sx={{
          ...addButtonStyle,
          backgroundColor: "var(--primary-color)",
          "&:hover": {
            backgroundColor: "var(--secondary-color)",
          },
        }}
      >
        <AddIcon />
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            required
            id="standard-required"
            label="Title"
            variant="standard"
            sx={{ mb: 2 }}
            fullWidth
            onChange={handleInputTitle}
          />
          <TextField
            id="standard-required"
            label="Description"
            variant="standard"
            sx={{ mb: 2 }}
            fullWidth
            onChange={handleInputDescription}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={priorityOptions}
            sx={{ mb: 2 }}
            fullWidth
            onChange={handleInputPriority}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Priority"
                variant="standard"
                required
              />
            )}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Basic date picker"
              sx={{ mb: 2, width: "100%" }}
              disablePast
              onChange={handleInputDueDate}
            />
          </LocalizationProvider>
          <Button
            variant="contained"
            sx={{
              mb: 2,
              fontSize: "bold",
              fontWeight: 500,
              backgroundColor: "var(--primary-color)",
              color: "white",
              "&:hover": {
                backgroundColor: "var(--secondary-color)",
              },
            }}
            fullWidth
            onClick={handleSubmit}
          >
            Create
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

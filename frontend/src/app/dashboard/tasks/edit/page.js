"use client";

import { useState } from "react";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

export default function EditTaskPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    console.log({
      title,
      description,
      priority,
      dueDate,
    });
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold">
        Edit Task
      </h1>

      <p className="mt-2 text-gray-600">
        Update your task details.
      </p>

      <div className="mt-6 bg-white rounded-xl shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">
              Task Title
            </label>

            <Input
              type="text"
              name="title"
              placeholder="Enter task title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Description
            </label>

            <Input
              type="text"
              name="description"
              placeholder="Enter task description"
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Priority
            </label>

            <select
              name="priority"
              value={priority}
              onChange={(event) =>
                setPriority(event.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Due Date
            </label>

            <Input
              type="date"
              name="dueDate"
              value={dueDate}
              onChange={(event) =>
                setDueDate(event.target.value)
              }
            />
          </div>

          <Button type="submit">
            Update Task
          </Button>
        </form>
      </div>
    </div>
  );
}
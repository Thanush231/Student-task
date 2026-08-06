import Input from "../ui/Input";
import Button from "../ui/Button";

export default function TaskForm() {
  return (
    <form className="space-y-4">

      <Input
        type="text"
        name="title"
        placeholder="Task Title"
      />

      <Input
        type="text"
        name="description"
        placeholder="Task Description"
      />

      <Button type="submit">
        Add Task
      </Button>

    </form>
  );
}
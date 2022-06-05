import "bootswatch/dist/darkly/bootstrap.min.css";
import { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";

type formElement = React.FormEvent<HTMLFormElement>;

interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);

  const handleSubmit = (e: formElement) => {
    e.preventDefault();

    const newTasks: ITask[] = [...tasks, { name: newTask, done: false }];
    setTasks(newTasks);
    console.log("TASK ", tasks);
  };

  const handleChange = (e: React.BaseSyntheticEvent) => {
    const nameTask: string = e.target.value;
    setNewTask(nameTask);
    console.log(nameTask);
  };

  const toogleCard = (i: number) => {
    const newTasks: ITask[] = [...tasks];
    newTasks[i].done = true;
    setTasks(newTasks);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="taskInput">
          <Form.Label>Task</Form.Label>
          <Form.Control
            type="text"
            placeholder="write a task"
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
      {tasks.map((item: ITask, i: number) => (
        <Card body key={i}>
          <h2 style={{ textDecoration: item.done ? "line-through" : "" }}>
            {item.name}
          </h2>
          {item.done && <Button variant="primary">X</Button>}
          {!item.done && (
            <Button variant="primary" onClick={() => toogleCard(i)}>
              ✔
            </Button>
          )}
        </Card>
      ))}
    </Container>
  );
}

export default App;

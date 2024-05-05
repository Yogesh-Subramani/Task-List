import Tasks from "../components/Tasks";
import { useSelector } from "react-redux";
import { Todo } from "../types";

const Important = () => {
    const todos = useSelector((state:{todos:Todo[]}) => state.todos);
    const importantTodos = todos.filter((todo:Todo) => todo.isImportant )

  return <Tasks title="Completed Tasks" tasks={importantTodos} />;
}

export default Important;
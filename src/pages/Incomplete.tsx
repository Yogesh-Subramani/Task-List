import Tasks from "../components/Tasks";
import { useSelector } from "react-redux";
import { Todo } from "../types";

const Completed = () => {
    const todos = useSelector((state:{todos:Todo[]}) => state.todos);
    const inCompleteTodos = todos.filter((todo:Todo) => !todo.isCompleted )

  return <Tasks title="Completed Tasks" tasks={inCompleteTodos} />;
}

export default Completed;
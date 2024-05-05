import Tasks from "../components/Tasks";
import { useSelector } from "react-redux";
import { Todo } from "../types";

export default function Home() {
    const todos = useSelector((state:{todos:Todo[]}) => state.todos);

  return <Tasks title="All Tasks" tasks={todos} />;
}
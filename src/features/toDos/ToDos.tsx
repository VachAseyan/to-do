import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addToDo, editToDo, filterByDone, selectToDos } from "./toDosSlice";
import ToDo from "../toDo/ToDo";
import style from "./ToDos.module.css";

function ToDos() {
    const [inputValue, setInputValue] = useState("");
    const todos = useAppSelector(selectToDos);
    const dispatch = useAppDispatch();

    const handleAddToDo = () => {
        if (inputValue.trim()) {
            dispatch(addToDo({ value: inputValue, id: Math.random(), isDone: false }));
            setInputValue("");
        }
    };

    const handlefilterByDone = () => {
        dispatch(filterByDone());
    }

    useEffect(() => {
        localStorage.setItem("toDos", JSON.stringify(todos));
    }, [todos]);

    return (
        <div className={style.container}>
            <h1 className={style.title}>To Do List</h1>
            <div className={style.inputGroup}>
                <input
                    type="text"
                    className={style.input}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Add a new task..."
                />
                <button
                    className={style.addButton}
                    onClick={handlefilterByDone}
                >
                    Filter by done
                </button>
                <button
                    className={style.addButton}
                    onClick={handleAddToDo}
                >
                    Add
                </button>
            </div>
            <div className={style.todosList}>
                {todos.map(todo => (
                    <ToDo
                        key={todo.id}
                        id={todo.id}
                        isDone={todo.isDone}
                        value={todo.value}
                    />
                ))}
            </div>
        </div>
    );
}

export default ToDos;
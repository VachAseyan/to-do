import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { deleteToDo, editToDo, markDone } from "../toDos/toDosSlice";
import style from "./ToDo.module.css";

const ToDo = ({ id, value, isDone }) => {
    const [editMode, setEditMode] = useState(false);
    const [editValue, setEditValue] = useState(value);
    const dispatch = useAppDispatch();

    const toggleEditMode = () => {
        setEditMode(!editMode)
    }

    const handleDeleteToDo = (id) => {
        dispatch(deleteToDo({ id }));
    }

    const handleMarkDone = (id) => {
        dispatch(markDone({ id }));
    }

    const editToDoo = (id, newValue) => {
        dispatch(editToDo({ id, newValue }));
    };

    const handleSave = () => {
        editToDoo(id, editValue);
        toggleEditMode();
    }

    const handleCancel = () => {
        setEditValue(value);
        toggleEditMode();
    }

    return (
        <div className={style.todoItem}>
            {!editMode ? (
                <>
                    <div className={style.todoContent}>
                        <input
                            type="checkbox"
                            className={style.todoCheckbox}
                            onChange={() => handleMarkDone(id)}
                            checked={isDone}
                        />
                        <h1 className={`${style.todoText} ${isDone ? style.completed : ''}`}>
                            {value}
                        </h1>
                    </div>
                    <div className={style.buttonGroup}>
                        <button
                            className={`${style.button} ${style.editButton}`}
                            onClick={toggleEditMode}
                        >
                            Edit
                        </button>
                        <button
                            className={`${style.button} ${style.deleteButton}`}
                            onClick={() => handleDeleteToDo(id)}
                        >
                            Delete
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <input
                        type="text"
                        className={style.editInput}
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                    />
                    <div className={style.editControls}>
                        <button
                            className={`${style.button} ${style.saveButton}`}
                            onClick={handleSave}
                        >
                            Save
                        </button>
                        <button
                            className={`${style.button} ${style.cancelButton}`}
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

export default ToDo;
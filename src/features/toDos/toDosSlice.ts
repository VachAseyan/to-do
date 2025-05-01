import { createAppSlice } from "../../app/createAppSlice"

const initialState = {
    toDos: JSON.parse(localStorage.getItem("toDos")) ?? [],
}


export const toDoSlice = createAppSlice({
    name: "todos",
    initialState,
    reducers: create => ({
        addToDo: create.reducer((state, action) => {
            state.toDos.push(action.payload)
        }),
        deleteToDo: create.reducer((state, action) => {
            state.toDos = state.toDos.filter(todo => todo.id !== action.payload.id)
        }),
        markDone: create.reducer((state, action) => {
            state.toDos = state.toDos.map(todo => {
                if (todo.id === action.payload.id) {
                    todo.isDone = !todo.isDone
                }
                return todo
            })
        }),
        editToDo: create.reducer((state, action) => {
            state.toDos = state.toDos.map(todo => {
                if (todo.id === action.payload.id) {
                    todo.value = action.payload.newValue
                }
                return todo
            })
        }),
        filterByDone: create.reducer(state => {
            state.toDos = state.toDos.filter(todo => todo.isDone === false)
        }),
        deleteAll: create.reducer(state => {
            state.toDos = []
        }),

    }),
    selectors: {
        selectToDos: state => state.toDos
    }

})

export const { addToDo, deleteToDo, markDone, editToDo, filterByDone, deleteAll } = toDoSlice.actions
export const { selectToDos } = toDoSlice.selectors

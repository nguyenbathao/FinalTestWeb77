import { useEffect, useState } from "react"
import { MdDelete } from "react-icons/md"

function Todo({
  menuActive,
  todo,
  reload,
  setReload,
  deleteTodo
}) {
  const [test, setTest] = useState(todo.checked)

  function handleCheckbox(event) {
    setTest(event.target.checked)
    todo.checked = event.target.checked
    setReload(!reload)
  }

  useEffect(() => {}, [test, todo.checked])

  return (
    <div className='todoContainer'>
      <div className='todo'>
        <input
          type="checkbox"
          name="checkbox"
          id={todo.id}
          className='checkbox'
          onChange={handleCheckbox}
          checked={todo.checked}
        />

        <label htmlFor={todo.id} className='label'>
          {todo.text}
        </label>
      </div>

      {menuActive === "completed" ? (
        <MdDelete
          className='deleteIcon'
          onClick={() => deleteTodo(todo.id)}
        />
      ) : null}
    </div>
  )
}

export default Todo
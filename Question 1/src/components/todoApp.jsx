import { useEffect, useState } from "react"
import {useLocation} from "react-router-dom"
import "../index.css"
import Todo from "./todo"
import { MdDelete } from "react-icons/md";


function Home() {
  const [menuActive, setMenuActive] = useState("all")
  const [todo, setTodo] = useState("")
  const [todoList, setTodoList] = useState([])
  const [reload, setReload] = useState(false)
  // const location = useLocation();
  
  // useEffect(() => {
  //   const withDone = new URLSearchParams(location.search).get('withDone') === '1';
  //   setMenuActive(withDone? "all" : "active");
  // }, [location.search]);

  function handleChange(event) {
    setTodo(event.target.value)
  }

  function addTodo(event) {
    event.preventDefault()

    var item = {
      id: Math.random().toString() + todo,
      text: todo,
      checked: false
    }

    setTodoList(prev => {
      return [...prev, item]
    })

    setTodo("")
  }

  function deleteTodo(id) {
    const remainingItems = todoList.filter(item => {
      return item.id !== id
    })

    setTodoList(remainingItems)
    localStorage.setItem("todos", JSON.stringify(remainingItems));
  }

  useEffect(() => {
    const storedTodoList = JSON.parse(localStorage.getItem('todoList'))
    if (storedTodoList) {
      setTodoList(storedTodoList)
    }
  }, [])

  function deleteCompleted() {
    const remainingItems = todoList.filter(item => {
      return item.checked !== true
    })

    setTodoList(remainingItems)
    setMenuActive("all")
  }

  useEffect(() => {}, [reload])

  return (
    <>
      <main className='main'>
        <div className='menu'>
          <div
            className='menuOption'
            onClick={() => setMenuActive("all")}
          >
            <span>Tất cả</span>
            <div
              className={
                menuActive === "all" ? 'underlineActive' : 'underline'
              }
            ></div>
          </div>

          <div
            className='menuOption'
            onClick={() => setMenuActive("active")}
          >
            <span>Chưa Hoàn Thành</span>
            <div
              className={
                menuActive === "active"
                  ? 'underlineActive'
                  : 'underline'
              }
            ></div>
          </div>

          <div
            className='menuOption'
            onClick={() => setMenuActive("completed")}
          >
            <span>Đã Hoàn Thành</span>
            <div
              className={
                menuActive === "completed"
                  ? 'underlineActive'
                  : 'underline'
              }
            ></div>
          </div>
        </div>
        <hr className='hr' />

        {menuActive !== "completed" ? (
          <form onSubmit={addTodo}>
            <div className='inputContainer'>
              <input
                type="text"
                name="todo"
                placeholder="Thêm Nhiệm Vụ"
                className='input'
                onChange={handleChange}
                value={todo}
              />

              <button
                type="submit"
                className='addButton'
                disabled={todo ? false : true}
              >
                Thêm
              </button>
            </div>
          </form>
        ) : null}

 
        {todoList
          ? todoList.map(item => {
              if (menuActive === "completed" && !item.checked) {
                return
              } else if (menuActive === "active" && item.checked) {
                return
              }

              return (
                <Todo
                  key={item.id}
                  menuActive={menuActive}
                  todo={item}
                  reload={reload}
                  setReload={setReload}
                  deleteTodo={deleteTodo}
                />
              )
            })
          : null}

        {menuActive === "completed" ? (
          <div className='deleteContainer'>
            <button
              type="button"
              className='deleteButton'
              onClick={deleteCompleted}
            >
              <MdDelete/>
              <span>Xóa Tất Cả</span>
            </button>
          </div>
        ) : null}
      </main>
    </>
  )
}
 export default Home
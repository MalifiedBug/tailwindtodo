import "./App.css";
import { useState, useEffect } from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";

function App() {
  const [todo, setTodo] = useState("");
  const [done, setDone] = useState(false);
 const [todoList, setTodoList] = useState([])
 const [dt, setDt] = useState("")
  


  const MyTextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]

    // which we can spread on <input>. We can use field meta to show an error

    // message if the field is invalid and it has been touched (i.e. visited)

    const [field] = useField(props);

    return (
      <div>
        <label htmlFor={props.id || props.name}>{label}</label>
        <input className="text-input" {...field} {...props} />       
      </div>
    );
  };

  useEffect(()=>{
    setDt(new Date().toLocaleString())
  },[todo,done,todoList,dt])

  function handleDelete(id){
     setTodoList(todoList.filter((t)=>t!==todoList[id]))
  };
 

  return (
    <div className="App antialiased bg-slate-200 text-slate-700 mx-2">
      <div class="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
        <div class="flex flex-col justify-between items-center">
          <div className="flex justift-center">
            <h1 class="text-3xl font-medium">Tasks list</h1>
          </div>          
        </div>
        <Formik
          initialValues={{
            item: "",
          }}
          validationSchema={Yup.object({
            item: Yup.string()
              .max(15, "Must be 15 characters or less")
              .required("Required"),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              setSubmitting(false);
            }, 4000);            
            setTodo((values.item)); 
            let copy = [...todoList];
            copy.push(values.item); 
            setTodoList(copy);
            setDt(new Date().toLocaleString());
            resetForm();                                                   
          }}
        >   
          <Form autocomplete="off" className="inputform flex items-center border-b my-4">
            <MyTextInput
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="item"
              type="text"
              placeholder="add todo"
                                        
              // onInput={(e) => {
              //   setTodo(e.target.value);
              // }}   
                        
            />
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </Form>
        </Formik>
        <br></br>
        <p class="text-slate-500">Hello, here are your latest tasks</p>

        <div id="tasks" class="my-5">
          {todoList.map((t,index)=>(<Task todo={t} id={index} setDone={setDone} handleDelete={handleDelete} />))}
                   
        </div>
        <p class="text-xs text-slate-500 text-center">
          Last updated : {dt}
        </p>
      </div>
    </div>
  );
}

function Task({todo,id,setDone,handleDelete}) {
  const[complete, setComplete] = useState(false);

  useEffect(()=>{setDone(complete)})
  

  return (
    <div
      id={id}
      class="flex justify-between items-center border-b border-slate-200 py-3 px-2 border-l-4  border-l-transparent"
    >
      <div  class="inline-flex items-center space-x-2">
        <div>
          {complete? <svg
          onClick={()=>setComplete(false)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="green"
            class="w-6 h-6 text-slate-500"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>:
          <svg onClick={()=>setComplete(true)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-slate-500 hover:text-indigo-600 hover:cursor-pointer">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>}
          
        </div>
        {complete?<div class="text-slate-500 line-through">{todo}</div>:<div class="text-slate-500">{todo}</div>}
        
         </div>
      <div>
        <button onClick={()=>{handleDelete(id)}}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4 text-slate-500 hover:text-slate-700 hover:cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default App;

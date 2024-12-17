import { useEffect, useState } from "react";
import { IoIosRemoveCircle } from "react-icons/io";
import { IoIosAddCircle } from "react-icons/io";
import { db } from '../Firebase.js';
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { SignOut } from "./Signout.jsx";

const ListTask = ({ user }) => {
    const [loading, setLoading] = useState(true)
    const [newTask, setNewTask] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const [tasklists, setTasklists] = useState([])
    
    const fetchTasks = async () => {
        try {
            const collectionRef = collection(db, 'tasklists')
            const querySnapshot = await getDocs(collectionRef)
            const tasklists = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })) 


            setTasklists(tasklists)
            setLoading(false)
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        fetchTasks()
    }, [])

    const handleToggleTasklist = async (id, completed) => {
        const tasklistRef = doc(db, 'tasklists', id)
        await updateDoc(tasklistRef, {
            completed: !completed
        })

        setTasklists(tasklists.map(tasklist => (
            tasklist.id === id ? {...tasklist, completed: !completed } : tasklist
        )))
    }

    const handleRemoveTasklist = async(id) => {
        const taskRef = doc(db, 'tasklists', id)
        await deleteDoc(taskRef)
        setTasklists(tasklists.filter(tasklist => tasklist.id !== id))
    }

    const handleNewTask = async () => {
        const collectionRef = collection(db, 'tasklists')
        const docRef = await addDoc(collectionRef, {
            title: newTask,
            description: newDescription,
            completed: false
        })
        setTasklists([...tasklists, {id: docRef.id, title: newTask, description: newDescription, completed: false}])
        setNewTask('')
        setNewDescription('')
    }

        if (loading) return <>Loading...</>

        return (
            <>
                <div className="box">
                    
                    <h1>Welcome, {user.displayName || user.email}!</h1>

                    <div className="center">
                        <h3>Here's your customizable task list.</h3>

                        <input type="text" className="user-input" value={newTask} placeholder='Task Name' onChange={(e) => setNewTask(e.target.value)}/> <br />
                        <input type="text" className="user-input" value={newDescription} placeholder="Description of task" onChange={(e) => setNewDescription(e.target.value)}/> <br />
                        <button className="add-button" onClick={handleNewTask}><IoIosAddCircle /> Add </button> <br />            

                        {tasklists.map(tasklist => (
                            <li key={tasklist.id}>
                                <input type="checkbox" checked={tasklist.completed} onChange={() => handleToggleTasklist(tasklist.id, tasklist.completed)} />
                                <span className={tasklist.completed ? "completed-task" : "pending-task"}>{tasklist.title} - {tasklist.description}</span>
                                <button className="remove-button" onClick={() => handleRemoveTasklist(tasklist.id)}><IoIosRemoveCircle /> Remove </button>
                            </li>
                        ))}
                        <SignOut />
                    </div>
                </div>        
            </>
    )
}

export default ListTask
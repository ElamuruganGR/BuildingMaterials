import React, {useState} from 'react'
// import axios from 'axios'
// import UseStateWithCleanUpChild from './FunctionChildLifeCycle'
// import FunctionChild from './FunctionChildLifeCycle'
// import {Provider} from './UserContext'

export default function FunctionalComponent(){
    const defaultValue = 0
    const [number,SetNumber] = useState(null)
    const handleFocus = (event) => {
        SetNumber(null)
    }
    return (
        <div>
            <form>
                <input type="number" placeholder={defaultValue} onFocus={handleFocus} value={number} />
                <button>Submit</button>
            </form>
        </div>
    )
}
// function useStateWithObject(){
//     const [person, setPerson] =  useState({firstName : "", lastName : ""})
//     return(
//         <div>
//             <div>FirstName : <input type="text" onChange = {(event) => setPerson({...person, firstName : event.target.value})} value = {person.firstName}/></div>
//             <div>LastName  : <input type="text" onChange = {(event) => setPerson({...person, lastName : event.target.value})} value = {person.LastName}/></div>
//             <div>{JSON.stringify(person)}</div>

//         </div>
//     )
// }
// export default useStateWithObject


// function useStateWithArray(){
//     const [items, setItems] = useState([])
//     const addItems = () => {
//         setItems([
//          ...items,
//          {
//              id : items.length,
//              vlaue : Math.floor(Math.random() * 10) + 1
//          }   
//         ])
//     }
//     return(
//         <div>
//             <button onClick = {addItems}>Add Items</button>
//             <div>
//                 <ul>
//                 {items.map((item) => (<li key = {item.id}>{item.vlaue}</li>))}
//                 </ul>
//             </div>
//         </div>
//     )
// }
// export default useStateWithArray

// function useEffectAfterRender(){
//     //This is replacing componentDidMount() and componentDidUpdate()
//     const [name, setName] = useState("")
//     const [count, setCount] = useState(0)
//     useEffect(() => {
//         console.log("componentDid Mount and ComponentDidUpdate only for count")
//         document.title = `Clicked ${count} times`
//     })
//     return(
//         <div>
//             <input type="text" onChange = {(event) => setName(event.target.value)} value = {name}/>
//             <button onClick = {() => setCount((prevCount) => prevCount + 1)}>Clicked {count} times</button>
//             <div>{name}</div>
//         </div>
//     )
// }
// export default useEffectAfterRender

// function useEffectConditionallyRuns(){
//     // This method is replacing componentDidMount() and componentDidUpdate() but based on condition
//     const [count, setCount] = useState(0)
//     const [name, setName] = useState("")
//     useEffect(
//         () => {
//             console.log("componentDidMount and componentDidUpdate")
//             document.title = `Clicked ${count} times`
//         }, [count]
//     )
//     return(
//         <div>
//             <input type="text" onChange = {(event) => {setName(event.target.value)}} value={name}></input>
//             <button onClick = {() => {setCount((prevCount) => (prevCount + 1))}}>Clicked {count} times</button>
//             {JSON.stringify(name)}
//         </div>
//     )   
// }
// export default useEffectConditionallyRuns

// function useEffectsRunOnlyOnce(){
//     // This method is replacing componentDidMount()
//     const [name, setName] = useState("")
//     const [count, setCount] = useState(0)
//     useEffect(
//         () => {
//             console.log("ComponentDidMount")
//             document.title = `Clicked ${count} times`
//         }, []
//     )
//     return(
//         <div>
//             <input type="text" onChange = {(event) => {setName(event.target.value)}} value={name}></input>
//             <button onClick = {() => {setCount(prevCount => prevCount + 1)}}>Clicked {count} times</button>
//             {JSON.stringify(name)}
//         </div>
//     )

// }
// export default useEffectsRunOnlyOnce

// function useEffectsWithMouseMove(){
//     // This method is replacing componentDidMount()
//     const [x, setX] = useState(0)
//     const [y, setY] = useState(0)
//     useEffect(
//         () => {
//             console.log("ComponentDidMount")
//             window.addEventListener("mousemove", (event) => {setX(event.clientX); setY(event.clientY)})
//         },[]
//     )
//     return(
//         <div>
//             Hooks X - {x},    Y - {y}
//         </div>
//     )

// }
// export default useEffectsWithMouseMove


// export default function useEffectsWithCleanUpParent(){
//     const [display, setDisplay] = useState(true)
    
//     return(
//         <div>
//             <button onClick = {() => {setDisplay(!display)}}>ToggleDisplay</button> 
//             {display}           
//             {display && <UseStateWithCleanUpChild />}
//         </div>
//     )
// }
// export default function useEffectsWithFetching(){
//     useEffect(
//         () => {
//             axios.get("http://services.groupkt.com/country/get/all")
//             .then(response => console.log(response.data))
//         },[]
//     )
//     return(
//         <div>

//         </div>
//     )
// }
// function UseContextMethod(){
//     const value = 'Text from Context Provider'
//     return (
//         <div>
//             <Provider value = {value}>
//                 <FunctionChild />
//             </Provider>
//         </div>
//     )
// }
// export default UseContextMethod


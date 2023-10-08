import { useState, useCallback,useEffect,useRef } from 'react'


function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passRef=useRef(null)

  const genPass = useCallback(() => {

    let pass = "";
  
  let  str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()[]~/"

    for (let i = 1; i <= length; i++) {

      let idx = Math.floor(Math.random() * str.length )
      pass += str.charAt(idx)

    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  const copypassword=useCallback(()=>{
      passRef.current?.select()

      window.navigator.clipboard.writeText(password)
      
  },[password])

  useEffect(() => {
   genPass()
  }, [length, numberAllowed, charAllowed,genPass])


  return (
    <>

      <div className=' max-w-md mx-auto hadow-md rounded-lg px-4 py-10 my-8 text-red-300 bg-gray-500'>
        <h1 className="text-yellow-400 text-center my-2"><b>Password Generator</b></h1>
        <div className="  flex-shadow rounded-lg overflow-hidden mb-4 ">

          <input type="text" value={password} className='outline-none py-1 px-3' placeholder="password" readOnly ref={passRef} />
          <button onClick={copypassword}  className="outline-none bg-blue-700 text-white  px-3 py-0.5 shrink-0">copy</button>

        </div>

        <div className='flex text-sm gap-x-2'>

          <div className='flex items-center gap-x-1'>

             <input  type='range' min={6} max={100} value={length} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}} />
             <label>Length:{length}</label>

          </div>

          <div classname='flex items-center gap-x-1'>
               <input type="checkbox" defaultChecked={numberAllowed} id="numberInput" onChange={()=>{setNumberAllowed((prev)=>!prev)}}  />
               <label>Numbers</label>
          </div>
          <div classname='flex items-center gap-x-1'>
               <input type="checkbox" defaultChecked={charAllowed} id="numberInput" onChange={()=>{setCharAllowed((prev)=>!prev)}}  />
               <label>Characters</label>
          </div>

        </div>

      </div>


    </>
  )
}

export default App

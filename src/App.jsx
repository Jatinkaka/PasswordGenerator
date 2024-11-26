import { useCallback, useEffect, useState, useRef } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [char, setChar] = useState(false)
  const [password, setPassword] = useState("")

  //useRef HOOK

  const passwordRef = useRef(null);



  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(number) str += "0123456789";
    if(char) str += "!@#$%^&*(){}:!@#$%^&*(){}:!@#$%^&*(){}:";

    for(let i = 1; i <= length; i++){
      let chr = Math.floor(Math.random() * str.length + 1)
    
      pass += str.charAt(chr)   

    }

    setPassword(pass)

  }, [length, number, char, setPassword] )
  
  
  const copyPass = useCallback(()=> {
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0,3);  // TO SELECT SPECIFIC NUMBERS OF CHARACTERS 
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    passwordGenerator()

  }, [length, number, char, passwordGenerator])

 
  return (
    <>

   <div className='w-full max-w-md mx-auto shadow-md rounded-lg my-8 py-4 text-orange-500 bg-gray-700 ' >

   <h1 className='text-white my-4 text-center' >Password Generator</h1>
 
   <div className='flex shadow rounded-lg overflow-hidden mb-4'>

    <input 
    type="text"
    value={password} 
    className='outline-none w-full py-1 px-3 ml-3'
    placeholder='Password'
    readOnly
    ref={passwordRef}
    />
    <button onClick={copyPass} className='outline-none bg-blue-700 text-white px-3 mr-3 shrink-0' >Copy</button>

   </div>

   <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1' >
        <input 
        type="range"
        min={6}
        max={50}
        value={length}
        className='cursor-pointer'
        onChange={(e) => {setLength(e.target.value)}}/>
        <label>Length : {length}</label>
      </div>

      <div className='flex items-center gap-x-1'>
        <input type="checkbox"
        defaultChecked={number}
        id='numberInput'
        onChange={() => {
          setNumber((prev) => !prev);
        }}
        />
        <label htmlFor="numberInput">Number</label>
      </div>

      <div className='flex items-center gap-x-1'>
        <input type="checkbox"
        defaultChecked={char}
        id='charInput'
        onChange={() => {
          setChar((prev) => !prev);
        }}
        />
        <label htmlFor="charInput">Character</label>
      </div>


   </div>
  </div>
      
    </>
  )
}

export default App

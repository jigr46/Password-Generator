import { useState, useCallback,useEffect,useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [allowedNumber, setAllowedNumber] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (allowedNumber) str += "0123456789"
    if (charAllowed) str += "@$*_-!"

    for (var i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length )
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, allowedNumber, charAllowed, setPassword])

  const copyToClickBoard = useCallback(()=>{
   passwordRef.current?.select()
   window.navigator.clipboard.writeText(password)
  },[password])

useEffect(()=>{
  passwordGenerator()
},[length,allowedNumber,charAllowed,passwordGenerator])

  return (
    <>

      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-center mb-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type='text'
            value={password}
            placeholder='password'
            className='w-full outline-none py-1 px-3'
            readOnly
            ref={passwordRef}
          />
          <button 
          className='outline-none bg-blue-500 text-white p-2 shrink-0'
          onClick={ copyToClickBoard}
          >copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
           <input 
           type="range" 
           min={8} 
           max={100} 
           value={length} 
           className='cursor-pointer'
           onChange={(e)=>{setLength(e.target.value)
           }}
           />
           <label>Length : {length}</label>
           </div>

           <div className='flex items-center gap-x-1'>
              <input
              type='checkbox'
             defaultValue={allowedNumber}
             id="numberInput"
             onChange={()=>{
              setAllowedNumber((prev) => !prev);
               }}
              />
              <label>Number</label>
           </div>
           <div className='flex items-center gap-x-1'>
              <input
              type='checkbox'
             defaultValue={charAllowed}
             id="characterInput"
             onChange={()=>{
              setCharAllowed((prev) => !prev);
               }}
              />
              <label>Character</label>
           </div>

       
    
        </div>



      </div>
    </>
  )
}

export default App

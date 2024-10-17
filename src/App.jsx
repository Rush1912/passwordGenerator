import { useCallback, useEffect, useState,useRef} from 'react'

function App() {

  const[length,setLength]=useState(8);
  const[isNumber,setIsNumber]=useState(false);
  const[isCharacter,setIsCharacter]=useState(false);
  const [password,setPassword]=useState("");
  
  const passwordRef=useRef(null)


  const passwordGenerator = useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(isNumber)
      {
        const additional="1234567890";
        str+=additional;
        pass+=additional[Math.floor(Math.random()* additional.length)]
      } 
    if(isCharacter) 
      {
        const additional="!@#%^&$~*)(_-></+";
        str+=additional;
        pass+=additional[Math.floor(Math.random()* additional.length)]
      }
    for(let i=0;i<length;i++)
    {
        const char =Math.floor(Math.random() * str.length)
        console.log(char);
        pass+=str[char];
        
    }
    setPassword(pass);
  
  },[length,isNumber,isCharacter,setPassword])
 useEffect(()=>{
  passwordGenerator();
 },[length,isNumber,isCharacter,passwordGenerator])

 const copyPassword=useCallback(()=>{
  passwordRef.current?.select();
  window.navigator.clipboard.writeText(password)               //COPY MECHANISM
 },[password])
  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg my-8 px-4 bg-gray-900 text-orange-400 '>
      <h1 className='text-white text-center my-3'>PASSWORD GENERATOR</h1> 
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type='text'
        value={password}
        className='outline-none w-full py-1 px-3  rounded-lg'
        placeholder='Password'
        readOnly
        ref={passwordRef}
        />
        <button
        onClick={copyPassword}
        className='bg-blue-700 text-white text-center px-2.5 py-2.5 shrink-0 ml-2  font-bold rounded-lg hover:bg-blue-950'>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2 m-4 pb-10 '>
        <div className='flex items-center gap-x-1 '>
          <input
          type="range"
          min={8}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1 '>
          <input
          type="checkbox"
          defaultChecked={isNumber}
          onChange={() => {setIsNumber((prev) => !prev);

          }}
          />
          <label>Number{isNumber}</label>
        </div>
        <div className='flex items-center gap-x-1 '>
          <input
          type="checkbox"
          defaultChecked={isCharacter}
          onChange={() => {setIsCharacter((prev) => !prev);

          }}
          />
          <label>Character{isCharacter}</label>
        </div>
      </div>
     </div>
    </>
  )
}

export default App

/* eslint-disable no-unused-vars */
import React from 'react'
import { Typewriter } from 'react-simple-typewriter'

const Home = () => {
  return (
    <div className='flex items-center justify-center w-full h-screen bg-gray-950'>
       <div>
        <h1 style={{ color: 'red', fontSize: "64px", fontWeight: 'bold' }}>
        <Typewriter
            words={['WELCOME']}
              loop={false}
              cursor
              cursorStyle='|'
              typeSpeed={70}
              deleteSpeed={50}
            />
        </h1>
       </div>
    </div>
  )
}

export default Home

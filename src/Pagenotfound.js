import React from 'react'

const Pagenotfound = ({fetchError}) => {
  return (
    <main className='pagenotfound'>
        <p>{fetchError}</p>

    </main>
  )
}

export default Pagenotfound
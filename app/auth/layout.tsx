import React from 'react'

function layout({children}:{children:React.ReactNode}) {
  return (
    <div className='w-full h-screen bg-slate-200'>
      {children}
    </div>
  )
}

export default layout
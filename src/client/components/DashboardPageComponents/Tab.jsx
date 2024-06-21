import React from 'react'

const Tab = ({ active, onClick, children }) => {
  return (
    <button
    className={`${active ? 'bg-white text-[#3551A4]' : 'bg-[#202020] text-[#3551A4]'} w-1/3 h-full  text-[12px] rounded-[6px]`}
    onClick={onClick}
  >
    {children}
  </button>
  )
}

export default Tab
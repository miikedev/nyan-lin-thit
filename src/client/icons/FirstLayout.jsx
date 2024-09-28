import React from 'react'

const FirstLayout = ({color}) => {
  return (
    <>
        <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6.85034" width="13.1495" height="5.1028" fill={color}/>
        <rect x="0.373779" width="5.69159" height="13.5421" fill={color}/>
        <rect x="6.85034" y="5.88794" width="13.1495" height="7.65421" fill={color}/>
        </svg>
    </>
  )
}

export default FirstLayout
import React from 'react'
import LogoImage from '../../assets/logo.png'
const Logo = ({width}) => {
  return (
    <div>
        <img src={LogoImage} alt="logo" width={width}/>
    </div>
  )
}

export default Logo
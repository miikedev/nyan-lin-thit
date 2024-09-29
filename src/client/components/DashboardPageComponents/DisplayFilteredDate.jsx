import { Box } from '@mantine/core'
import React from 'react'

import Cicon from '../../../assets/ic_date.svg'

const DisplayFilteredDate = ({timeSpan}) => {
  return (
    <Box className="mb-[7px] bg-white w-[210px] h-[35px] border rounded-3xl px-3 flex items-center">
		<img
			src={Cicon}
			className="w-[15px] h-[15px] text-black"
		/>
		<p className="text-black text-[12px] ml-[16px]">
			{ timeSpan }
		</p>
	</Box>
  )
}

export default DisplayFilteredDate
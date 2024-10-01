import { Box } from '@mantine/core'
import React from 'react'
import { useSearchParams } from 'react-router-dom'

import M from '../../components/DashboardPageComponents/assets2/map.svg'

const DisplayLatlng = ({lat, lng}) => {
    const [searchParams] = useSearchParams()
    const latitude = searchParams.get('lat')
    const longitude = searchParams.get('lng')
    const location = latitude && longitude ? `${latitude}, ${longitude}` : `${lat}, ${lng}`;

    return (
        <>
        <Box className="flex items-center mb-[7px] xl:pl-[5px]">
            <img
                src={M}
                className="w-[15px] h-[15px] 2xl:w-[18px] 2xl:h-[18px] text-black"
            />
            <p className="text-black text-[11px] 2xl:text-[12px] font-[500] ml-[10px]">
                {location}
            </p>
        </Box>
        </>
    )
}

export default DisplayLatlng
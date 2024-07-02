import React from "react";
import {Pagination} from "@nextui-org/react";
import { ChevronIcon } from "../../icons/ChevronIcon";
import { usePaginationContext } from "../../context/PaginationContext";
const ResourcesPagination = ({pages, isPreviousData, data}) => {
    console.log('has more', data.hasMore)
    console.log('pages', pages)
    const { page, setPage} = usePaginationContext();
    return <Pagination 
        onChange={(pageNo)=>setPage(pageNo)} 
        total={pages}
        page={page}
        isDisabled={isPreviousData}
    />
}

export default ResourcesPagination
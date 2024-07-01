import { fetchResources } from "./apiService";
import { useQuery, useQueryClient } from '@tanstack/react-query'; // Removed unused import keepPreviousData
// Get QueryClient from the context


export const useResourcesData = (type, page, category, search) => {
  
  return useQuery({
    queryKey: [`resources/${type}/${page}/${category}/${search}`],
    queryFn: () => fetchResources(type, page, category, search),
    keepPreviousData : true,
    onSuccess: (data) => {
      console.log('resources fetch success!', data)
    }
  });
}

export const getResources = async(type, page, category) => {
  try {
    const response = await fetchResources(type, page, category);
    return response.data;
  } catch (error) {
    console.log(error)
    // Handle error...
  }
}

export const useACMS = (pageParams) => {
    console.log(pageParams)
    return useQuery({
      queryKey: ['acms', {page: pageParams}],
      queryFn: () => fetchPosts(pageParams),
      onSuccess: (data) => {
        console.log('fetch success', data)
      }
    });
}

export const useOthers = (pageParams) => {
  return useQuery({
    queryKey: ['others'],
    queryFn: () => fetchOther(pageParams),
    onSuccess: (data) => {
      console.log('fetch success', data)
    }
  });
}

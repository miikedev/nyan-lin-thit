
import './App.css'
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import Layout from './client/components/Layout'
import Home from './client/pages/Home'
import Dashboard from './client/pages/Dashboard'
import About from './client/pages/About'
import ResourcesLayout from './client/components/resources/ResourcesLayout'
import ResourcesList from './client/components/resources/ResourcesList'
import Error from './client/pages/Error'
import NotFound from './client/pages/NotFound'
import { weeklyHighlightsTags } from './utils/tags'
const queryClient = new QueryClient()
const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    console.log(weeklyHighlightsTags)
    <Route index element={<Home />} />
    <Route path='dashboard' element={<Dashboard />} />
    <Route path='resources' element={<ResourcesLayout tags={weeklyHighlightsTags} />}>
      <Route 
        path="weekly-highlights"
      >
        {
          weeklyHighlightsTags.map((tag) => {
            console.log(tag.to)
            return (
              <Route
                path={tag.to}
                key={tag.to}
                element={<ResourcesList type={tag.to} />}
              />
            )
          })
        }
      </Route>
    </Route>
    <Route path='about' element={<About />} />
    <Route path="error" element={<Error />} />
    <Route path="*" element={<NotFound />} />
  </Route>
))
function App() {
  console.log(weeklyHighlightsTags)
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App

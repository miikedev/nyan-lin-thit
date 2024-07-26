import { lazy, Suspense } from 'react'
import './App.css'
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import Layout from './client/components/Layout'
import Home from './client/pages/Home'
const Dashboard = lazy(()=> import('./client/pages/Dashboard'));
import About from './client/pages/About'
import ResourcesLayout from './client/components/resources/ResourcesLayout'
import ResourcesList from './client/components/resources/ResourcesList'
import Error from './client/pages/Error'
import NotFound from './client/pages/NotFound'
import Loading from './client/pages/Loading'
import { weeklyHighlightsTags, publicationTags, advocacyTags, statementTags } from './utils/tags'
import { SearchContextProvider } from './client/context/SearchContext'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchIntervalInBackground: false,
      cacheTime: 10_000,
      refetchOnWindowFocus: false,
    },
  },
})
const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} errorElement={<Error />}/>
    <Route path='dashboard' element={
      <Suspense fallback={<Loading />}>
        <Dashboard />
      </Suspense>
    } errorElement={<Error />} />
    <Route 
      path='resources' 
      element={<ResourcesLayout 
      weeklyHighlightsTags={weeklyHighlightsTags} 
      publicationTags={publicationTags} 
      statementTags={statementTags}
      advocacyTags={advocacyTags}
    />}>
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
                errorElement={<Error />}
              />
            )
          })
        }
      </Route>
      <Route 
        path="publications"
      >
        {
          publicationTags.map((tag) => {
            console.log(tag.to)
            return (
              <Route
                path={tag.to}
                key={tag.to}
                element={<ResourcesList type={tag.to} />}
                errorElement={<Error />}
              />
            )
          })
        }
      </Route>
      <Route 
        path="statements"
      >
        {
          statementTags.map((tag) => {
            console.log(tag.to)
            return (
              <Route
                path={tag.to}
                key={tag.to}
                element={<ResourcesList type={tag.to} />}
                errorElement={<Error />}
              />
            )
          })
        }
      </Route>
      <Route 
        path="advocacy"
      >
        {
          advocacyTags.map((tag) => {
            console.log(tag.to)
            return (
              <Route
                path={tag.to}
                key={tag.to}
                element={<ResourcesList type={tag.to} />}
                errorElement={<Error />}
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
  return (
    <SearchContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SearchContextProvider>
  )
}

export default App

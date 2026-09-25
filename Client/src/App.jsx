import { RouterProvider } from "react-router-dom"
import { router } from './routes/router.jsx'
import { Toaster } from "sonner"

function App() {

  return (
    <>
    <RouterProvider router={router} />
    <Toaster
  position="bottom-right"
  offset={{ bottom: 32, right: 24 }}
  mobileOffset={{ bottom: 24, right: 16 }}
  toastOptions={{
    unstyled: true,
    classNames: {
      toast: "flex w-full items-center gap-3 rounded-xl border px-4 py-3 shadow-lg",
      title: "text-sm font-semibold",
      description: "text-sm opacity-80",
      icon: "shrink-0",
      success: "border-green-200 bg-green-50 text-green-800",
      error: "border-red-200 bg-red-50 text-red-800",
      info: "border-brand/20 bg-brand-light/10 text-brand-dark",
    },
  }}
/>
    </>
  )
}

export default App

import AppRoute from "./Router/App.Route";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <AppRoute />
    </>
  )
}

export default App;

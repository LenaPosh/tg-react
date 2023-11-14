import {useEffect} from "react";
import {RouterProvider} from "react-router-dom";
import {router} from "./routes";

const tg = window.Telegram.WebApp;
function App() {


    useEffect( () => {
        tg.ready();
        tg.expand();
    }, [])

    const onClose = () => {
        tg.close()
    }
  return (
      <>
          <RouterProvider router={router}/>



      </>



  );
}

export default App;

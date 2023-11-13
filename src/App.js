
import {useEffect, useState} from "react";

import {RouterProvider} from "react-router-dom";
import {router} from "./routes";

const tg = window.Telegram.WebApp;
function App() {
    const [viewportStableHeight, setViewportStableHeight] = useState(0);

    useEffect(() => {
        const handleViewportChanged = (event) => {
            const { isStateStable, viewportStableHeight: newViewportStableHeight } = event.detail;

            if (isStateStable) {
                setViewportStableHeight(newViewportStableHeight);
                console.log('Stable viewport height:', newViewportStableHeight);
            }
        };

        window.addEventListener('viewportChanged', handleViewportChanged);

        return () => {
            window.removeEventListener('viewportChanged', handleViewportChanged);
        };
    }, []);

    useEffect( () => {
        tg.ready();
    }, [])

    const onClose = () => {
        tg.close()
    }
  return (
      <>
          <div>
              <p>Viewport Stable Height: {viewportStableHeight}px</p>
              <RouterProvider router={router}/>
          </div>


      </>



  );
}

export default App;

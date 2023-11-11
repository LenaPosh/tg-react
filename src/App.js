import './App.css';
import {useEffect} from "react";
const tg = window.Telegram.WebApp;
function App() {

    useEffect( () => {
        tg.ready();
    }, [])

    const onClose = () => {
        tg.close()
    }
  return (
      <div className='App'>
          <svg>
                  <path d="M0 2h32v4h-32zM0 8h32v4h-32zM0 14h32v4h-32zM0 20h32v4h-32zM0 26h32v4h-32z"></path>
          </svg>
          <button onClick={onClose}>Закрыть</button>
      </div>



  );
}

export default App;

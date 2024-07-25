import { useState } from "react";
import Spinner from "./components/Spinner";
import useLRUCache from "./contexts/useLRUCache";

function App() {
  const [content, setContent] = useState();
  const [loading, setLoading] = useState(false);

  const { get, put } = useLRUCache(3);

  async function loadContent(key) {
    let cachedValue = get(key);
    if (cachedValue) {
      console.log(`Data for tab ${key} is loaded from cache.`);
      cachedValue += " (cached data)";
      setContent(cachedValue);
      return;
    }
    await new Promise((res) => {
      setLoading(true);
      setTimeout(() => {
        res();
        setLoading(false);
      }, 1000);
    });

    const value = `Data for tab ${key}`;

    console.log(`Data for tab ${key} is fetched from Promise.`);
    put(key, value);
    setContent(value);
  }
  return (
    <div>
      <h1 className="title">LRU cache using linked list.</h1>
      <div className="btns">
        {[1, 2, 3, 4, 5].map((el, indx) => (
          <button key={indx} onClick={() => loadContent(el)}>
            Tab {el}
          </button>
        ))}
      </div>
      <div className="window">
        <div className="stripe">
          <div className="red dot"></div>
          <div className="yellow dot"></div>
          <div className="green dot"></div>
        </div>
        <div className="screen">{loading ? <Spinner /> : <p>{content}</p>}</div>
      </div>
    </div>
  );
}

export default App;

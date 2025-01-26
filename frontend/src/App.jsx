import { useEffect, useState } from "react";
import Header from "./components/layout/Header"
import { fetchHome } from "./services/api.service";

function  App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchHome();
      setData(response);
    };
    fetchData();
  }, []);

  return (
    <>
      <Header/>
      <div style={{ marginTop: '100px'}}>
        {data ? (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  )
}

export default App

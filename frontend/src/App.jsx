import Header from "./components/layout/Header"
import { fetchHome } from "./services/api.service";

function  App() {
  
  const fetch = async () => {
    const response = await fetchHome();
    console.log(response);
  }
  fetch();

  return (
    <>
      <Header/>
      <div style={{ marginTop: '10000px'}}>
jhjhg
      </div>
    </>
  )
}

export default App

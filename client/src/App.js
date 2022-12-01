import axios from "axios";
import { useState, useEffect } from "react";
function App() {
  const [data, setData] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://api.spoonacular.com/recipes/716429/information?apiKey=92319c9df23f46b19c428982982f8055"
      );
      console.log(response);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header"></header>
    </div>
  );
}

export default App;

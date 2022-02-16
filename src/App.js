import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const loadData = async () => {
    try {
      const response = await axios.get("https://randomuser.me/api/?results=10");
      // console.log(response.data);
      setUsers(response.data.results);
    } catch (err) {
      alert(err.message);
    }
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className="App">
      <button
        onClick={() => {
          loadData();
        }}
      >
        Lade User
      </button>
      <ul>
        {users.map((user, index) => {
          return (
            <li key={`users-${index}`}>
              {user.name.first} {user.name.last} {user.gender} {user.email}
              <img src={user.picture.large} alt="" />
            </li>
          );
        })}
      </ul>
      {JSON.stringify(users)}
    </div>
  );
}

export default App;

import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [userDetail, setUserDetail] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [userAlben, setUserAlben] = useState([]);

  // Namen die Stehen //
  const loadData = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(response.data);
    } catch (err) {
      alert(err.message);
    }
  };
  // Auswertung //
  const loadUserDetail = async (selectedAlbum) => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users/" + selectedAlbum
      );
      setUserDetail(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  // Auswertung mit Bild //
  const loadUserAlbum = async (userid) => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/albums/?userId=" + userid
      );
      setUserAlben(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadUserPhotos = async (albumid) => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/photos/?albumId=" + albumid
      );
      setSelectedPhotos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  useEffect(() => {
    if (selectedUser !== null) {
      loadUserDetail(selectedUser);
      loadUserAlbum(selectedUser);
    }
  }, [selectedUser]);
  useEffect(() => {
    if (selectedAlbum !== null) {
      loadUserPhotos(selectedAlbum);
    }
  }, [selectedAlbum]);
  // apidemo //
  return (
    <div className="App">
      <h1>API-DEMO</h1>
      <ul className="list">
        {users.map((user, index) => {
          return (
            <li key={`users-${index}`} onClick={() => setSelectedUser(user.id)}>
              {user.name} . {user.address.city} /
            </li>
          );
        })}
      </ul>
      {userDetail !== null ? (
        <div>
          <h1>Auswertung</h1>
          {userDetail.name} / {userDetail.email} / {userDetail.website}
          {userDetail.address.geo.lat}/{userDetail.address.geo.lng}
        </div>
      ) : undefined}
      <ul>
        {/* ausgabe */}

        {userAlben.map((album, index) => {
          return (
            <li
              key={`album-${index}`}
              onClick={() => setSelectedAlbum(album.id)}
            >
              {album.title}
            </li>
          );
        })}
      </ul>
      <ul>
        {selectedPhotos.map((photos, index) => {
          return (
            <li key={`photo-${index}`}>
              <img src={photos.thumbnailUrl} alt="" />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;

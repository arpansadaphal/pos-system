import { useState } from "react";
import api from "../api/axios";

const Stores = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const createStore = async () => {
    await api.post("/stores", { name, location });

    setName("");
    setLocation("");

    alert("Store created");
  };

  return (
    <div>
      <h2>Create Store</h2>

      <input
        placeholder="Store Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <button onClick={createStore}>Create</button>
    </div>
  );
};

export default Stores;
import Header from "./Header.js";
import Content from "./Content.js";
import Footer from "./Footer.js";
import { useState, useEffect } from "react";
import AddItems from "./AddItems.js";
import SearchItems from "./SearchItems.js";
import { useRef } from "react";
import apiRequest from "./apiRequest.js";
import Pagenotfound from "./Pagenotfound.js";
import ItemsLoading from "./ItemsLoading.js";

function App() {
  const ITEMS_API_URL = "http://localhost:3500/items";
  const DELTED_API_URL = "http://localhost:3600/deleted";
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  /* for search item*/
  const [search, setSearch] = useState("");

  /* state for displying error */
  const [fetchError, setFetchError] = useState(null);

  /* loding logic */
  const [isLoading, setIsLoading] = useState(true);

  /**keep the focus on the input after the click the plus icon */
  const inputRef = useRef();

  useEffect(() => {
    const fetchitem = async () => {
      try {
        const response = await fetch(ITEMS_API_URL);
        if (!response.ok) {
          throw new Error("The items not found");
        }
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    setTimeout(() => {
      (async () => await fetchitem())();
    }, 3000);
  }, []);

  /* patching item */
  const handleInputs = async (id) => {
    const listItems = items.map((item) =>
      id === item.id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);

    const updateData = listItems.filter((item) => item.id === id);
    const updateOption = {
      method: "PATCH",
      headers: {
        "content-style": "application/json",
      },
      body: JSON.stringify({ checked: updateData[0].checked }),
    };
    const ITEM_URL = `${ITEMS_API_URL}/${id}`;
    const result = await apiRequest(ITEM_URL, updateOption);
    if (result) setFetchError(result);
  };

  /* delete item */
  const handleTrash = async (id) => {
    // get the deleted item
    const deletedItem = items.find((item) => item.id === id);

    // remove item from main list
    const listItems = items.filter((item) => id !== item.id);
    setItems(listItems);

    // 1️⃣ Save deleted item into deleted.json
    const saveDeletedOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deletedItem),
    };

    const saveResult = await apiRequest(DELTED_API_URL, saveDeletedOption);
    if (saveResult) {
      setFetchError(saveResult);
      return;
    }

    // 2️⃣ Delete the item from main db.json
    const deleteOption = { method: "DELETE" };
    const ITEM_URL = `${ITEMS_API_URL}/${id}`;
    const result = await apiRequest(ITEM_URL, deleteOption);

    if (result) setFetchError(result);
  };

  /* Add Items section */
  function handleSubmit(e) {
    e.preventDefault();
    addItem(newItem);
    setNewItem("");
  }
  const addItem = async (item) => {
    const id = items.length
      ? (parseInt(items[items.length - 1].id, 10) + 1).toString() // ALWAYS STRING
      : "1"; // FIRST ID AS STRING
    const addNewItem = { id, checked: false, item };
    const listItems = [...items, addNewItem];
    setItems(listItems);

    const postOption = {
      method: "POST",
      headers: {
        // FIXED (must be headers)
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addNewItem),
    };

    const result = await apiRequest(ITEMS_API_URL, postOption);
    if (result) setFetchError(result);
  };

  return (
    <div className="App">
      <Header />
      <SearchItems search={search} setSearch={setSearch} />
      <AddItems
        inputRef={inputRef}
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <main>
        {isLoading ? (
          <ItemsLoading />
        ) : fetchError ? (
          <Pagenotfound fetchError={fetchError} />
        ) : (
          <Content
            items={items.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )}
            handleInputs={handleInputs}
            handleTrash={handleTrash}
          />
        )}
      </main>

      <Footer length={items.length} />
    </div>
  );
}

export default App;

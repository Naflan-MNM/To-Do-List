import Header from './Header.js';
import Content from './Content.js';
import Footer from './Footer.js';
import { useState,useEffect } from 'react';
import AddItems from './AddItems.js';
import SearchItems from './SearchItems.js';
import { useRef } from 'react';

function App() {
  const API_URL = 'http://localhost:3500/items'
  const [items,setItems] = useState([]);
  const [newItem,setNewItem] = useState('')

  /* for search item*/
  const [search,setSearch]=useState('');

  /* state for displying error */
  const [fetchError, setFetchError] = useState(null);

  /* loding logic */
  const [isLoading , setIsLoading] = useState(true);

  /**keep the focus on the input after the click the plus icon */
  const inputRef = useRef();

  useEffect(()=>{
    const fetchitem = async()=>{
      try{
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('404: Items not found');
        }
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null);

      }catch (err){
        setFetchError(err.message)
      }finally{
        setIsLoading(false)
      }
    }
    setTimeout(()=>{
      (async () => await fetchitem())()},2000)
  },[])

  function handleInputs(id) {
    const listItems = items.map((item)=>
      id === item.id ? {...item, checked:!item.checked} : item);
    setItems(listItems);
  }

  function handleTrash(id){
    const listItems = items.filter((item)=> id!==item.id);
    setItems(listItems);
  }

  /* Add Items section */
  function handleSubmit(e){
    e.preventDefault()
    addItem(newItem)
    setNewItem('')
  }
  const addItem = (item) =>{
    const id = (items.length)+1
    const addNewItem = {id, checked:false, item}
    const listItems = [...items,addNewItem];
    setItems(listItems);
  }

  return (
    <div className='App'>
      <Header
      />
      <SearchItems
          search = {search}
          setSearch = {setSearch}
      />
      <AddItems
        inputRef = {inputRef}
        newItem = {newItem}
        setNewItem = {setNewItem}
        handleSubmit = {handleSubmit}
      />
      <main>
        {isLoading ? (
            <h5>Items Loading...</h5>
          ) : fetchError ? (
            <h5>{fetchError}</h5>
          ) : (
          <Content
            items={items.filter((item) => item.item.toLowerCase().includes(search.toLowerCase()))}
            handleInputs={handleInputs}
            handleTrash={handleTrash}
          />
        )}
      </main>

      
      <Footer
        length = {items.length}
      />
    </div>
  );
}

export default App;

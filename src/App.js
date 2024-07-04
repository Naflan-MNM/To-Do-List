import Header from './Header.js';
import Content from './Content.js';
import Footer from './Footer.js';
import { useState,useEffect } from 'react';
import AddItems from './AddItems.js';
import SearchItems from './SearchItems.js';
import { useRef } from 'react';
import apiRequest from './apiRequest.js';

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

  const handleInputs=async(id)=> {
    const listItems = items.map((item)=>
      id === item.id ? {...item, checked:!item.checked} : item);
    setItems(listItems);

    const updateData = listItems.filter((item)=>
      item.id === id)
    const updateOption={
      method:'PATCH',
      header:{
        'content-style' : 'application/json'
      },
      body:JSON.stringify({checked:(updateData[0].checked)})
    }
    const ITEM_URL  = `${API_URL}/${id}`
    const result = await apiRequest(ITEM_URL,updateOption)
    if(result) setFetchError(result)
  }

  const handleTrash = async(id)=>{
    const listItems = items.filter((item)=> id!==item.id);
    setItems(listItems);

    const deleteOption={
      method:'DELETE'
    }
    const ITEM_URL  = `${API_URL}/${id}`
    const result = await apiRequest(ITEM_URL,deleteOption)
    if(result) setFetchError(result)
  }

  /* Add Items section */
  function handleSubmit(e){
    e.preventDefault()
    addItem(newItem)
    setNewItem('')
  }
  const addItem = async(item) =>{
    const id = items.length ? parseInt(items[items.length - 1].id, 10) + 1 : 1;
    const addNewItem = {id, checked:false, item}
    const listItems = [...items,addNewItem];
    setItems(listItems);

    const postOption = {
      method:'POST',
      header:{
        'content-Type':'application/json'
      },
      body:JSON.stringify(addNewItem)
    }

    const result  = await apiRequest(API_URL,postOption)
    if(result) setFetchError(result)

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
      <main className='main'>
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

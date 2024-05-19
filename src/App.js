import Header from './Header.js';
import Content from './Content.js';
import Footer from './Footer.js';
import { useState,useEffect } from 'react';
import AddItems from './AddItems.js';
import SearchItems from './SearchItems.js';
import { useRef } from 'react';

function App() {
  const [items,setItems] = useState( JSON.parse(localStorage.getItem('ToDo-list')) || []);
  const [newItem,setNewItem] = useState('')
  /* for search item*/
  const [search,setSearch]=useState('');

  /**keep the focus on the input after the click the plus icon */
  const inputRef = useRef();
/* 
  useEffect(()=>{
   ,[]
  })  */

  function handleInputs(id) {
    const listItems = items.map((item)=>
      id === item.id ? {...item, checked:!item.checked} : item);
    setItems(listItems);
    localStorage.setItem("ToDo-list",JSON.stringify(listItems))
  }

  function handleTrash(id){
    const listItems = items.filter((item)=> id!==item.id);
    setItems(listItems);
    localStorage.setItem("ToDo-list",JSON.stringify(listItems))
  
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
    localStorage.setItem("ToDo-list",JSON.stringify(listItems));
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
      
      <Content
        items = {items.filter((item)=>((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handleInputs = {handleInputs}
        handleTrash = {handleTrash}
      />
      <Footer
        length = {items.length}
      />
    </div>
  );
}

export default App;

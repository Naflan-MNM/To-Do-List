import React from 'react';
import { FaPlus } from 'react-icons/fa';

const AddItems = ({newItem,setNewItem, handleSubmit,inputRef}) => {
  return (
    <form className='addForm' onSubmit={handleSubmit}>
        <label htmlFor="addItem" >Add item </label>
        <input 
            id = "addItem"
            ref={inputRef}
            required
            autoFocus
            type="text" 
            placeholder='Add Item'
            value={newItem}
            onChange={(e)=> setNewItem(e.target.value)}
        />
        <button type='submit'
          onClick={()=>inputRef.current.focus()}
        >
            <FaPlus/>
        </button>

    </form>
  )
}

export default AddItems



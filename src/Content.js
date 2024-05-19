import React from 'react';
import { IoTrash } from "react-icons/io5";


const Content = ({items, handleInputs ,handleTrash}) => {
  return (
    <main>
      {items.length !== 0 ?(
        <ul>
          {items.map((item) => (
            <li className='item' key={item.id}>
              <input onChange={() => handleInputs(item.id)} type="checkbox" checked={item.checked} />
              <label
                style={item.checked ? { textDecoration: "line-through" } : null}
                onDoubleClick={() => handleInputs(item.id)}
              >
                {item.item}
              </label>
              <IoTrash onClick={() => handleTrash(item.id)} role='button' tabIndex='0' />
            </li>
          )) }
      </ul>
      ) : (
        <h3>Empty List Item</h3>
      )}
       
    </main>
  )
}

export default Content
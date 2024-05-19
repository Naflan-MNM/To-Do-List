import React from 'react'

const SearchItems = ({search, setSearch}) => {

  return (
    <form  className='searchForm' onSubmit={(e)=>e.preventDefault()}>
        <label htmlFor="SearchItems">Search Items </label>
        <input 
            type="text"
            placeholder='Search Item'
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            autoFocus 
        />
    </form>
  )
}

export default SearchItems;
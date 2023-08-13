import React, { useEffect, useRef, useState } from 'react';
import { search } from '../helpers/user.helpers';
import CustomInput from '../Inputs/CustomInput';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState();

  const timeout = useRef();

  const changeHandler = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  async function handleDebounceSearch(e) {
    clearTimeout(timeout.current);
    if (!search) return;

    timeout.current = setTimeout(async () => {
      const users = await search(2, query.trim());
      setResults(users);
    }, 600);
  }

  return (
    <div className="w-[400px] p-5 absolute h-full top-0 left-[60px] bg-white  border-x-[1px] ">
      <div className="searchbar">
        <div className="input-container flex flex-col  border-b-[1px] py-5 px-2 gap-5 ">
          <CustomInput
            label="search"
            type="search"
            className="bg-slate-300 rounded w-[200px] shadow appearance-none border  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={query}
            onChange={(e) => {
              changeHandler(e);
              handleDebounceSearch(search);
            }}
          />
        </div>
      </div>
      <div className="results border-red-500 flex flex-col gap-5">
        {query &&
          results &&
          results.data.users.map((user, index) => (
            <span key={index} className="">
              {user.name}
            </span>
          ))}
      </div>
    </div>
  );
};

export default Search;

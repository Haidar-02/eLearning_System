import React, { useEffect, useRef, useState } from 'react';
import CustomInput from '../Inputs/CustomInput';
import {
  getMessages,
  search,
  getMessagesById,
} from '../../helpers/common.helpers';

const Search = ({ setSelectedMessages, teacher }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState();
  const timeout = useRef();

  const changeHandler = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  async function handleDebounceSearch(e) {
    clearTimeout(timeout.current);
    if (!query.trim()) {
      setResults('');
      return;
    }

    timeout.current = setTimeout(async () => {
      const users = await search({ userType: 2, search: query.trim() });
      setResults(users);
    }, 600);
  }

  return (
    <div className="w-[250px] h-fit bg-cyan-light rounded-2xl p-5 flex flex-col gap-5  ">
      <div className="input-container flex flex-col  justify-center gap-5 ">
        <CustomInput
          label="search"
          type="search"
          className=" bg-white rounded w-[200px] shadow appearance-none border  py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={query}
          onChange={(e) => {
            changeHandler(e);
            handleDebounceSearch(search);
          }}
        />
      </div>

      <div className="results flex flex-col gap-5 max-h-[200px] overflow-auto">
        {query &&
          results &&
          results.data.users.map((user, index) => (
            <span
              key={index}
              onClick={async () => {
                const messages = await getMessagesById(user.id);
                setSelectedMessages(messages);
                teacher(user.id);
              }}
              className=" border-b-[1px] py-2 "
            >
              {user.name}
            </span>
          ))}
      </div>
    </div>
  );
};

export default Search;

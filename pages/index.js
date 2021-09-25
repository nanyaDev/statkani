import { useState } from 'react';

import isUUID from '@/utils/isUUID';
import Waves from '@/components/Waves';

const Home = () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    error && setError(null);
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const key = value.trim();

    if (!isUUID(key)) {
      setError("Hmm, that's not the right format for an API key 😔");
      return;
    }
  };

  return (
    <div className="flex-grow flex flex-col justify-center items-center bg-bg">
      <Waves />
      <h1 className="text-7xl text-center font-black text-gray-1 mb-8">
        API Key お願いします
      </h1>
      <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        <input
          className="w-full border-b-2 bg-bg text-xl font-light text-center text-gray-1 focus:outline-none focus:placeholder-transparent py-2 my-4 z-1"
          placeholder="Your key goes here!"
          value={value}
          onChange={handleChange}
        />
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <p className="invisible">&nbsp;</p>
        )}
      </form>
    </div>
  );
};

export default Home;

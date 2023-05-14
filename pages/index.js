import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { CgSpinnerTwoAlt } from 'react-icons/cg';

import { useAuth } from '@/lib/auth';
import isUUID from '@/utils/isUUID';
import Waves from '@/components/Waves';

const Home = () => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { signin } = useAuth();

  const handleChange = (e) => {
    error && setError(null);
    setValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const apiToken = value.trim();

    if (!isUUID(apiToken)) {
      setError("Hmm, that's not the right format for an API key 😔");
      setLoading(false);
      return;
    }

    try {
      await signin(apiToken);
    } catch (error) {
      setError("WaniKani doesn't recognize that API key. Try again? 🤷‍♂️");
    }

    setLoading(false);
  };

  return (
    <div className="flex-grow flex flex-col justify-center items-center bg-bg">
      <Waves />
      <h1 className="text-7xl text-center font-black text-gray-1 mb-8">
        API Key お願いします
      </h1>
      <form
        className="w-full max-w-lg flex border-b-2 py-2 my-4"
        onSubmit={handleSubmit}
      >
        <input
          className="flex-grow bg-bg text-xl font-light text-center text-gray-1 focus:outline-none focus:placeholder-transparent"
          placeholder="Your key goes here!"
          value={value}
          onChange={handleChange}
        />
        <button type="submit" className="text-gray-1 px-1">
          {loading ? (
            <CgSpinnerTwoAlt className="animate-spin" />
          ) : (
            <FaArrowRight />
          )}
        </button>
      </form>
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <p className="invisible">&nbsp;</p>
      )}
    </div>
  );
};

export default Home;

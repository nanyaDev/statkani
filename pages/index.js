const Home = () => {
  return (
    <div className="flex-grow flex flex-col justify-center items-center">
      <h1 className="text-7xl text-center font-black text-gray-700 mb-16">
        API Key お願いします
      </h1>
      <input
        className="w-full max-w-lg border-b-2 text-xl font-light text-center focus:outline-none focus:placeholder-transparent py-2"
        placeholder="Your key goes here!"
      />
    </div>
  );
};

export default Home;

const StatsBox = ({ dates, accuracy, known }) => {
  // prettier-ignore
  const colors = { radical: 'text-blue', kanji: 'text-pink', vocabulary: 'text-purple' };
  const names = { radical: '部種', kanji: '漢字', vocabulary: '単語' };

  return (
    <div className="relative w-[401px] h-[401px] bg-gradient-to-br from-gray-500 to-gray-700">
      <div className="absolute top-px bottom-px right-px left-px bg-fg flex flex-col justify-evenly items-center">
        <table>
          <tbody className="text-white">
            {Object.entries(dates).map(([key, value]) => (
              <tr key={key}>
                <td className="font-medium text-right pr-2">{key + ':'}</td>
                <td className="font-light">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <table className="text-center">
          <thead>
            <tr>
              <td></td>
              <th className="text-sm text-white font-medium">Meaning</th>
              <th className="text-sm text-white font-medium">Reading</th>
              <th className="text-sm text-white font-medium">Total</th>
              <th className="text-sm text-white font-medium">Known</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(accuracy).map(([key, value]) => (
              <tr key={key} className={colors[key]}>
                <td className="font-medium text-right p-2">{names[key]}</td>
                <td className="font-light p-2">{value[0]}</td>
                <td className="font-light p-2">{value[1]}</td>
                <td className="font-light p-2">{value[2]}</td>
                <td className="font-light p-2">{known[key]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatsBox;

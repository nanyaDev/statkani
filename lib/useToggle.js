import { useCallback, useState } from 'react';

// cf. https://usehooks.com/useToggle/
const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);

  const toggleState = useCallback(() => setState((state) => !state), []);

  return [state, toggleState];
};

export default useToggle;

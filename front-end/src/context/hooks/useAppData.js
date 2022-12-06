import { useContext } from 'react';
import AppContext from '../AppContext';

const useAppData = () => useContext(AppContext);

export default useAppData;

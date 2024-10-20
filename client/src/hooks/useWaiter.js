import React from 'react';
import { WaitingContext } from '../context/WaitingContext';

const useWaiter = () => {
    const {waitingList, setWaitingList} = React.useContext(WaitingContext);

    const addWaiter = (waiter) => {
        if (typeof waiter !== 'string') return;
        if(waitingList.includes(waiter)) return;
        setWaitingList((prevList) => [...prevList, waiter]);
    }

    const removeWaiter = (waiter) => {
        if (typeof waiter !== 'string') return;
        setWaitingList((prevList) => prevList.filter((item) => item !== waiter));
    }

  return {addWaiter, removeWaiter};
}

export default useWaiter
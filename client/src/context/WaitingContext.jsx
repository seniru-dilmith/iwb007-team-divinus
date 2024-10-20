import React, { useEffect } from 'react'
import LoadingSpinner from '../general/assets/common/LoadingSpinner';

export const WaitingContext = React.createContext();


const WaitingProvider = ({children}) => {
    const {Spinner, setWaiting} = LoadingSpinner();
    const [waitingList, setWaitingList] = React.useState([]);

    useEffect(() => {
        if(waitingList.length > 0) {
            setWaiting(true);
        } else {
            setWaiting(false);
        }
    },[waitingList,setWaiting]);

  return (
    <WaitingContext.Provider value={{waitingList, setWaitingList}}>
      {children}
      <Spinner />
    </WaitingContext.Provider>
  )
}

export default WaitingProvider
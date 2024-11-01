// src/context/HistoryContext.tsx

import React, { createContext, useContext, useState } from 'react';

interface HistoryContextType {
  listHistory: string[];
  setListHistory: React.Dispatch<React.SetStateAction<string[]>>;
  addToHistory: (item: string) => void; 
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [listHistory, setListHistory] = useState<string[]>([]);

  const addToHistory = (item: string) => {
    setListHistory(prevList => [...prevList, item]);
  };

  return (
    <HistoryContext.Provider value={{ listHistory, setListHistory, addToHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (context === undefined) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
};

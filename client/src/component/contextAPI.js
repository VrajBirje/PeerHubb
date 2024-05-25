import React, { createContext, useState } from 'react';

export const SidebarContext = createContext("");

export const SidebarProvider = ({ children }) => {
  const [activeChat, setActiveChat] = useState("");

  return (
    <SidebarContext.Provider value={{ activeChat, setActiveChat }}>
      {children}
    </SidebarContext.Provider>
  );
};
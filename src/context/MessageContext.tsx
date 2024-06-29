import React, { createContext, useContext, useState, ReactNode } from "react";

interface MessageState {
  message: string | null;
  icon: ReactNode | null;
}

interface MessageContextType {
  state: MessageState;
  setMessage: (message: string, icon: ReactNode) => void;
  clearMessage: () => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<MessageState>({
    message: null,
    icon: null,
  });

  const setMessage = (message: string, icon: ReactNode) => {
    setState({ message, icon });
  };

  const clearMessage = () => {
    if (state.message) {
      setTimeout(() => {
        setState({ message: null, icon: null });
      }, 3000);
    }
  };

  return (
    <MessageContext.Provider value={{ state, setMessage, clearMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = (): MessageContextType => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error("useMessage must be used within a MessageProvider");
  }
  return context;
};

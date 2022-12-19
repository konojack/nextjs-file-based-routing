import { createContext } from 'react';

export const NotificationContext = createContext({
  notification: null,
  showNotification: function () {},
  hideNotification: function () {},
});

export const NotificationContextProvider = ({ children }) => {
  return (
    <NotificationContext.Provider value={}>{children}</NotificationContext.Provider>
  );
};

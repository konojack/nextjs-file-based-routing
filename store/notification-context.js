import { createContext, useEffect, useState } from 'react';

export const NotificationContext = createContext({
  notification: null,
  showNotification: function () {},
  hideNotification: function () {},
});

export const NotificationContextProvider = ({ children }) => {
  const [activeNotification, setActiveNotification] = useState();

  useEffect(() => {
    if (
      (activeNotification && activeNotification?.status == 'success') ||
      activeNotification?.status == 'error'
    ) {
      const notificationTimeout = setTimeout(() => {
        hideNotificationHandler();
      }, 2000);

      return () => {
        clearTimeout(notificationTimeout);
      };
    }
  }, [activeNotification]);

  const showNotificationHandler = notificationData => {
    setActiveNotification(notificationData);
  };

  const hideNotificationHandler = () => {
    setActiveNotification(null);
  };

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
};

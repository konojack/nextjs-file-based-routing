import { useContext } from 'react';
import { NotificationContext } from '../../store/notification-context';
import Notification from '../ui/notification';
import MainHeader from './MainHeader';

const Layout = ({ children }) => {
  const notificationCtx = useContext(NotificationContext);

  const { notification: activeNotification } = notificationCtx;
  return (
    <>
      <MainHeader />
      <main>{children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification?.title}
          message={activeNotification?.message}
          status={activeNotification?.status}
        />
      )}
    </>
  );
};

export default Layout;

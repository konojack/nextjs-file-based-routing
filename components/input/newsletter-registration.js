import { useContext } from 'react';
import { NotificationContext } from '../../store/notification-context';
import classes from './newsletter-registration.module.css';

const validateEmail = email => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function NewsletterRegistration() {
  const notificationCtx = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();

    const email = event.target.email.value;
    const dataToSend = { email };

    if (validateEmail(email)) {
      notificationCtx.showNotification({
        title: 'Sending...',
        message: 'Your e-mail is saving',
        status: 'pending',
      });

      fetch('/api/newsletter', {
        method: 'POST',
        body: JSON.stringify(dataToSend),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(resp => {
          if (resp.ok) {
            return resp.json();
          }

          return resp.json().then(resp => {
            throw new Error(resp.message || 'Something went wrong!');
          });
        })
        .then(resp => {
          notificationCtx.showNotification({
            title: 'Success!',
            message: 'Your e-mail has been saved',
            status: 'success',
          });
        })
        .catch(error => {
          notificationCtx.showNotification({
            title: 'Error!',
            message: error.message || 'Something went wrong!',
            status: 'error',
          });
        });
    }
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;

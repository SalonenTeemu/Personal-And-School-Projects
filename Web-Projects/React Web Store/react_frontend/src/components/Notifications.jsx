import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const Notifications = () => {
  const notifications = useSelector((state) => state.notifications);
  const [visibleNotifications, setVisibleNotifications] = useState({});

  useEffect(() => {
    const newVisibleNotifications = { ...visibleNotifications };

    Object.keys(notifications).forEach((type) => {
      newVisibleNotifications[type] = notifications[type];
    });
    setVisibleNotifications(newVisibleNotifications);
  }, [notifications]);

  useEffect(() => {
    const timeoutIds = Object.keys(visibleNotifications).map((type) => {
      return setTimeout(() => {
        setVisibleNotifications((prevNotifications) => {
          const updatedNotifications = { ...prevNotifications };
          delete updatedNotifications[type];
          return updatedNotifications;
        });
      }, 5000);
    });

    return () => {
      timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
    };
  }, [visibleNotifications]);

  return (
    <>
      <style>
        {`
        .notification {
          padding: 10px;
          margin-bottom: 5px;
        }

        .notification.red {
          background-color: #ffcccc; /* Light red */
        }

        .notification.yellow {
          background-color: #ffffcc; /* Light yellow */
        }

        .notification.green {
          background-color: #ccffcc; /* Light green */
        }
        `}
      </style>
      {Object.keys(visibleNotifications).length === 0 ? (
        <div data-testid="empty-container">No notifications</div>
      ) : (
        <div data-testid="notifications-container">
          {Object.keys(visibleNotifications).map((type) => {
            const { message, status } = visibleNotifications[type];
            return (
              <div
                key={`${type}-${status}-notification`}
                data-testid={`${type}-${status}-notification`}
                className={`notification ${
                  status === "error"
                    ? "red"
                    : status === "loading"
                    ? "yellow"
                    : "green"
                }`}
              >
                {message}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

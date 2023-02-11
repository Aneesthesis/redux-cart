import { useEffect, useState } from "react";
import classes from "./Notification.module.css";

const Notification = (props) => {
  const { isShown, setIsShown } = props;
  useEffect(() => {
    const timeId = setTimeout(() => {
      setIsShown(false);
    }, 5000);
    return () => {
      clearTimeout(timeId);
    };
  });

  let specialClasses = "";

  if (props.status === "error") {
    specialClasses = classes.error;
  }
  if (props.status === "success") {
    specialClasses = classes.success;
  }

  const cssClasses = `${classes.notification} ${specialClasses}`;

  let notificationContent = (
    <section className={cssClasses}>
      <h2>{props.title}</h2>
      <p>{props.message}</p>
    </section>
  );

  if (!isShown) {
    notificationContent = null;
  }

  console.log(isShown);
  return notificationContent;
};

export default Notification;

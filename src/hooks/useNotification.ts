import { useState, useEffect } from "react";

interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
}

const useNotification = () => {
  const [permission, setPermission] = useState<NotificationPermission | null>(
    null
  );

  useEffect(() => {
    if ("Notification" in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async (): Promise<boolean> => {
    if (!("Notification" in window)) {
      console.error("This browser does not support notifications");
      return false;
    }

    if (permission === "granted") {
      return true;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result === "granted";
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      return false;
    }
  };

  const showNotification = async ({
    title,
    body,
    icon = "/favicon.ico",
  }: NotificationOptions): Promise<boolean> => {
    if (!("Notification" in window)) {
      console.error("This browser does not support notifications");
      return false;
    }

    if (permission !== "granted") {
      const granted = await requestPermission();
      if (!granted) {
        return false;
      }
    }

    try {
      const notification = new Notification(title, {
        body,
        icon,
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      return true;
    } catch (error) {
      console.error("Error showing notification:", error);
      return false;
    }
  };

  return {
    permission,
    requestPermission,
    showNotification,
    isSupported: "Notification" in window,
  };
};

export default useNotification;

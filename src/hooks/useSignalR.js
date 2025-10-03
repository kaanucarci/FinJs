import { useEffect, useRef } from "react";
import {
  createSignalRConnection,
  startSignalRConnection,
  stopSignalRConnection,
} from "@/utils/hubs/signalRConnection";

export const useSignalR = (token, eventHandlers) => {
  const isMountedRef = useRef(true);
  const retryCountRef = useRef(0);
  const connectionRef = useRef(null);

  useEffect(() => {
    if (!token) return;

    isMountedRef.current = true;
    retryCountRef.current = 0;
    const MAX_RETRIES = 3;

    try {
      connectionRef.current = createSignalRConnection(token, eventHandlers);

      const attemptConnection = async () => {
        const result = await startSignalRConnection(connectionRef.current, {
          isMounted: isMountedRef.current,
          retryCount: retryCountRef.current,
          maxRetries: MAX_RETRIES,
        });

        if (result.success) {
          retryCountRef.current = 0;
        } else if (result.retryCount < MAX_RETRIES) {
          retryCountRef.current = result.retryCount;
          
          setTimeout(() => {
            if (
              isMountedRef.current &&
              connectionRef.current.state === "Disconnected"
            ) {
              attemptConnection();
            }
          }, 5000);
        }
      };

      attemptConnection();
    } catch (err) {
      console.error("SignalR connection creation error:", err.message);
    }

    return () => {
      isMountedRef.current = false;
      if (connectionRef.current) {
        stopSignalRConnection(connectionRef.current);
      }
    };
  }, [token, eventHandlers]);
};


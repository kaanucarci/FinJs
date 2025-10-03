import { HubConnectionBuilder } from "@microsoft/signalr";

export const createSignalRConnection = (token, eventHandlers) => {
  if (!token) {
    throw new Error("Token is required");
  }

  const hubUrl = process.env.NEXT_PUBLIC_SIGNALR_HUB_URL;
  
  if (!hubUrl) {
    throw new Error("NEXT_PUBLIC_SIGNALR_HUB_URL environment variable is not defined");
  }

  const customLogger = {
    log: () => {},
    error: () => {},
  };

  const connection = new HubConnectionBuilder()
    .withUrl(hubUrl, {
      accessTokenFactory: () => token,
    })
    .configureLogging(customLogger)
    .withAutomaticReconnect([0, 2000, 5000, 10000])
    .build();

  if (eventHandlers.onExpenseCreated) {
    connection.on("ExpenseCreated", eventHandlers.onExpenseCreated);
  }
  if (eventHandlers.onExpenseUpdated) {
    connection.on("ExpenseUpdated", eventHandlers.onExpenseUpdated);
  }
  if (eventHandlers.onExpenseDeleted) {
    connection.on("ExpenseDeleted", eventHandlers.onExpenseDeleted);
  }
  if (eventHandlers.onBudgetUpdated) {
    connection.on("BudgetUpdated", eventHandlers.onBudgetUpdated);
  }

  return connection;
};


export const startSignalRConnection = async (connection, options = {}) => {
  const { isMounted = true, retryCount = 0, maxRetries = 3 } = options;

  try {
    if (isMounted && retryCount < maxRetries) {
      await connection.start();
      if (isMounted) {
        console.log("SignalR connected successfully");
        return { success: true, retryCount: 0 };
      }
    }
  } catch (err) {
    if (isMounted) {
      const newRetryCount = retryCount + 1;
      
      if (newRetryCount === 1) {
        console.warn("SignalR connection failed, retrying in background...");
      }
      
      return { success: false, retryCount: newRetryCount, error: err };
    }
  }
  
  return { success: false, retryCount };
};

export const stopSignalRConnection = async (connection) => {
  if (connection && connection.state !== "Disconnected") {
    try {
      await connection.stop();
    } catch (err) {
    }
  }
};


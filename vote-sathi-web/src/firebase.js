export const logUserAction = (eventName, params) => {
  if (window.firebaseAnalytics && window.firebaseLogEvent) {
    window.firebaseLogEvent(window.firebaseAnalytics, eventName, params);
  }
};

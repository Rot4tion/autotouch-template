export const testToast = () => {
  // toast(message, position, delay)
  // @param message: REQUIRED, a message string
  // @param position is OPTIONAL, it could be string 'top', 'center', 'bottom', the default value is 'top'
  // @param delay is OPTIONAL, it's a number in seconds, default delay time is 2 seconds
  at.toast(
    "This is a toast with default position and delay time"
  );

  at.toast(
    "This is a toast with default position but specified delay time",
    3
  );

  at.toast(
    "This is a toast with specified position but default delay time",
    "bottom"
  );

  at.toast(
    "This is a toast with specified position and specified delay time",
    "center",
    3
  );
};

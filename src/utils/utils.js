export const formatDate = () => {
  const date = new Date();
  const options = {
    // weekday: "long",
    // year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

export const checkIsDay = () => {
  const currentTime = new Date();

  // Get the current hour (0-23) and minutes (0-59) from the Date object
  const currentHour = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();

  // Format the time to display leading zeros for single-digit hours and minutes
  const formattedHour = currentHour.toString().padStart(2, "0");
  const formattedMinutes = currentMinutes.toString().padStart(2, "0");

  // Display the current time
  console.log(`Current time: ${formattedHour}:${formattedMinutes}`);

  if (formattedHour >= 18 || formattedHour <= 6) {
    console.log("night");
    //if formatter time is more than 18:00 or less than 6:00 day:false
    return false;
  } else if (formattedHour > 6 && formattedHour < 18) {
    console.log("day");
    //if is more than 6:00 and less than 18:00 day:true
    return true;
  }
};

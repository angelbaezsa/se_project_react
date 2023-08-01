export const defaultClothingItems = [
  {
    _id: 0,
    name: "Cap",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
  },
  {
    _id: 4,
    name: "T-Shirt",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
  },
  {
    _id: 5,
    name: "Winter coat",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  },
];

export const dateFormatter = () => {
  const date = new Date();
  var options = {
    // weekday: "long",
    // year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

export const timeFormatter = () => {
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

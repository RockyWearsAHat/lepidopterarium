const allBtns = document.querySelectorAll(".region-btn");

const handleClick = (e) => {
  console.log(`clicked ${e}`);
};

document.getElementById("map-container").addEventListener("click", handleClick);

const regionContainer = document.getElementById("region-container");
const regionInfo = document.getElementById("region-info");
const selectContainer = document.getElementById("select-container");

const calcNewSizeForDisplayPage = () => {
  selectContainer.style.height = `${
    regionContainer.offsetHeight - regionInfo.offsetHeight
  }px`;
};

window.addEventListener("resize", () => {
  calcNewSizeForDisplayPage();
});

calcNewSizeForDisplayPage();

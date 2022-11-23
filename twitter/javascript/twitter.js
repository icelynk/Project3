document.addEventListener("DOMContentLoaded", () => {
  initialize();
});

function initialize() {
  loadTimeline();
}

function loadTimeline() {
  fetch("./api/timeline.json")
    .then((response) => response.json())
    .then((data) => console.log(data));
}

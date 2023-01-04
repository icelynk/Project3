document.addEventListener("DOMContentLoaded", () => {
  initialize();
});

function initialize() {
  loadTimeline();
}

function loadTimeline() {
  fetch("./api/timeline.json")
    .then((response) => response.json())
    .then((data) => {
      const timeline = document.getElementById("generated-tweets");
      timeline.innerHTML = "";

      data.forEach((tweet) => {
        timeline.appendChild(renderTweet(tweet));
      });
    });
}

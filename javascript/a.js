function handleSubmit() {
  var content = document.getElementById("content");
  var value = content.value;
  var output = document.getElementById("output");
  output.innerHTML = value;
  handleSpeak(value);
  content.value = "";

  var color = document.getElementById("color").value;
  handleChangeColor3(color, output);

  changeFontSize();
}

function handleSpeak(content) {
  var synth = window.speechSynthesis;
  var speech = new SpeechSynthesisUtterance(content);
  synth.speak(speech);
}

function handleChangeColor1(color, output) {
  if (color === "red") {
    //If the color is red execute this command
    output.style.background = "#ff0000";
  } else if (color === "white") {
    output.style.background = "#ffffff";
  } else if (color === "yellow") {
    output.style.background = "#ffff00";
  } else {
    output.style.background = "#0000ff";
  }
}

function handleChangeColor2(color, output) {
  var newColor = "#000000";

  if (color === "red") {
    //If the color is red execute this command
    newColor = "#ff0000";
  } else if (color === "white") {
    newColor = "#ffffff";
  } else if (color === "yellow") {
    newColor = "#ffff00";
  } else {
    newColor = "#0000ff";
  }

  output.style.background = newColor;
}

function handleChangeColor3(color, output) {
  var colors = {
    blue: "#0000ff",
    red: "#ff0000",
    yellow: "#ffff00",
    white: "#ffffff",
  };

  output.style.background = colors[color];
}

function changeFontSize() {
  var fontSize = document.getElementById("font").value;
  if (fontSize.trim() === "") {
    fontSize = 16;
  }

  document.getElementById("output").style.fontSize = `${fontSize}px`;
  document.getElementById("content").style.fontSize = `${fontSize}px`;
}

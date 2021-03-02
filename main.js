prediction = "";

Webcam.set({
    width : 350,
    height : 300,
    image_format : "png",
    png_quality : 90
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function takeSnapShot() {
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML = "<img id = 'capturedImage' src = '" + data_uri + "'>";
    });
}

console.log("ml5 version", ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/4GTvA26td/model.json", modelLoaded);

function modelLoaded() {
    console.log("model is loaded");
}

function speak() {
    var synth = window.speechSynthesis;
    speakData = "The first prediction is" + prediction;
    var utterThis = new SpeechSynthesisUtterance(speakData);
    synth.speak(utterThis);
}

function check () {
    img = document.getElementById("capturedImage");
    classifier.classify(img,gotResult);
}

function gotResult (error, results) {
    if (error) {
        console.error(error);
    }

    else {
        console.log(results);
        document.getElementById("resultSymbolName").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if (results[0].label == "Rock Symbol") {
            document.getElementById("updateSymbol").innerHTML = "&#129304;";
        }
        if (results[0].label == "Thumbs Up") {
            document.getElementById("updateSymbol").innerHTML = "&#128077;";
        }
        if (results[0].label == "Peace") {
            document.getElementById("updateSymbol").innerHTML = "&#9996;";
        }
        if (results[0].label == "Nice") {
            document.getElementById("updateSymbol").innerHTML = "&#128076;";
        }
        
    }
}
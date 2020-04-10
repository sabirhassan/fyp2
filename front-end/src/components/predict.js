
function simulateClick(tabID) {
	
	document.getElementById(tabID).click();
}

function predictOnLoad() {
	
	// Simulate a click on the predict button
	setTimeout(simulateClick.bind(null,'predict-button'), 500);
};


$("#image-selector").change(function () {
	let reader = new FileReader();
	reader.onload = function () {
		let dataURL = reader.result;
		$("#selected-image").attr("src", dataURL);
		$("#prediction-list").empty();
	}

    let file = $("#image-selector").prop('files')[0];
    reader.readAsDataURL(file);

});




let model;
(async function () {
	
	model = await tf.loadModel('http://localhost:5000/tfjs-models/model/model.json');

    $('.progress-bar').hide();
		
})();






$("#predict-button").click(async function () {
	
	let image = $('#selected-image').get(0);
    
    let tensor = tf.fromPixels(image)
        .resizeNearestNeighbor([224,224])
        .toFloat();
    
 //later       
	let offset = tf.scalar(127.5);
	
	tensor = tensor.sub(offset)
	.div(offset)
	.expandDims();
	
//later	
	
	
	let predictions = await model.predict(tensor).data();
	let top5 = Array.from(predictions)
		.map(function (p, i) { // this is Array.map
			return {
				probability: p,
				className: SKIN_CLASSES[i] // we are selecting the value from the obj
			};
				
			
		}).sort(function (a, b) {
			return b.probability - a.probability;
				
		}).slice(0, 3);
	
	
    $("#prediction-list").empty();
    top5.forEach(function (p) {

	$("#prediction-list").append(`<li>${p.className}: ${p.probability.toFixed(6)}</li>`);
	});
	
});


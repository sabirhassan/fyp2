
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
		document.getElementById("save-button").style.visibility='hidden';
	}

    let file = $("#image-selector").prop('files')[0];
    reader.readAsDataURL(file);

});


let model;
(async function () {
	
	model = await tf.loadModel('http://localhost:5001/tfjs-models/model/model.json');

    $('.progress-bar').hide();
		
})();



$("#predict-button").click(async function () {
	


	let image = $('#selected-image').get(0);
	
	var fileName = document.getElementById('image-selector').value.toLowerCase();
	if(!fileName.endsWith('.jpg') && !fileName.endsWith('.png')){
    alert('Please upload .jpg or .png files only.');
    return false;
	}

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


	var selectBox = document.getElementById("patients");

	const promise1 = new Promise(function(resolve, reject) {
                    
		axios.post('http://localhost:4000/getpatientslist')
		.then(res => {
			resolve(res.data)
		});
	});
	
	promise1.then((values) =>{
		if(values!="empty")
		{
			for(var i=0 ;i<values.length;i++)
			{
				let txt = values[i].contact + " (" + values[i].name + " )";
				let val = values[i].contact ;
				let newOption = new Option(txt,val);
				selectBox.add(newOption,undefined);
			}

		
			document.getElementById("dropdown").style.visibility='visible';
			document.getElementById("save-button").style.visibility='visible';
		}
	});



});

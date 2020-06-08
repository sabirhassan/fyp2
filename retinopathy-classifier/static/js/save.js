function getBase64Image() {
    var img = document.getElementById("selected-image");
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL("image/png");
      return dataURL;
}

$("#save-button").click(function () {
    alert("asd");
/*    var contact = $('#patients').val();
    var prediction =$( "#prediction-list" ).text();
    var base64 = getBase64Image();
    var dataToPost = {"contact":contact,"prediction":prediction,"image":base64,"model": "diabetic ratinopathy"};
    console.log(base64);
    finalDaatToPost = JSON.stringify(dataToPost);
    $.ajax({
        url:'http://localhost:4000/insertSkinCancerReport',
        type:'POST',
        data: finalDaatToPost,
        dataType:'json',
        contentType: 'application/json',
        success: function (data) {
        alert("Data Added");
    },
    error: function (err) {
        alert(err);
    }
    });
*/
});
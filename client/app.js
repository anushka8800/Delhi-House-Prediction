function get_BhkValue() {
    var uiBHK = document.getElementById("uiBHK");
    for(var i in uiBHK) {
        if(uiBHK[i].checked) {
            return parseInt(i)+1;
        }
    }
    return -1;
}

function getBathroomValue() {
    var uiBathroom = document.getElementById("uiBathroom");
    for(var i in uiBathroom) {
        if(uiBathroom[i].checked) {
            return parseInt(i)+1;
        }
    }
    return -1;
}

function getParkingValue() {
    var uiParking = document.getElementById("uiParking");
    for(var i in uiParking) {
        if(uiParking[i].checked) {
            return parseInt(i)+1;
        }
    }
    return -1;
}

function onClickedEstimatePrice() {
    console.log("Estimate Price Button Clicked");
    var area = document.getElementById("uiArea");
    var bhk = get_BhkValue();
    var bathrooms = getBathroomValue();
    var parking = getParkingValue();
    var furnishing_status = document.getElementById("uiFurnishing");
    var estPrice = document.getElementById("uiEstimatedPrice");

    var url = "http://127.0.0.1:5000/predict_home_price";
    //var url = "/api/predict_home_price";

    $.post(url, {
        area: parseFloat(area.value),
        bhk: bhk,
        bathroom: bathrooms,
        parking: parking,
        furnishing_status: furnishing_status.value
    },function(data, status) {
        console.log(data.estimated_price);
        estPrice.innerHTML = "<h2>Rs. " + data.estimated_price.toString() + "</h2>";
        console.log(status);
    });
}

function onPageLoad() {
    console.log("document loaded");
    var url = "http://127.0.0.1:5000/get_furnishing_status";
    //var url = "/api/get_furnishing_status";
    $.get (url,function(data, status) {
        console.log("got response for get_furnishing_status request");
        if(data) {
            var furnishing_statuses = data.furnishing_status;
            var uiFurnishing = document.getElementById("uiFurnishing");
            
            for(var i in furnishing_statuses) {
                var opt = new Option(furnishing_statuses[i])
                $('#uiFurnishing').append(opt);
            }
        }
    });
}

window.onload = onPageLoad();
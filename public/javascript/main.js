function chosen(imgId) {
    var sdk = new window.sfdc.BlockSDK();
    sdk.setContent("");
    var fit = document.getElementById("scaleFit").checked;
    var acenter = document.getElementById("alignCenter").checked;
    //selectedImageId = imgId;
    if (imgId != "") {
        image = document.getElementById(imgId).src;
    }
    if (fit) {
        sdk.setContent("<img width='100%' src='" + image + "'/>");
    } else {
        if (acenter) {
            sdk.setContent("<center><img src='" + image + "'/></center>");
        } else {
            sdk.setContent("<img src='" + image + "'/>");
        }
    }
}
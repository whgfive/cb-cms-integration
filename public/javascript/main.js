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

$(function() {
    var body = $("body");
   
    $('#brand, #cms').change(function(){
        if($('#brand').val() != "" && $('#cms').val() == "other"){
            $("#deployIt").hide()
        }
        else if($('#brand').val() != "" && $('#cms').val() != ""){
            $("#deployIt").show()
            console.log($('#cms').val());           
        }
        else{
            $("#deployIt").hide()
        }
    });

    $('#cms').change(function(){
        if($('#cms').val() == "other"){
            $('#other_cms').fadeIn();
        }
        else{
            $('#other_cms').fadeOut();   
        }
    });

    $('#cms_icon_url, #cms_logo_url, #cms_name').keyup(function(){
        if($('#cms_icon_url').val().length != 0 && $('#cms_logo_url').val().length !=0 && $('#cms_name').val().length !=0)
            $("#deployIt").show()              
        else
            $("#deployIt").hide()
    });
    
    $('#deployIt').click(function(e){
        e.preventDefault();
        var cms_icon,cms_logo,cms_name,cms_id = "";
        var brand = $('#brand').val();
        var cms = $('#cms').val();
        if (cms == "other"){
            cms_icon = $('#cms_icon_url').val();
            cms_logo = $('#cms_logo_url').val();
            cms_name = $('#cms_name').val();
            cms_id = "other_cms";

            var build_url = "https://heroku.com/deploy?template=https://github.com/whgfive/cb-cms-integration&env[cms_name]="+cms_name+"&env[cms_icon]="+cms_icon+"&env[cms_logo]="+cms_logo+"&env[cms_id]="+cms_id+"&env[cms_brand]="+brand;

            window.location.href = build_url;
        }
        else {
            $.getJSON("./javascript/cms-partners.json", function( data,index ) {
                var res = $.grep(data, function(v) {
                    return v.cms_id == cms;
                });

                cms_icon = res[0].cms_icon;
                cms_logo = res[0].cms_logo_url;
                cms_name = res[0].cms_name;
                cms_id = res[0].cms_id;

                var build_url = "https://heroku.com/deploy?template=https://github.com/whgfive/cb-cms-integration&env[cms_name]="+cms_name+"&env[cms_icon]="+cms_icon+"&env[cms_logo]="+cms_logo+"&env[cms_id]="+cms_id+"&env[cms_brand]="+brand;

                window.location.href = build_url;
            });    
        }

        
        

        
    });
});
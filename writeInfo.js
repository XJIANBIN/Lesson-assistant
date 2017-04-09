(function() {
    var fullName = document.getElementById("fullName");
    var idCard = document.getElementById("idCard");
    var mobile = document.getElementById("mobile");
    var appId = "";

    //异步获取数据填写	
    chrome.storage.sync.get("data", function(retVal) {
        if (retVal.data != null) {
            var name = retVal.data.carAdministrationData_name || "";
            var myId = retVal.data.carAdministrationData_id || "";
            var mobileNumber = retVal.data.carAdministrationData_mobile || "";
            appId = retVal.data.carAdministrationData_appId || "";
            fullName.value = name;
            idCard.value = myId;
            mobile.value = mobileNumber;

            //图片转为base64
            var imgSrc = document.getElementById("img-verification").src;
            function convertImgToDataURLviaCanvas(url, callback, outputFormat) {
                var img = new Image();
                img.crossOrigin = 'Anonymous';
                img.onload = function() {
                    var canvas = document.createElement('CANVAS');
                    var ctx = canvas.getContext('2d');
                    var dataURL;
                    canvas.height = this.height;
                    canvas.width = this.width;
                    ctx.drawImage(this, 0, 0);
                    dataURL = canvas.toDataURL(outputFormat);
                    callback(dataURL);
                    canvas = null;
                };
                img.src = url;
            }
            //获取验证码并自动填写
            if (appId != "" && appId.length == 32) {
                convertImgToDataURLviaCanvas(imgSrc, function(base64img) {
                    var xhr = new XMLHttpRequest();
                    xhr.open("POST", "http://op.juhe.cn/vercode/index", true);
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState == 4) {
                            var code = document.getElementById("code");
                            code.value = JSON.parse(xhr.responseText).result;
                            document.getElementById("btnBooking").click();
                        }
                    }
                    var formData = new FormData();
                    base64img = base64img.replace("data:image/png;base64,", "");
                    formData.append("key",appId );
                    formData.append("codeType", "4005");
                    formData.append("base64Str", base64img);
                    setTimeout(function() {
                        xhr.send(formData);
                    }, 0);
                });
            }

        }
    });

})();

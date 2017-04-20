(function() {
    var t = new Date().toLocaleString();
    var options = {
        lang: "utf-8",
        icon: "http://xujianbin.pw/img/my.png",
        body: "正在帮你预约课程，快来查看！"
    };
    var Area = new Array();
    var flag = 1;

    //请求通知权限
    if (Notification && Notification.permission !== "granted") {
        Notification.requestPermission(function(status) {
            if (Notification.permission !== status) {
                Notification.permission = status;
            }
        });
    }

    //获取地点信息
    chrome.storage.sync.get("data", function(retVal) {
        if (retVal.data != null) {
            var data = retVal.data.carAdministrationData_area || "";
            data = data.split(",");
            data.forEach(function(elements, index) {
                Area[index] = elements.replace(/(^\s*)|(\s*$)/g, "");
            });

            //实时刷新监听
            var arr = document.getElementsByClassName("fc-event");
            // var myarr=new Array();
            // Array.prototype.forEach.call(arr,function(elements,index){
            //     if (myarr.indexOf(elements.innerText.replace(/(^\s*)|(\s*$)/g,""))=="-1") {
            //         myarr.push(elements.innerText.replace(/(^\s*)|(\s*$)/g,""));
            //     }
            // })
            // myarr.forEach(function(elements,index){
            //     console.log(elements);
            // })
            //console.log(Area);
            var loop = setInterval(function() {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].style.backgroundColor != "rgb(198, 198, 198)") {
                        if ((Area.indexOf(arr[i].innerText.replace(/(^\s*)|(\s*$)/g,"").split(" ")[0]) + 1)) {
                            clearInterval(loop);
                            var n = new Notification("约课小助手 " + t, options);
                            arr[i].click();
                            var confirm = document.getElementsByClassName("l-btn-icon-left");
                            confirm[0].click();
                            flag = 0;
                        }
                    }
                }
                if (flag) {
                    window.location.reload();
                }
            }, 2500);
        }
    });

})();


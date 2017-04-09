(function() {
    var per_Name = document.getElementById('name');
    var per_MyId = document.getElementById('myId');
    var per_Mobile = document.getElementById('mobile');
    var per_Area = document.getElementById('area');
    var per_appId = document.getElementById("appId");
    

 //地区标签特效
    var tag=document.getElementsByClassName("btn");
     Array.prototype.forEach.call(tag,function(elemt,index){
        elemt.onclick=function(){
            elemt.classList.add("active");
            Array.prototype.forEach.call(tag,function(elemt,index1){
                if (index1!=index) {
                    elemt.classList.remove("active");
                }
            });
            if (per_Area.value.indexOf(elemt.innerText.replace(/(^\s*)|(\s*$)/g,""))=="-1") {
               if (per_Area.value.replace(/(^\s*)|(\s*$)/g,"").length == 0 || per_Area.value.replace(/(^\s*)|(\s*$)/g,"").substr(per_Area.value.length-1,1)=="," && per_Area.value.replace(/(^\s*)|(\s*$)/g,"").length>0  ) {
                 per_Area.value =per_Area.value.replace(/(^\s*)|(\s*$)/g,"")+elemt.innerText.replace(/(^\s*)|(\s*$)/g,"")+",";
               }else{
                per_Area.value =per_Area.value.replace(/(^\s*)|(\s*$)/g,"")+","+elemt.innerText.replace(/(^\s*)|(\s*$)/g,"")+",";
               }
            }else{
                per_Area.value=per_Area.value.replace(elemt.innerText.replace(/(^\s*)|(\s*$)/g,"")+",","");
            }
        }
     });

    //请求用户总数
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://123.207.255.211:2017/XjbHandler.ashx?flag=0", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            document.getElementById("Number").innerHTML = xhr.responseText;
        }
    }
    xhr.send();
    
    //异步获取数据填写
    chrome.storage.sync.get("data", function(retVal) {
        if (retVal.data != null) {
            var name = retVal.data.carAdministrationData_name || "";
            var myId = retVal.data.carAdministrationData_id || "";
            var mobile = retVal.data.carAdministrationData_mobile || "";
            var Area = retVal.data.carAdministrationData_area || "";
            var Area = retVal.data.carAdministrationData_area || "";
            var appId = retVal.data.carAdministrationData_appId || "";
            per_Name.value = name;
            per_MyId.value = myId;
            per_Mobile.value = mobile;
            per_Area.value = Area;
            per_appId.value = appId;
        }
    });

    //保存按钮
    document.getElementById('save').onclick = function() {
        var postdata = {
            "carAdministrationData_name": per_Name.value,
            "carAdministrationData_id": per_MyId.value,
            "carAdministrationData_mobile": per_Mobile.value,
            "carAdministrationData_area": per_Area.value,
            "carAdministrationData_appId": per_appId.value
        };
        per_Name.value = "";
        per_MyId.value = "";
        per_Mobile.value = "";
        per_Area.value = "";
        per_appId.value = "";
        chrome.storage.sync.set({ 'data': postdata }, function() {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "http://123.207.255.211:2017/XjbHandler.ashx?flag=1", true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    //console.log(xhr.responseText);
                }
            }
            xhr.send();
            alert('保存成功！');
        });
    }

    //删除按钮
    document.getElementById("delete").onclick = function() {
        chrome.storage.sync.remove("data", function() {
            alert('清除成功！');
        });
    }
   
})()

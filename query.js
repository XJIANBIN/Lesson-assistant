(function(){

	 var idCard = document.getElementById("idCard");
     var mobile = document.getElementById("mobileTelNo");

     //获取数据
      chrome.storage.sync.get("data", function(retVal) {
        if (retVal.data != null) {
            var myId = retVal.data.carAdministrationData_id || "";
            var mobileNumber = retVal.data.carAdministrationData_mobile || "";
            idCard.value = myId;
            mobile.value = mobileNumber;
            document.getElementById("btnQuery").click();
        }
    });
})();
(function() {
    var fullName = document.getElementById("Name");
    var idCard = document.getElementById("IdNo");
    var mobile = document.getElementById("PhoneNo");
    chrome.storage.sync.get("data", function(retVal) {
        if (retVal.data != null) {
            var name = retVal.data.carAdministrationData_name || "";
            var myId = retVal.data.carAdministrationData_id || "";
            var mobileNumber = retVal.data.carAdministrationData_mobile || "";
            fullName.value = name;
            idCard.value = myId;
            mobile.value = mobileNumber;
        }
    });
    document.getElementsByClassName("form-horizontal")[0].submit();
    location.href = "http://www.gzjponline.com/Jp/BookOnline";
})();
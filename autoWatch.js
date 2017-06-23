(function() {
	var table =document.getElementById('I2').contentWindow.document.getElementById('step1');
    var course = table.getElementsByTagName('tr'); 
   Array.prototype.forEach.call(course,function(elements,index,array) {
	var elem = getByClass('circelPanel_txt',elements) ;
    if(elem !== '100 %'){
	 $($(elements).find('.buttonClass')[0]).click();
   }
  });
})();
function getByClass(clsName, parent){
    var oCls=parent.getElementsByTagName('*')//获取所有的标签元素
    var arr=[];
    for(i in oCls){
//对遍历的标签元素与要查找的元素进行判断
        if(oCls[i].className==clsName){
          return oCls[i].innerText.replace(/(^\s*)|(\s*$)/g,"");
        }
    }
}



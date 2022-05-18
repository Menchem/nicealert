function niceAlert (txt, time) {
  if (document.getElementById("alertFram")) {
      return false;
  }
  let alertDiv = document.createElement("DIV");
  alertDiv.id = "alertFram";
  alertDiv.style.position = "absolute";
  alertDiv.style.left = "0";
  alertDiv.style.top = "0";
  alertDiv.style.display = "table";
  alertDiv.style.width = "100%";
  alertDiv.style.height = "100%";
  //alertDiv.style.backgroundColor = "transparent";
  alertDiv.style.overflow = "hidden";
  alertDiv.style.zIndex = "10000";
  alertDiv.innerHTML = "<div style='width: 400px;height: 200px;display: table-cell; vertical-align: middle;text-align: center;'><ul style='list-style:none;margin:0px;padding:0px;width:400px;border: 1px solid #c5c5c5;background:#fff; display: inline-block;'><li style='background:#efefef;text-align:center;padding-left:10px;font-size:18px;height:40px;line-height:40px;border-bottom:1px solid #efefef;'>提示</li><li style='font-size:14px;min-height:120px;line-height:120px; line-height: 1.5;text-align: left;padding: 10px;'>" + txt + "</li><li style='text-align:center;font-weight:bold;height:45px;line-height:45px;padding-bottom: 10px;'><input type='button' style='background-color: transparent;border: none;outline:none; cursor:pointer;width: 108px;height: 38px; font-size: 16px;color: #FFFFFF;background:#2196f3;' value='确 定'/></li></ul></div>";
  document.body.appendChild(alertDiv);
  
  if(typeof time == "number"){
    setTimeout(function(){
      document.body.removeChild(alertDiv);
    }, time);
  }
  
  document.body.onselectstart = function () {
      return false;
  };
  if(alertDiv.addEventListener){
    alertDiv.addEventListener('click', function(e){
      if (e.target.tagName === 'INPUT') {
          document.body.removeChild(alertDiv);
        }
    }, false);
  }else{
    alertDiv.attachEvent('onclick',function(){
      let e = window.event;
      if (e.srcElement.tagName === 'INPUT') {
          document.body.removeChild(alertDiv);
        }
    });
  }
}

window.niceAlert = niceAlert;

window.alert = niceAlert;

export {niceAlert};  

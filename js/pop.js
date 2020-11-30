var showPop = (function () {
    function showPop(id) {
      var container = $("#" + id);
      $("#" + id).style.display = "";
      if(id === "popVideo"){
        var vdo = container.querySelector("video");
        vdo.play();
      }
    }
    var closes = $$(".pop_close");
    for (var i = 0; i < closes.length; i++) {
      closes[i].onclick = function () {
        var container = this.parentElement.parentElement;
        container.style.display = "none";//把父元素的父元素改变display//
      };
    }
    var popWx = $(".pop_wx");
    var popQq = $(".pop_qq");
    popWx.onclick = function () {
      popWx.classList.add("selected");
      popQq.classList.remove("selected");
    };
  
    popQq.onclick = function () {
      popWx.classList.remove("selected");
      popQq.classList.add("selected");
    };
    // 处理关闭视频弹窗时，视频暂停
    var closeBtn = $("#popVideo .pop_close");
    closeBtn.addEventListener("click", function () {
      $("#popVideo video").pause();
    });
    return showPop;
  })();
  
var pageShow = (function(){
  var pageIndex = 2; // 当前显示的页面索引//
var pages = $$(".page_container .page"); //获取所有的页面元素//
var nextIndex = null;
//设置静止情况下的样式//
function setStatic(){
   nextIndex = null;
    for(var i = 0;i < pages.length;i ++){
        var page = pages[i];
        if(i === pageIndex){
            page.style.zIndex = 1;
        }else{
            page.style.zIndex = 10;
        }
        page.style.top = (i - pageIndex) * height() + "px";
    }
}
setStatic();
//设置移动中//
function moving(dis){
    for(var i = 0;i < pages.length;i ++){
        var page = pages[i];
        if(i !== pageIndex){
            page.style.top = (i - pageIndex) * height() + dis + "px";
        }
        if (dis > 0 && pageIndex > 0) {
            nextIndex = pageIndex - 1;
          } else if (dis < 0 && pageIndex < pages.length - 1) {
            nextIndex = pageIndex + 1;
          } else {
            nextIndex = null;
          }
    }
}
//移动完成//
function finishMove() {
    if (nextIndex === null) {
      setStatic(); 
      return;
    }
    var nextPage = pages[nextIndex]; 
    nextPage.style.transition = ".5s"; 
    nextPage.style.top = 0;
    setTimeout(function () {
      pageIndex = nextIndex;
      nextPage.style.transition = "";
      setStatic();
    }, 500);
  }
  //注册事件//
  var pageContainer = $(".page_container");
  pageContainer.ontouchstart = function (e) {
    var y = e.touches[0].clientY;

    function handler(e) {
      var dis = e.touches[0].clientY - y;
      if (Math.abs(dis) < 20) {
        dis = 0; // 相当于手指没动
      }
      moving(dis);
      // 阻止事件的默认行为
      if (e.cancelable) {
        // 如果事件可以取消
        e.preventDefault(); // 取消事件 - 阻止默认行为
      }
    }
    // 手指按下，监听移动
    pageContainer.addEventListener("touchmove", handler, {
      passive: false,
    });
    pageContainer.ontouchend = function () {
      finishMove();
      pageContainer.ontouchmove = null;
    }
  }
  //实现点击切换//
  function pageShow(index){
    var nextPage = pages[index];
    if(index < pageIndex){
      nextPage.style.top = -height() + "px";
    }else if(index > pageIndex){
      nextPage.style.top = height() + "px";
    }else{
      if(pageIndex === 0){
        pageIndex ++;
      }else{
        pageIndex --;
      }
      setStatic();
    }
    nextPage.clientHeight; // 读取dom的尺寸和位置，会导致浏览器强行渲染
    nextIndex = index; // 设置下一个页面索引
    finishMove();
  }
  return pageShow;
})();
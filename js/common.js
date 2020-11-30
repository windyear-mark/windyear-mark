function $(selector) {
    return document.querySelector(selector);
  }
function $$(selector) {
    return document.querySelectorAll(selector);
  }
function width() {
    return document.documentElement.clientWidth;
  }
function height() {
    return document.documentElement.clientHeight;
  }
  //创建轮播图//
  function createCarousel(carouselId, datas){
    var container = document.getElementById(carouselId);
    var carouselList = container.querySelector(".g_carousel-list");
    var indicator = container.querySelector(".g_carousel-indicator");
    var prev = container.querySelector(".g_carousel-prev");
    var next = container.querySelector(".g_carousel-next");
    var curIndex = 0; //当前图片的索引//
    //创建轮播图元素//
    function createCarouselElements() {
      var listHtml = ""; // 轮播图列表内部的html
      var indHTML = ""; // 指示器的内部html
      for (var i = 0; i < datas.length; i++) {
        var data = datas[i];
        if (data.link) {
          // 有超链接
          listHtml += `<li>
        <a href="${data.link}" target="_blank">
          <img src="${data.image}">
        </a>
        </li>`;
        } else {
          listHtml += `<li>
          <img src="${data.image}">
        </li>`;
        }
        indHTML += "<li></li>";
      }
      carouselList.style.width = `${datas.length}00%`;
      carouselList.innerHTML = listHtml;
      indicator.innerHTML = indHTML;
    }
    createCarouselElements();
    //设置正确位置//
    function setStatus(){
      carouselList.style.marginLeft = - curIndex * width() + "px";
      //设置指示器样式//
      var beforeSelected = indicator.querySelector(".selected");
      if(beforeSelected){
        beforeSelected.classList.remove("selected");
      }
      indicator.children[curIndex].classList.add("selected");
      //设置prev和next//
      if(prev){
          if(curIndex ===0){
            //第一张图片//
            prev.classList.add("disabled");
          }else{
            prev.classList.remove("disabled");
          }
      }
      if(next){
        if(curIndex === datas.length - 1){
          //第一张图片//
          next.classList.add("disabled");
        }else{
          next.classList.remove("disabled");
        }
    }
    }
    setStatus();
    //去上一个//
    function toPrev(){
      if(curIndex === 0){
        return;
      }
      curIndex --;
      setStatus();
    }
    //去下一个//
      function toNext() {
        if (curIndex === datas.length - 1) {
          return;
        }
        curIndex ++;
        setStatus();
      }
      var timer = null;
      //开始自动切换//
      function start(){
        if(timer){
          return;
        }
        timer = setInterval(function(){
          curIndex ++;
          if(curIndex === datas.length){
            curIndex = 0;
          }
          setStatus();
        },2000)
      }
      start();
      //结束自动切换//
      function stop(){
        clearInterval(timer);
        timer = null;
      }
      //事件//
    if (prev) {
      prev.onclick = toPrev;
    }
    if (next) {
      next.onclick = toNext;
    }
    container.ontouchstart = function(e){
      e.stopPropagation();
      var x = e.touches[0].clientX; //记录横坐标//
      stop();//停止自动播放//
      carouselList.style.transition = "none";
      //监听事件移动//
      var pressTime = Date.now();//计算按下时间//
      container.ontouchmove = function(e){
        var dis = e.touches[0].clientX - x;//计算拖动距离//
        carouselList.style.marginLeft = - curIndex * width() + dis + "px";
      }
      //放手//
      container.ontouchend = function(e){
        var dis = e.changedTouches[0].clientX - x;
        start();
        carouselList.style.transition = "";
        container.ontouchmove = null;
        var duration = Date.now() - pressTime;//计算移动时间//
        if(duration < 300 ){
          if(dis >20 && curIndex > 0){
            toPrev();
          }else if (dis < -20 && curIndex < datas.length - 1) {
            // 300毫秒内快速的向左滑动了至少20像素
            toNext();
          } else {
            setStatus();
          }
        }else{
          //改动curIdex//
        if(dis < - width() / 2 && curIndex < datas.length - 1){
          curIndex ++;
        }else if(dis > width() / 2 && curIndex > 0){
          curIndex --;
        }
        setStatus();
        }
        
      }
    }
  }
  // ajax请求
async function ajax(url) {
  var reg = /http[s]?:\/\/[^/]+/;
  var matches = url.match(reg);
  if (matches.length === 0) {
    throw new Error("invalid url");
  }
  var target = matches[0];
  var path = url.replace(reg, "");
  return await fetch(`https://proxy.yuanjin.tech${path}`, {
    headers: {
      target,
    },
  }).then((r) => r.json());
}

 
  
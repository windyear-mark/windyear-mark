(function () {
    var divSwitch = $(".menu_switch");
    var ulNav = $(".menu_nav");
  
    // 切换菜单的显示状态
    function toggleNav() {
      divSwitch.classList.toggle("menu_switch--expand");
      ulNav.classList.toggle("menu_nav--expand");
    }
  
    divSwitch.onclick = toggleNav;
    ulNav.addEventListener("click", function () {
      toggleNav();
    });
  })();
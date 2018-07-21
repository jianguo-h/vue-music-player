// rem 适配手机屏幕
export default function () {
  // const evt = "onorientationchange" in window ? "onorientationchange" : "resize";
  const isIPhone = window.navigator.appVersion.match(/iphone/gi);
  let dpr = window.devicePixelRatio;
  if(isIPhone) {
    if(dpr >= 3 && (!dpr || dpr >= 3)) {
      dpr = 3;
    }
    else if(dpr >= 2 && (!dpr || dpr >= 2)) {
      dpr = 2;
    }
    else {
      dpr = 1;
    }
  }
  else {
    dpr = 1;
  }

  const scale = 1 / dpr;
  const docEl = document.documentElement;
  let metaEl = document.querySelector("meta[name='viewport']");

  if(!metaEl) {
    metaEl = document.createElement("meta");
    metaEl.setAttribute("name", "viewport");
    document.querySelector("head").appendChild(metaEl);
  }
  const fn = () => {
    let docElWidth = docEl.getBoundingClientRect().width;
    if(docElWidth / dpr > 540) {
      docElWidth = 540 * dpr;
    }
    const fontSize = docElWidth / 10;
    metaEl.setAttribute("content", "initial-scale=" + scale + ",maximum-scale=" + scale + ", minimum-scale=" + scale + ",user-scalable=no");
    docEl.setAttribute("data-dpr", dpr);
    docEl.style.fontSize = fontSize + "px";
  }
  window.addEventListener('resize', fn, false);
  document.addEventListener("DOMContentLoaded", fn, false)
}
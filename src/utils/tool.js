export default{
    //滚动穿透
    ModalHelper: ((bodyCls) => {
      let scrollTop;
      return {
        afterOpen: function () {
          scrollTop = document.scrollingElement.scrollTop;
          document.body.classList.add(bodyCls);
          document.body.style.top = -scrollTop + 'px';
          
        },
        beforeClose: function () {
          document.body.classList.remove(bodyCls);
          document.scrollingElement.scrollTop = scrollTop;
        },
      };
    })('modal-open'),
    // 调用原生的方法
    nativeEvent (name, params) {
      let u = navigator.userAgent
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
      let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      if (isIOS) {
          window.webkit.messageHandlers[name].postMessage(params)
      }
      if (isAndroid) {
          window.webView[name](params)
      }
    }
}
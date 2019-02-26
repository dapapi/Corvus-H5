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
    })('modal-open')
}
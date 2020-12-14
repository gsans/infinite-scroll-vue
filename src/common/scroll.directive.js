export default {
  bind: function (el, binding) {
    let elem = el;
    if (typeof binding.value !== 'function') return;
    el.__callback__ = (event) => {
      if (binding.arg == 'bottom') {
        if (!elem) return;
        if (binding.modifiers.window) {
          elem = document.documentElement;
        }
        const isBottom = Math.ceil(elem.offsetHeight + elem.scrollTop)+1 >= elem.scrollHeight;
        if (!isBottom) return;
        binding.value(event, elem);
      } else {
        binding.value(event, elem);
      }
    }
    if (binding.modifiers.window) {
      window.addEventListener('scroll', el.__callback__);
    } else {
      el.addEventListener('scroll', el.__callback__);
    }
  },
  unbind: function (el, binding) {
    if (binding.modifiers.window) {
      window.removeEventListener('scroll', el.__callback__);
    } else {
      el.removeEventListener('scroll', el.__callback__);
    }
    el.__callback__ = null;
  }
}
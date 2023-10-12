
// 判断元素是否出现在窗口内
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    // console.log(rect)
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
function throttle(func, wait) {

    let inThrottle, lastFn, lastTime;

    return function () {

        const context = this,
            args = arguments;

        if (!inThrottle) {
            func.apply(context, args);
            lastTime = Date.now();
            inThrottle = true;
        } else {
            clearTimeout(lastFn);
            lastFn = setTimeout(function () {
                if (Date.now() - lastTime >= wait) {
                    func.apply(context, args);
                    lastTime = Date.now();
                }
            }, Math.max(wait - (Date.now() - lastTime), 0));
        }
    };
}


const install = function (Vue) {
    Vue.directive('lazy', {
        inserted(el, binding) {
            let value = binding.value
            if (isElementInViewport(el)) {
                el.src = value;
            }
            let eventHandler = () => {
                if (isElementInViewport(el)) {
                    el.src = value;
                    window.removeEventListener('scroll', throttle(eventHandler, 500))
                }
            }

            window.addEventListener('scroll', throttle(eventHandler, 1000))
        }
    })
}

export default { install }
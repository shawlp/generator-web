/** 是否测试环境 */
export function isEnvDevelop() {
  return process.env.NODE_ENV === 'development'
}

/** 页面根据屏幕自动计算根节点的字体大小 */
export function initFontSize() {
  const docEl = document.documentElement
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  const recalc = () => {
    docEl.style.fontSize = 100 * (docEl.clientWidth / 375) + 'px'
  }
  window.addEventListener(resizeEvt, recalc, false)
  recalc()
}

/**
 * 解决键盘弹出后挡表单的问题
 */
export function solveBlockForm() {
  window.addEventListener('resize', function () {
    if (
      document.activeElement?.tagName === 'INPUT' ||
      document.activeElement?.tagName === 'TEXTAREA' ||
      document.activeElement?.getAttribute('contenteditable') == 'true'
    ) {
      window.setTimeout(function () {
        if (document.activeElement && 'scrollIntoView' in document.activeElement) {
          document.activeElement.scrollIntoView()
        } else {
          // @ts-ignore
          document.activeElement.scrollIntoViewIfNeeded()
        }
      }, 0)
    }
  })
}

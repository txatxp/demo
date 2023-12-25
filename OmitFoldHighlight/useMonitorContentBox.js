export default function (context) {
    const _this = context
    function monitorOmitFoldHighlightBox() {
        _this.omitFoldHighlight.MutationObserver = new MutationObserver((entries) => {
            console.log(entries, '---组件加载完毕，可以获取宽度')
            entries && entries.length && entries.forEach(item => {
                const width = item.target.clientWidth || item.target.offsetWidth
                console.log(width, '---宽度')
                _this.boxWidthCompute = width
            })
        })
        _this.omitFoldHighlight.ResizeObserver = new ResizeObserver((entries) => {
            entries && entries.length && entries.forEach(item => {
                const width = item.target.offsetWidth || item.target.clientWidth
                console.log(width, '---宽度')
                _this.boxWidthCompute = width
                _this.$nextTick(() => {
                    _this.contentObserver.recursion()
                })
            })
        })
        _this.$nextTick(() => {
            _this.omitFoldHighlight.MutationObserver.observe(_this.$refs.omitFoldHighlightRef, {
                ..._this.omitFoldHighlight.MutationObserverConfig
            })
            _this.omitFoldHighlight.ResizeObserver.observe(_this.$refs.omitFoldHighlightRef)
        })
        _this.boxWidthCompute = _this.$refs.omitFoldHighlightRef.offsetWidth || _this.$refs.omitFoldHighlightRef.clientWidth
        _this.$nextTick(() => {
           _this.$refs.omitFoldHighlightRef.setAttribute('data-width', `${_this.boxWidthCompute}`)  
        })
    }
    return {
        monitorOmitFoldHighlightBox
    }
}
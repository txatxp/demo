export default function(context) {
    let observer = null
    let _this = context
    function createObserver() {
        // 创建一个观察器实例并传入回调函数
        observer = new MutationObserver((e) => {
            // console.log('属性变动',e)
            e.forEach((item) => {
                if (item?.target === _this.$refs.omitFoldHighlightTemplateSpan) {
                    let content = item?.addedNodes?.[0]?.textContent
                    let width = item?.target?.offsetWidth
                    let c = width - _this.getBoxWidth
                    if (content) {
                        // 如果差值大于0，说明超过了200px，必须减去一个字
                        if (c >= 0) {
                            console.log(width, '----width====',content)
                            _this.contentArr.push(_this.cellArr)
                            _this.cellArr = []
                            _this.$refs.omitFoldHighlightTemplateSpan.innerHTML = ''
                            _this.i = _this.i - 1
                        } else {
                            _this.cellArr.push({
                                text: content,
                                width: width
                            })
                            if (_this.i >= _this.textArr.length) {
                                _this.contentArr.push(_this.cellArr)
                            }
                        }
                        _this.isTrack = true
                        recursion() 
                    }
                    
                }
            })
        });
    }

    function recursion() {
        if (_this.isTrack && _this.i < _this.textArr.length) {
            _this.isTrack = false
            const textNode = document.createTextNode(_this.textArr[_this.i])
            _this.$refs.omitFoldHighlightTemplateSpan.appendChild(textNode)
            _this.i = _this.i + 1
        } else {
            let data = []
            _this.contentArr.forEach(item => {
                item.forEach((cell, index) => {
                    if (index === 0) {
                        cell.fieldWidth = cell.width
                    } else {
                        cell.fieldWidth = cell.width - item[index - 1].width
                    }
                })
                data.push({
                    arr: item,
                    content: item.reduce((startItem, endItem) => (startItem + endItem.text), ''),
                    lineWidth: item.reduce((startItem, endItem) => (startItem + endItem.fieldWidth), 0)
                })
            })
            _this.contentData = data
        }
    }

    function startMonitor() {
         // 以上述配置开始观察目标节点
         observer && observer.observe(_this.$refs.omitFoldHighlightTemplateSpan, {
            childList: true, 
            attributes: true,
            subtree: true
        });
    }

    return {
        createObserver,
        recursion,
        startMonitor,
        observer
    }
}
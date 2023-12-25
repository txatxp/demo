<template>
    <div class="p-omit-fold-highlight-box">
       <div class="u-omit-fold-highlight-box" ref="omitFoldHighlightRef" :style="`line-height:${lineHeight};font-size:${fontSize};`">
            <template v-if="contentData">
                <div class="u-omit-fold-highlight-cell" v-for="(item, index) in contentData" :key="index">
                    <div class="u-omit-fold-highlight-cell-list" v-if="index < line">{{item.startString ? item.startString : item.content}}<span v-if="item.startString && item.isShowMore" @click="setMore">{{beforeString}}{{foldText}}{{afterString}}</span></div>
                    <div v-else :class="{'u-omit-fold-highlight-show': isShowMore, 'u-omit-fold-highlight-hide': !isShowMore, 'u-omit-fold-highlight-cell-list': true}">{{item.content}}</div>
                </div>    
            </template>
        </div>
       <div style="position: fixed; width: 100%; top: -100px; left: 0px; overflow: hidden;">
        <span :style="`white-space: nowrap; font-size: ${fontSize};line-height:${lineHeight};`" ref="omitFoldHighlightTemplateSpan"></span>
       </div>
       <div style="position: fixed; width: 100%; top: -100px; left: 0px; overflow: hidden;">
        <span :style="`white-space: nowrap; font-size: ${fontSize};line-height:${lineHeight};`" ref="moreTemplateSpan">{{beforeString}}{{foldText}}{{afterString}}</span>
       </div>
    </div>
</template>
<script>
import useMonitorContentBox from './useMonitorContentBox.js'
import useContent from './useContent.js'
export default {
    name: 'OmitFoldHighlight',
    // ${this.beforeString}${this.foldText}${this.afterString}
    // components: {
    //     Vnode: {
    //       props: ['content'],
    //       render() {
    //           return <div>{this.content}</div>
    //       }
    //     }
    // },
    props: {
        // 文本
        content: {
            type: String,
            default: ''
        },
        // 高亮文本
        highlightText: {
            type: String,
            default: ''
        },
        // 折叠文本
        foldText: {
            type: String,
            default: ''
        },
        // 折叠文本前面符号
        beforeString: {
            type: String,
            default: '...'
        },
        // 折叠文本后面符号
        afterString: {
            type: String,
            default: ''
        },
        // 行高
        lineHeight: {
            type: String,
            default: '16px'
        },
        fontSize: {
            type: String,
            default: '14px'
        },
        boxWidth: {
            type: [String, Number],
            default: 0
        },
        line: {
            type: [String, Number],
            default: 2
        }
    },
    data() {
        return {
            slotContentText: '',
            boxWidthCompute: 0,
            omitFoldHighlight: {
                MutationObserver: null,
                MutationObserverConfig: {
                    childList: true, 
                    attributes: true,
                    subtree: true
                },
                ResizeObserver: null
            },
            useMonitorContentBox: null,
            // 行容器
            contentArr: [],
            // 内容容器
            textArr: [],
            // 行记录数据
            cellArr: [],
            // 是否处理中
            isTrack: true,
            // 处理索引
            i: 0,
            contentData: null,
            contentObserver: useContent(this),
            isShowMore: false,
        }
    },
    created() {
    },
    mounted() {
        if (this.getContent) {
            this.textArr = this.getContent.split('')
            this.useMonitorContentBox = useMonitorContentBox(this)
            this.$nextTick(() => {
                if (!this.boxWidth) {
                    this.MonitorOmitFoldHighlight()
                }
                this.computerContent()
            })    
        }
        console.log(this.getMoreTemplateSpanWidth, '----getMoreTemplateSpanWidth')
    },
    computed: {
        // 获取容器宽度
        getBoxWidth() {
            if (this.boxWidth) {
                return this.boxWidth
            } else {
                return this.boxWidthCompute
            }
        },
        // 获取内容
        getContent() {
            if (this.content) {
                return this.content
            } else {
                return ''
            }
        },
        // 获取更多折叠、省略宽度
        getMoreTemplateSpanWidth() {
            if (this.foldText || this.beforeString || this.afterString) {
                return this.$refs.moreTemplateSpan.offsetWidth || this.$refs.moreTemplateSpan.clientWidth
            }
        }
    },
    methods: {
        setMore() {
            this.isShowMore = !this.isShowMore
        },
        computerContent() {
            this.contentObserver.createObserver()
            this.contentObserver.startMonitor()
            this.contentObserver.recursion()
        },
        MonitorOmitFoldHighlight() {
            this.useMonitorContentBox.monitorOmitFoldHighlightBox()
        },
        compilerData() {
            if (this.contentData && this.contentData.length) {
                this.contentData.forEach(element => {
                    element.isShowMore = false
                });
                const item = this.contentData[this.line - 1]
                if (item) {
                    const len = item.arr.length
                    const width = this.getMoreTemplateSpanWidth
                    let totalWisth = 0
                    let arr = []
                    let str1 = ''
                    let str2 = ''
                    for (let i = len - 1; i >= 0; i--) {
                        if (totalWisth < width) {
                            arr.push(i)
                            totalWisth += item.arr[i].fieldWidth
                            str1 += item.arr[i].text
                        } else {
                            str2 += item.arr[i].text
                        }
                    }
                    item.endString = str1.split('').reverse().join("")
                    item.startString = str2.split('').reverse().join("")    
                    if (this.contentData[this.line]) {
                        item.isShowMore = true
                    }
                }
                
            }
        }
    },
    watch: {
        'contentData': function(newVal, oldVal) {
            console.log(newVal, '---@@===')
            this.i = 0
            this.contentArr = []
            this.cellArr = []
            this.isTrack = true
            this.$refs.omitFoldHighlightTemplateSpan.innerHTML = ''
            this.compilerData()
        }
    }
}
</script>
<style scoped>
.u-omit-fold-highlight-show {
    display: block;
}
.u-omit-fold-highlight-hide {
    display: none;
}
.u-omit-fold-highlight-cell-list {
    white-space: nowrap;
}
</style>
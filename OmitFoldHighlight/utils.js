export function setTemplateBox(_this) {
    const templateDiv = document.createElement('div')
    const templateSpan = document.createElement('span')
    templateSpan.setAttribute('id', 'omitFoldHighlight-template-span')
    templateDiv.style.cssText = 'position:fixed;width: 100%;top:-100px;left:0px;overflow:hidden;'
    templateSpan.style.cssText = `white-space: nowrap;font-size:${_this.fontSize};`
    templateDiv.appendChild(templateSpan)
    document.body.appendChild(templateDiv)
    return templateSpan
}
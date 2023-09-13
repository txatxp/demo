/**
 * 
 * @param {*} columns 列数据
 * @param {*} table table simple-table.vue this对象
 * @returns 
 */
function  calcColumnWidth (columns, table) {
  let bodyWidth = table.$el.clientWidth - 24
  let tableWidth = 0
  let flexColumns = []
  flexColumns = columns.filter(column => {
    if (typeof column.originWidth !== 'string') return column
  })
  for (let column of columns) {
    // 设置列宽
    column.width = column.originWidth || 80
    // 设置表格宽度
    tableWidth += parseInt(column.width)
  }
  // 如果列宽总和小于动态获取表格宽
  if (tableWidth < bodyWidth) {
    // 实际宽度 - 列总宽
    let flexWidth = bodyWidth - tableWidth
    // (实际宽度 - 列总宽) / 列总数 = 单元格间隙
    let flexSpaceWidth = parseInt(flexWidth / flexColumns.length)
    // 第一个列宽 += （实际宽度 - 列总宽）- （单元格间隙）* 列的个数
    flexColumns[0].width += flexWidth - flexSpaceWidth * (flexColumns.length - 1)
    for (let i = 1; i < flexColumns.length; i++) {
      // 设置处理第一个的列宽的其他列宽、本来宽 + 间隙宽
      flexColumns[i].width += flexSpaceWidth
    }
    // 更新表格宽度
    table.store.updateTableWidth(bodyWidth)
  } else {
    // 更新表格宽度
    table.store.updateTableWidth(tableWidth)
  }
  // 返回处理过的列
  return columns ;
}
export { calcColumnWidth }
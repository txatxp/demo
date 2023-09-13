
export default class SimpleTableStore {
  constructor(tableId) {
    // 初始化列数据
    this.storeid = 'store-' + tableId ;
    // 列、记录等数据
    this.columns = [] ;
    // 列label
    this.columnLabelMap = {} ;
    // 渲染table宽
    this.realTableWidth = 0 ;
 
  }
  insertColumn (column){
    // 插入列数据
    this.columns.push(column) ;
    // 存储列label
    this.columnLabelMap[column.columnId] = column.label
  }
  getColumns(){
    // 获取列数据
    return this.columns ;
  }
  updateTableWidth (width) {
    // 更新宽度
    this.realTableWidth = width ;
  }
  getTableWidth () {
    // 获取宽度
    return this.realTableWidth ;
  }
}
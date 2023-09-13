export default {
  name: 'simple-table-head',
  data(){
    return{
      columns:[],
      // 实现排序功能
      // 培训从小到大
      "asc-n": (a, b) => a - b,
      // 排序从大到小
      "desc-n": (a, b) => b - a,
      // 中文按Unicode排序
      "asc-s": (a, b) => a.localeCompare(b),
      "desc-s": (a, b) => b.localeCompare(a),
    }
  },
  computed:{
    // 父级实例
    table(){
      return this.$parent
    }
  },
  props:{
    // 列、记录等相关数据
    store:{
      require: true
    }
  },
  methods:{
    getHeaderCellStyle(column){
      return {
        width: column.width + 'px'
      }
    },
    handleSortClick(event, column, givenOrder) {
      event.stopPropagation();
      if (!column.sortable) return;
      this.$set(this.table,'order',givenOrder);
      console.log(this.table.order)
      this.sort(givenOrder,column) ;
      this.$emit('sort-change',givenOrder);
  },
    sort(type,column) {
      // 是否排序
      if (column.sortable) {
        // 对父父亲元素进行排序
        this.$parent.tableData.sort((a, b) => {
          // 调用排序规则，传入排序方式asc、desc，然后判断数据类型进行拼接后调用方法实现排序
          return this[type + this.getSortType(a[column.prop])](
            a[column.prop],
            b[column.prop]
          );
        });
      }
    },
    // 全选设置
    selectAll(){
      // 全选标志取反
      this.table.isSelectedAll = !this.table.isSelectedAll;
      // 如果是全选、则
      if(this.table.isSelectedAll){
        this.table.toggleRowSelection(this.table.tableData) ;
      }else{
        // 清楚所有选中、包括数据
        this.table.clearSelection();
      }
    },
    // 处理排序类型
    getSortType(val) {
      // 返回标识串进行拼接
      return typeof val === "string" ? "-s" : "-n";
    },
  },
  created(){
    // 获取列数据
    this.columns = this.store.getColumns() ;
  },
  render(h) {
    let columns = this.store.getColumns() ;
    let tableWidth = this.store.getTableWidth() ;
    return (
      <table cellspacing="0" border="0" cellpadding="0" style={{width: tableWidth+'px'}}>
            {
 
              <tr>{columns.map(column=>
                  <td  style={this.getHeaderCellStyle(column)}>


                    {/* 全选交互 */}
                    {
                      (column.type =='selection')?
                        (<input  type='checkbox' checked={this.table.isSelectedAll} on-click={ ($event) => this.selectAll() }/>):
                        (column.label)
                    }


                    {/* 排序icon */}
                    {
                      column.sortable ? (<span
                        class="caret-wrapper">
                          <i class={['sort-caret ascending',this.table.order=='asc'?'ascending ':'']}
                             on-click={ ($event) => this.handleSortClick($event, column, 'asc') }>
                          </i>
                          <i class={['sort-caret descending',this.table.order=='desc'?'descending':'']}
                             on-click={ ($event) => this.handleSortClick($event, column, 'desc') }>
                          </i>
                        </span>) : ''
                    }
                  </td>
              )}
            </tr>
            }
 
      </table>
    );
  },
}
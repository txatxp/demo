export default {
  name:'simple-table-body',
  computed:{
    table(){
      return this.$parent
    }
  },
  props:{
    store: {
      require: true
    }
  },
  methods:{
    getBodyCellStyle(column){
      return {
        width: column.width + 'px',
        'text-align': column.align
      }
    },
  },
  render(h) {
    let tableData = this.table.tableData ;
    let columns = this.store.getColumns() ;
    let tableWidth = this.store.getTableWidth() ;
    return (
      <table cellspacing="0" border='0' cellpadding="0" style={{width: tableWidth + 'px'}}>
        {tableData.map((row, index) =>
          <tr  class={['el-table-tr',row.$checked?'el-table-tr-choose':'']}>
            {columns.map(column => <td class={'el-table-body__td'} style={this.getBodyCellStyle(column)}>

              {/* 最终渲染记录  */}
              <div>{column.renderCell(row, index)}</div>
            </td>)}
          </tr>)
        }
      </table>
    )
  }
}
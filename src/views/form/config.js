export const list = [
  {
    type: 'input',
    $attrs: {
      placeholder: '请输入名称',
      disabled: true
    },
    $listeners: {
      change() {console.log('数据改变')},
      focus() { console.log('获取焦点') }
    }
  },
  {
    type: 'input',
    val: '--',
    $attrs: {
      placeholder: '请输入服务',
      disabled: false,
      value: '888'
    },
    $listeners: {
      change() {console.log('数据改变')},
      focus() { console.log('获取焦点') },
      input(e) {
        console.log(e)
      }
    }
  }
]
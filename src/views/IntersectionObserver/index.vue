<template>
  <div class="p-home">
    <div class="u-menu">
      <div @click="showModule(`module-${index}`)" :class="{'u-menu-list': true, 'u-menu-active': `module-${index}` === activeId}" v-for="(item, index) in menu" :Key="index">
        {{ item.name }}
      </div>
    </div>
    <div id="module">
      <!-- <div class="u-scroll-margin-top"></div> -->
      <div
        class="module-list"
        v-for="(item, index) in menu"
        :Key="`module-${index}`"
        :id="`module-${index}`"
      >
        <h3>{{ item.name }}</h3>
      </div>
      <span>换行<br>换行<br>换行<br>换行<br>换行<br>换行<br>换行<br>换行<br>换行<br>换行<br>换行<br>换行<br>换行<br>换行<br>换行<br></span>
      <span>换行<br>换行<br>换行<br>换行<br>换行<br>换行<br>换行<br>换行<br>换行<br>换行<br>换行<br>换行<br>换行<br>换行<br>换行<br></span>
      <span>换行<br>换行<br>换行<br>换行<br>换行<br>换行<br>换行<br>换行<br>换行<br>换行<br>换行<br>换行<br>换行<br>换行<br>换行<br></span>
    </div>
  </div>
</template>
<script>
export default {
  name: "IntersectionObserver",
  components: {},
  data() {
    return {
      // 交叉监听器对象
      io: null,
      // 监听的所有目标
      entries: null,
      // 处理交互数据
      hanlderDataArr: null,
      // 激活id
      activeId: 'module-0',
      // 菜单
      menu: [
        {
          name: "模块一",
        },
        {
          name: "模块二",
        },
        {
          name: "模块三",
        },
        {
          name: "模块四",
        },
      ],
    };
  },
  mounted() {
    this.createIntersectionObserver();
  },
  methods: {
    createIntersectionObserver() {
      const config = {
        threshold: 0,
        root: document.getElementById('module'),
        // rootMargin: '-40px 0px 0px 0px'
      };
      this.io = new IntersectionObserver((entries, io) => {
        // 第一次设置所有监听对象，并存储有用的参数值
        this.saveMonitorTarget(entries)
        
        // 更显存储目标对象显示状态
        entries.forEach((item) => {
          if (item.isIntersecting) {
            this.hanlderDataArr && (this.hanlderDataArr.find(el => el.target === item.target).show = item.isIntersecting)
          } else {
            this.hanlderDataArr && (this.hanlderDataArr.find(el => el.target === item.target).show = item.isIntersecting)
          }
        });
        // 激活
        this.setActiveTarget(entries)
      }, config);
      
      // 监听目标对象
      this.monitorTarget()
    },
    // logTarget() {}
    // 存储监听对象
    saveMonitorTarget(entries) {
      if (entries && entries.length && entries.length >= this.menu.length && !this.entries) {
        this.entries = entries
        // 存储有用的参数值
        this.$nextTick(() => {
          this.saveNumArrData()
        })
      }
    },
    // 点击显示模块
    showModule(id) {
      console.log(this.io.takeRecords(), '-------takeRecords')
      document.getElementById(id).scrollIntoView({behavior: "smooth"})
    },
    // 监听目标
    monitorTarget() {
      this.menu.forEach((item, index) => {
        this.io.observe(document.getElementById(`module-${index}`));
      });
    },
    // 第一次存储监听对象有用信息
    saveNumArrData() {
      this.hanlderDataArr = []
      this.entries && this.entries.forEach(item => {
        this.hanlderDataArr.push({
          id: item.target.getAttribute('id'),
          top: item.target.getBoundingClientRect().top,
          show: item.isIntersecting,
          target: item.target
        })
      })
    },
    // 有隐藏、有显示的时候位置发生变化，重新变更位置
    setActiveTarget() {
      this.hanlderDataArr && this.hanlderDataArr.forEach(item => {
        item.top = item.target.getBoundingClientRect().top
      })
      // 获取显示的对象id，高亮对应菜单
      this.$nextTick(() => {
        // 过滤显示监听对象
        const showData = this.hanlderDataArr.filter(item => item.show)
        // 根据位置排序
        const sortData = showData.sort((a, b) => {
          return a.top - b.top
        })
        // 取显示并且位置最接近top位置的对象
        sortData[0] && (this.activeId = sortData[0].id)
        console.log(sortData)  
      })
    }
  },
};
</script>
<style scoped>
* {
  margin: 0px;padding: 0px;
  transition: all 0.5s linear;
}
.u-menu {
  height: 40px;
  border-top: 1px solid #dedede;
  border-bottom: 1px solid #dedede;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: 1;
  background-color:#fff;
}
#module {
  position: absolute;
  /* top: 0px; */
  top: 40px;
  width: 100%;
  left: 0px;
  bottom: 0px;
  overflow-x: hidden;
  overflow-y: auto;
}
.u-scroll-margin-top {
  height: 40px;
}
.u-menu-list {
  height: 40px;
  float: left;
  width: 20%;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  color: #333;
}
.u-menu-active {
  color:#fff;
  background: #ff711b;
}
.module-list {
  height: 300px;
  margin-bottom: 10px;
  background-color: #dedede;
  text-align: left;
  /* scroll-margin-top: 40px; */
}
</style>

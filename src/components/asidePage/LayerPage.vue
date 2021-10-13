<template>
  <div class="page" >
    <div class="page_content" v-for="(item,index) in this.layers" :class="[index === activeIndex?'active':'']" 
    draggable @dragstart="dragstart($event, index)" @dragover.prevent  @drop="dragDrop($event, index)"
    @click="selectLayer(item,index)"><i class="el-icon-map-location"></i><span class="page_content_span">{{item.name}}</span></div>
    <div class="page_warp">
      <set-attribute v-if="visAttribute" :clickLayer="clickLayer"></set-attribute>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import setAttribute from '../setAttribute.vue';
export default {
  components: {
    setAttribute
  },
  data () {
    return {
      activeIndex:null,
      visAttribute:false,
      dragIdx:'',
      clickLayer:''
    }
  },
  computed: {
    ...mapState(['layers'])
  },
  methods: {
    dragstart (e, index) {
      this.dragIdx = index
    },
    dragDrop (e, index) {
      let _teams = this.layers 
      let _dragitem = _teams[this.dragIdx]  
      _teams.splice(this.dragIdx, 1)      
      _teams.splice(index, 0, _dragitem)
      this.updataStyle()
    },
    updataStyle() {

      console.log(this.$map.getStyle().layers)
    },
    selectLayer(item,index) {
      if(this.activeIndex === index) {
        if(this.visAttribute === false){
          this.visAttribute = true
        } else {
          this.activeIndex = null
          this.visAttribute = false
          this.$emit('selectLayer','')
          this.clickLayer = ''
        }
      } else {
        if(this.visAttribute === false){
          this.visAttribute = true
          this.activeIndex = index
          this.$emit('selectLayer',item)
          this.clickLayer = item
        } else {
          this.activeIndex = index
          this.$emit('selectLayer',item)
          this.clickLayer = item
        }
      }
     

    }
  },
  watch: {
    layers() {
      this.activeIndex = null
    },
    visAttribute(val) {
      if(val === true){
        let interval = setInterval(() => {
          let ele = document.querySelector('#addLayer')
          if(ele) {
            this.visAttribute = false
            clearInterval(interval)
            this.activeIndex = null
            this.clickLayer = ''
            this.$emit('selectLayer','')
          }
        }, 100);
      }
    }
  }
}
</script>

<style lang="less" scoped>
.page{
  margin-top: 2px;
}
.page_content{
  margin-bottom: 4px;
  cursor: pointer;
  i{
    padding-left: 20px;
  }
}
.page_content_span{
  padding-left: 20px;
}
.page_content:hover{
  background-color: #ddd;
}
.active{
  background-color: #ddd;
}

</style>
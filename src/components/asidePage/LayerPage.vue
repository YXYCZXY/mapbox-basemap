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
import {cloneDeep} from 'lodash'
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
      dragIdx:''
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
      if(this.visAttribute === false){
        this.activeIndex = index
        this.$emit('selectLayer',item)
        this.clickLayer = item
        this.visAttribute = true
      } else {
        this.visAttribute = false
        this.activeIndex = null
        this.visAttribute = false
      }

    }
  },
  watch: {
    layers() {
      this.activeIndex = null
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
<template>
  <div class="content">
    <el-container>
      <el-aside width="210px">
        <aside-view @layerEdit="layerEdit" ></aside-view>
        <transition name="el-fade-in-linear">
          <add-layer v-if="addVisable" @addLayer="addLayer"></add-layer>
        </transition>
      </el-aside>
      <el-main>
        <base-map></base-map>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import baseMap from '../components/map.vue'
import asideView from '../components/asidePage/index'
import AddLayer from '../components/asidePage/AddLayer'
import setTileset from './Tileset.vue';
export default {
  components: {
    baseMap,
    asideView,
    AddLayer,
    setTileset
  },
  data () {
    return {
      addVisable:false
    }
  },
  methods: {
    addLayer(){
      this.addVisable = false
    },
    layerEdit(e){
      if(e === 'addLayer'){
        this.addVisable = true
      }else {
        this.addVisable = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.content{
  width: 100%;
  height: 100%;
}
.el-container{
  height: 100%;
}
/deep/.el-main{
  padding: 0;
  margin: 0;
  height: 100%;
}
.el-aside{
   box-shadow:0 0 10px 2px rgba(0,0,0,.1)!important
}
</style>
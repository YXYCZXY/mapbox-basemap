<template>
  <div class="wrap">
    <div class="wrap__setpage">
      <set-page @layerEdit="layerEdit" :clickLayer="clickLayer"></set-page>
    </div>
    <div class="wrap__layer">
      <layer-page @selectLayer="selectLayer"></layer-page>
    </div>

  </div>
</template>

<script>
import LayerPage from './LayerPage.vue'
import SetPage from './SetPage'
import setTileset from '../../views/Tileset.vue';
export default {
  components: {
    SetPage,
    LayerPage,
    setTileset
  },
  data () {
    return {
     clickLayer:{}
    }
  },
  methods: {
    layerEdit(e) {
      this.$emit('layerEdit',e)
    },
    selectLayer(val) {
      this.clickLayer = val
      this.$emit('selectLayer',val)
    }
  }
}
</script>

<style lang="less" scoped>
.wrap{
  width: 100%;
  height: 100%;
}
.wrap__setpage{
  width: 100%;
  height: 110px;
  border-bottom: 1px solid rgba(127,127,127,.45);
}
.wrap__layer{
  width: 100%;
  height: calc(100% - 113px);
}

</style>
<template>
  <div class="map_wrap">
    <div id="map"> </div>
  </div>
</template>

<script>
const mapboxgl = require('mapbox-gl')
import Vue from 'vue';
import {mapState} from 'vuex'
import util from '../libs/util'
export default {
  mounted () {
    this.initmap()
  },
  computed: {
    ...mapState(['layers'])
  },
  data () {
    return {
      map:{},
      oldLayer:null 
    }
  },
  methods: {
    initmap(){
      mapboxgl.accessToken = 'pk.eyJ1IjoieXVhbnh5IiwiYSI6ImNrbHQxczl5NDBmbHMyd28zYnkzNjliMjMifQ.LzmvIsLt0ZpMz1oSkAzHSw'
      let map = new mapboxgl.Map({
        container:'map',
        style:'mapbox://styles/mapbox/streets-v11',
        center: [114.302387,30.543742], 
        zoom: 6,     
        antialias: true,
      })
      Vue.prototype.$map = map
      this.map = map
    },
    updataMap(val) {
      val.forEach(item => {
        let sourceName = this.map.getSource(item.tiles)
        if (!sourceName){
          this.map.addSource(item.tiles, {
            type: 'vector',
              url: item.source
          });
        }
        let layers = util.addLayerData(item.kind,item)
        layers.forEach(item => {
          let layer = this.map.getLayer(item.id)

          if(layer) {
            return
          }
          this.map.addLayer(item)
        })
        let style = this.map.getStyle()
        this.$store.commit('setMapStyle',style)
      })
    },
  },
  watch: {
    layers(val) {
      this.updataMap(val)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.mapboxgl-ctrl {
  display: none !important;
}
.map_wrap{
  width: 100%;
  height: 100%;
}
#map{
  width: calc(100% - 5px);
  height: calc(100% - 5px);
}
</style>
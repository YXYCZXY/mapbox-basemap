<template>
  <div class="content">
    <el-select class="content_select" v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.id"
        :label="item.id"
        :value="item.id">
      </el-option>
    </el-select>
    <el-select class="content_select--point" v-model="kindvalue" placeholder="请选择">
      <el-option
        v-for="item in mapKind"
        :key="item.id"
        :label="item.lable"
        :value="item.value">
      </el-option>
    </el-select>
    <el-form v-if="formVisable" class="content_form" ref="form" :model="form" label-width="80px">
      <el-form-item label="颜色选择">
        <el-color-picker
          v-model="form.color"
          :predefine="form.predefineColors"
          @change="formchange()">
        </el-color-picker>
      </el-form-item>
      <el-form-item label="透明度">
        <el-slider v-model="form.slider" :min='0' :max='1' :step='0.1' @change="formchange()"></el-slider>
      </el-form-item>
      
    </el-form>
   <div id="map"></div>
  </div>
</template>

<script>
const mapboxgl = require('mapbox-gl')
import axios from 'axios'
export default {
  name: 'Home',
  data () {
    return {
      formVisable:false,
      map:{},
      options: [],
      mapKind:[
        {
          lable:'面',
          value:'polygon'
        },
        {
          lable:'线',
          value:'line'
        },
        {
          lable:'点',
          value:'point'
        }
      ],
      kindvalue:'',
      value: '',
      form:{
        color: 'rgb(255, 69, 0)',
        predefineColors: [
          '#ff4500',
          '#ff8c00',
          '#ffd700',
          '#90ee90',
          '#00ced1',
          '#1e90ff',
          '#c71585',
          'rgb(255, 69, 0)',
          'rgb(255, 120, 0)',
          'hsv(51, 100, 98)',
          'hsv(120, 40, 94)',
          'hsl(181, 100%, 37%)',
          'hsl(209, 100%, 56%)',
          '#c7158577'
        ],
        slider:0.1
      }
      
    }
  },
  mounted () {
    this.initmap()
  },
  methods: {
    formchange(value){
      let color = ''
      let name = ''
      let opacity = ''
      switch (this.kindvalue) {
        case 'polygon':
          name = this.value + '-polygon'
          color = 'fill-color'
          opacity = 'fill-opacity'
          break;
        case 'line':
          name = this.value + '-line'
          color = 'line-color'
          opacity = 'line-opacity'
          break;
        case 'point':
          name = this.value + '-point'
          color = 'point-color'
          opacity = 'point-opacity'
          break;
      
        default:
          break;
      }
      this.map.setPaintProperty(name,color,this.form.color)
      this.map.setPaintProperty(name,opacity,this.form.slider)
    },
    initmap(){
      let _self = this
      mapboxgl.accessToken = 'pk.eyJ1IjoieXVhbnh5IiwiYSI6ImNrbHQxczl5NDBmbHMyd28zYnkzNjliMjMifQ.LzmvIsLt0ZpMz1oSkAzHSw'
      let map = new mapboxgl.Map({
        container:'map',
        style:'mapbox://styles/mapbox/streets-v11',
        center: [114.302387,30.543742], // 初始坐标系，这个是南京建邺附近
        zoom: 6,     // starting zoom 地图初始的拉伸比例
        antialias: true,
      })
      
      map.on('load', function () {
        _self.addsource()
      })
      
      this.map = map
    },
    async addsource(){
      await axios.get('apis/api/tilesets/test/tilejson').then(res => {
        this.options = res.data.vector_layers
      })
      this.map.addSource('mapbox-terrain', {
          type: 'vector',
          url: 'apis/api/tilesets/test/tilejson'
      });
    },
    addLayer(value,kindvalue){
      if(value === '' || kindvalue === '') return
      let layers = []
      switch (kindvalue) {
        case 'polygon':
          layers = [
            {
              id: value + '-polygon',
              type: 'fill',
              //图层源
              source: 'mapbox-terrain',
              //矢量贴图源中使用的图层
              'source-layer': value,
              filter: ['==', '$type', 'Polygon'],
              paint: {
                'fill-color': "rgb(255, 69, 0)",
                'fill-opacity': 0.1
              }
            },
            {
              id: value + '-polygon-outline',
              type: 'line',
              source: 'mapbox-terrain',
              'source-layer': value,
              filter: ['==', '$type', 'Polygon'],
              //布局属性
              layout: {
                'line-join': 'round',
                'line-cap': 'round'
              },
              //图层属性
              paint: {
                'line-color': "rgb(255, 69, 0)",
                'line-width': 1,
                'line-opacity': 0.75
              }
            }
          ]
          break;
        case 'line':
          layers = [
            {
              id: tvalue + '-line',
              type: 'line',
              source: 'mapbox-terrain',
              'source-layer': value,
              filter: ['==', '$type', 'LineString'],
              layout: {
                'line-join': 'round',
                'line-cap': 'round'
              },
              paint: {
                'line-color': "rgb(255, 69, 0)",
                'line-width': 1,
                'line-opacity': 0.75
              }
            }
          ]
          break;
        case 'point':
          layers = [
            {
              id: value + '-point',
              type: 'circle',
              source: 'mapbox-terrain',
              'source-layer': value,
              filter: ['==', '$type', 'Point'],
              paint: {
                'circle-color': "rgb(255, 69, 0)",
                'circle-radius': 2.5,
                'circle-opacity': 0.75
              }
            }
          ]
          break;
      
        default:
          break;
      }
      
        layers.forEach(item => {
          this.map.addLayer(item)
        })
        this.formVisable = true
    }
  },
  watch: {
    value(val){
      if(val !== ''){
        this.addLayer(this.value,this.kindvalue)
      }
    },
    kindvalue(val){
      if(val !== ''){
        this.addLayer(this.value,this.kindvalue)
      }
    }
  }
  
}
</script>

<style lang="less" scoped>
#map,.content{
  width: 100%;
  height: 100%;
}
/deep/.mapboxgl-ctrl {
  display: none !important;
}
.content_select{
  position: absolute;
}
.content_form{
  position: absolute;
  top: 110px;
  background-color: #fff;
  width: 221px;
  border-radius: 10px;
}
/deep/.el-form-item__label,/deep/.el-form-item__content {
  text-align: center!important;
}
.el-slider{
  width: 100px;
  text-align: center;
}
.content_select--point{
  position: absolute;
  top: 50px;
}
</style>

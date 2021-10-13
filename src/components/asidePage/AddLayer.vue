<template>
<div class="page" id="addLayer">
  <div class="wrap" @click="tilesetsVis=false">
    <div class="wrap_head">
      <h4>新建图层</h4>
    </div>
    <div class="wrap_content">
      <el-tabs v-model="activeName">
        <el-tab-pane label="数据源" name="first">
          <el-row :gutter="20">
            <el-col :span="4">
              <label>数据源</label>
            </el-col>
            <el-col :span="20">
              <el-button class="content_source" @click.stop="tilesetsVis=!tilesetsVis">
                <span v-if="!this.tilesets">没有瓦片集，点击选择。</span>
                <span class="source_tiles" v-if="this.tilesets">{{this.tilesets.tiles}}</span><br>
                <span class="source_tiles" v-if="this.tilesets">{{this.tilesets.name}}</span>
              </el-button>
              <span class="source_span" v-if="this.tilesets">该瓦片集包含最多的要素类型是{{this.tilesets.kind}}</span>
              <br><span class="source_span" style="color:#448ee4" v-if="this.tilesets" @click="tilejson()">查看瓦片集信息</span>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="4">
              <label>类型</label>
            </el-col>
            <el-col :span="20">
              <el-select v-model="value" placeholder="请选择" size="mini" class="content_kind">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row :gutter="20" v-if="this.slidervalue">
            <el-col :span="4">
              <label>级别</label>
            </el-col>
            <el-col :span="20">
              <el-slider
                v-model="slidervalue"
                range
                :max="22"
                >
              </el-slider>
            </el-col>
          </el-row>
          <el-button class="content_add" @click="addLayer()">创建图层</el-button>
        </el-tab-pane>
      </el-tabs>
    </div>
    
  </div>
  <add-tilesets v-show="tilesetsVis" @tilesets="addTilesetsLayer"></add-tilesets>
</div>
  
</template>

<script>
import {cloneDeep} from 'lodash'
import AddTilesets from './AddTilesets.vue'
export default {

  components: {
    AddTilesets
  },
  data () {
    return {
      tilesetsVis:false,
      activeName: 'first',
      options: [{
          value: 'polygon',
          label: '面'
        }, {
          value: 'point',
          label: '点'
        }, {
          value: 'line',
          label: '线'
        }],
      value: 'polygon',
      tilesets:null,
      slidervalue:null
    }
  },
  methods: {
    addTilesetsLayer(val){
      this.tilesets = val
      this.slidervalue = [this.tilesets.minZoom,this.tilesets.maxZoom]
      document.querySelector('.content_add').style.display = 'block'
    },
    tilejson(){
      this.$router.push({name:'Tileset',query:{'name':this.tilesets.tiles}})
      console.log(this.tilesets,'this.tilesets')
    },
    addLayer() {
      let layer = cloneDeep(this.tilesets)
      layer.kind = this.value
      layer.minZoom = this.slidervalue[0]
      layer.maxZoom = this.slidervalue[1]
      console.log(layer,'layer')
      this.$store.commit('addLayer', layer)
      this.$emit('addLayer')
    }
  }
}
</script>

<style lang="less" scoped>

.page{
  position: absolute;
  left: 210px;
  width: 359px;
  height: 100%;
  background-color: #f2f2f2;
  top: 0;
  border-left: 1px solid rgba(127,127,127,.45);
}
.wrap{
  width: 100%;
  height: 100%;
}
.wrap_head{
  color: rgba(127,127,127,.8);
  font-size: 15px;
  line-height: 18px;
  font-weight: 400;
  padding: 12px;
  h4{
    margin: 2px;
  }
}

/deep/.el-tabs__nav,.el-tabs__active-bar{
  margin-left: 12px;
}
/deep/.el-tabs__item{
  color: rgba(127,127,127,.8);
}
/deep/.el-tabs__item.is-active{
  color: rgba(127,127,127);
}
/deep/.el-tabs__item:hover{
  color: rgba(127,127,127);
}
/deep/.el-tabs__active-bar{
  background-color:rgba(127,127,127);
}
/deep/.el-tabs__content{
  padding: 12px;
}
/deep/.el-form-item__label{
  text-align: left;
}
.content_source{
  background-color: #666666;
  width: 100%;
  span{
    color: #fff;
    font-weight: 700;
    font-size: 12px;
  }
}
.content_source:hover{
  background-color: #2d2d2d!important;
}
/deep/.el-button:active:active{
  background-color: #2d2d2d!important;
}
label{
  font-size: 12px;
}
/deep/.el-row{
  margin-bottom: 20px;
}
.content_kind{
  width: 100%;
}
.content_add{
  width: 100%;
  height: 24px;
  background-color: #448EE4;
  color: #fff;
  padding: 5px 20px;
  display: none;
}
/deep/.el-button:focus, .el-button:hover{
  background-color: #346db0;
}
.source_span{
  font-size: 12px;
  cursor: pointer;
}
.source_tiles{
  display: flex;
}
</style>
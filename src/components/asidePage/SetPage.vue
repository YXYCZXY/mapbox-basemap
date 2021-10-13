<template>
  <div class="content">
    <div class="setpage__mapname">
      <div class="mapname_content" v-if="!this.editName" @click="changeName">{{mapName}}</div>
        <el-input class="mapname_content" v-model="mapName" v-if="this.editName" @change="endName">{{mapName}}</el-input>
        <el-button v-if="!this.editName"  icon="el-icon-edit" @click="changeName" ></el-button>
        <el-button v-if="this.editName" icon="el-icon-check" @click="endName"></el-button>
    </div>
    <div class="setpage__layer">
      <el-tooltip class="item" effect="dark"  :content="addLayerTip" placement="top">
        <el-button type="primary" class="setpage__layer--add"  icon="el-icon-plus" size="mini" @click="addLayer">图层</el-button>
      </el-tooltip>
      <el-button-group class="setpage__layer--group">

        <el-tooltip class="item" effect="dark"   content="复制图层" placement="top">
          <el-button class="setpage__layer--btngroup"  icon="el-icon-document-copy" size="mini"  @click="setLayer('copy')"></el-button>
        </el-tooltip>

        <el-tooltip class="item" effect="dark"  :content="viewLayerTip" placement="top" >
          <el-button class="setpage__layer--btngroup " icon="el-icon-view" size="mini" @click="setLayer('display')"></el-button>
        </el-tooltip>

        <el-tooltip class="item" effect="dark"  content="删除图层" placement="top" >
          <el-button class="setpage__layer--btngroup "  icon="el-icon-delete" size="mini" @click="setLayer('delete')"></el-button>
        </el-tooltip>

      </el-button-group>

    </div>
    <div class="setpage__layerNum">
      {{layerNum}}图层
    </div>
  </div>
</template>

<script>
import util from '../../libs/util'
import {mapState} from 'vuex'
import {cloneDeep} from 'lodash'
export default {
  props: ['clickLayer'],
  data () {
    return {
      mapName:'空模板',
      editName:false,
      componentKey:0,
      layerNum:0,
      viewLayerTip:'隐藏图层',
      addLayerTip:'新建图层',
      layersName:[],
      presentLayer:null,
      interval:''
    }
  },
  computed: {
    ...mapState(['layers'])
  },
  watch: {
    layers() {
      this.layerNum = this.layers.length
    },
    clickLayer(val) {
      this.presentLayer = val
      let layers = util.addLayerData(val.kind,val)
      let name = []
      layers.forEach(item => {
        name.push(item.id)
      })
      this.layersName = name
    }
  },
  methods: {
    changeName() {
      this.editName = true
    },
    endName(){
      this.editName = false
    },
    setLayer(val) {
      if(!this.presentLayer) {
        this.$message({
          message: '请先选择图层',
          type: 'warning'
        });
        return
      }
      let layers = []
      this.layersName.forEach(item => {
        layers.push(this.$map.getLayer(item))
      })
      switch (val) {
        case 'copy':
          let copyLayer = cloneDeep(this.presentLayer)
          copyLayer.name = copyLayer.name + '-copy'
          this.$store.commit('addLayer', copyLayer)
          this.presentLayer = null
          break;
        case 'display':
          layers.forEach(item => {
            if(this.$map.getLayoutProperty(item.id,'visibility') === 'visible'){
              this.$map.setLayoutProperty(item.id,'visibility','none')
              this.viewLayerTip = '显示图层'
            } else {
              this.$map.setLayoutProperty(item.id,'visibility','visible')
              this.viewLayerTip = '隐藏图层'
            }
          })
          break;
         case 'delete':
          
          layers.forEach(item => {
            this.$map.removeLayer(item.id)
          })
          let index = this.layers.findIndex(item => {
            return item.name =this.presentLayer.name 
          })
          this.$store.commit('deleteLayer', index)
          this.presentLayer = null
          break;
        default:
          break;
      }
    },
    addLayer() {
      let icon = document.querySelector('.setpage__layer--add').getElementsByTagName("i")[0]
      if(icon.className === 'el-icon-plus'){
        icon.classList.remove('el-icon-plus')
        icon.classList.add('el-icon-close')
        this.addLayerTip = '取消新建图层'
        this.$emit('layerEdit','addLayer')
        
        this.interval =  setInterval(() => {
          let ele = document.querySelector('#addLayer')
          if(!ele) {
            icon.classList.add('el-icon-plus')
            icon.classList.remove('el-icon-close')
            this.addLayerTip = '新建图层'
            clearInterval(this.interval)
          }
        }, 100);
      }else{
        icon.classList.add('el-icon-plus')
        icon.classList.remove('el-icon-close')
        this.addLayerTip = '新建图层'
        this.$emit('layerEdit','disaddLayer')
      }
    }
  },
  destroyed() {
    clearInterval(this.interval)
  }
}
</script>

<style lang="less" scoped>
.content{
  width: 100%;
  height: 100%;
}
.setpage__mapname{
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-top: 10px;
}
.mapname_content{
 width: 70%;
}
/deep/.el-button--default{
  padding: 5px;
}
/deep/.el-input__inner{
  width: 140px;
  height: 20.8px;
}
.setpage__layer{
  padding-top: 10px;
  
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.setpage__layer--add{
  cursor: pointer;
  margin-left: 5px;
  background-color: #666666;
  border: #666666;
  font-weight: 900;
  width: 70px;
}
.setpage__layer--btngroup{
  padding: 7px 7px;
  background-color: #fff;
  color: rgb(127,127,127);
  border-color:rgb(127,127,127)
}

.setpage__layerNum{
  margin-top: 10px;
  margin-left: 8px;
  font-weight: 700!important;
  font-size: 12px;
}
</style>
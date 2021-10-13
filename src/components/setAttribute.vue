<template>
<div class="page">
    <div class="wrap_head">
      <h4>{{clickLayer.name}}</h4>
    </div>
    <el-tabs tab-position="left" >
      <el-tab-pane label="颜色" class="table">
        <div class="table_head">颜色</div>
        <div class="table_span">属性名称:<span >{{clickLayer | falidFilters('color')}}</span></div>
        <div class="table_span">设置属性值</div>
        <div class="table_content">
          
          <el-input size="mini" class="table_content_input" v-model="form.color" @change="formchange()"></el-input>
          <el-color-picker
            v-model="form.color"
            :predefine="form.predefineColors"
            size="mini"
            @change="formchange()">
          </el-color-picker>
        </div>
      </el-tab-pane>
      <el-tab-pane label="透明度">
        <div class="table_head">透明度</div>
        <div class="table_span">属性名称:<span >{{clickLayer | falidFilters('opacity')}}</span></div>
        <div class="table_span">设置属性值</div>
        <div class="table_content">
           <el-slider v-model="form.slider" :min='0' :max='1' :step='0.1' @change="formchange()"></el-slider>
           <el-input-number size="mini" :step='0.1' :min='0' :max='1' v-model="form.slider"  @change="formchange()"></el-input-number>
        </div>
      </el-tab-pane>

      <el-tab-pane :label="sizeKind" v-if="!fillLine">
        <div class="table_head">{{sizeKind}}</div>
        <div class="table_span">属性名称:<span >{{this.sizeKind | sizeFilters}}</span></div>
        <div class="table_span">设置属性值</div>
        <div class="table_content">
          <el-input-number size="mini" :step='0.5' :min='0'  v-model="sizeNum"  @change="formchange()"></el-input-number>
           <!-- <input class="table_content_width" size="mini" v-model="sizeNum" @change="formchangeline()"></input> -->
        </div>
      </el-tab-pane>

      <el-tab-pane label="边框线" v-if="fillLine">
        <div class="table_head">边框线</div>
        <div class="table_span">属性名称:<br>
          <span >颜色:line-color</span><br>
          <span >透明度:line-opacity</span><br>
          <span >线宽:line-width</span>

        </div>
        <div class="table_span">设置属性值</div>
        <div class="table_content_other">
          <div class="table_span">颜色值</div>
          <div class="table_content">
            <el-input size="mini" class="table_content_input" v-model="form.color" @change="formchangeline()"></el-input>
            <el-color-picker
              v-model="form.linecolor"
              :predefine="form.predefineColors"
              size="mini"
              @change="formchangeline()">
            </el-color-picker>
          </div>
          <div class="table_span">透明度</div>
           <div class="table_content">
            <el-slider v-model="form.lineslider" :min='0' :max='1' :step='0.1' @change="formchangeline()"></el-slider>
            <el-input-number size="mini" :step='0.1' :min='0' :max='1' v-model="form.lineslider"  @change="formchangeline()"></el-input-number>
            <!-- <input class="table_content_slider" size="mini" v-model="form.lineslider" @change="formchangeline()"></input> -->
          </div>
          <div class="table_span">线宽</div>
          <div class="table_content">
            <el-input-number size="mini" :step='1' :min='0'  v-model="form.linewidth"  @change="formchangeline()"></el-input-number>
            <!-- <input class="table_content_width" size="mini" v-model="form.linewidth" @change="formchangeline()"></input> -->
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
</div>
  
</template>

<script>

export default {
  filters: {
    falidFilters(val,key) {
      if(val.kind === 'polygon') {
        if (key === 'color') {
          return 'fill-color'
        } else {
          return 'fill-opacity'
        }
      } else if(val.kind === 'line') {
        if (key === 'color') {
          return 'line-color'
        } else {
          return 'line-opacity'
        }
      } else {
        if (key === 'color') {
          return 'circle-color'
        } else {
          return 'circle-opacity'
        }
      }
    },
    sizeFilters(val) {
      if(val === '点大小') {
        return 'circle-radius'
      } else {
        return 'line-width'
      }
    }
  },
  props: ['clickLayer'],
  data () {
    return {
      sizeNum:null,
      fillLine:false,
      sizeKind:'',
      form:{
        color: '',
        predefineColors: [
          '#ff4500',
          '#ff8c00',
          '#ffd700',
          '#90ee90',
          '#00ced1',
          '#1e90ff',
          '#c71585',
          '#c7158577'
        ],
        slider:0,
        lineslider:0,
        linecolor:'',
        linewidth:0
      },
      artSize:0
    }
  },
  mounted () {
    this.layerZoom = [this.clickLayer.minZoom,this.clickLayer.maxZoom]
    switch (this.clickLayer.kind) {
      case 'polygon':
        this.fillLine = true
        this.form.color = this.$map.getPaintProperty(this.clickLayer.name + '-polygon','fill-color')
        this.form.linecolor = this.$map.getPaintProperty(this.clickLayer.name + '-polygon','fill-color')
        this.form.slider = this.$map.getPaintProperty(this.clickLayer.name + '-polygon','fill-opacity')
        this.form.lineslider = this.$map.getPaintProperty(this.clickLayer.name + '-polygon-outline','line-opacity')
        this.form.linewidth = this.$map.getPaintProperty(this.clickLayer.name + '-polygon-outline','line-width')
        break;
      case 'point':
        this.fillLine = false
        this.sizeKind = '点大小'
        this.sizeNum = this.$map.getPaintProperty(this.clickLayer.name + '-point','circle-radius')
        this.form.color = this.$map.getPaintProperty(this.clickLayer.name + '-point','circle-color')
        this.form.slider = this.$map.getPaintProperty(this.clickLayer.name + '-point','circle-opacity')
        break;
      case 'line':
        this.fillLine = false
        this.sizeKind = '线宽度'
        this.sizeNum = this.$map.getPaintProperty(this.clickLayer.name + '-line','line-width')
        this.form.color = this.$map.getPaintProperty(this.clickLayer.name + '-line','line-color')
        this.form.slider = this.$map.getPaintProperty(this.clickLayer.name + '-line','line-opacity')
        break;
    
      default:
        break;
    }

  },
  methods: {
    formchangeline() {
      let color = 'line-color'
      let name = this.clickLayer.name + '-polygon-outline'
      let opacity = 'line-opacity'
      let width = 'line-width'
      this.$map.setPaintProperty(name,color,this.form.linecolor)
      this.$map.setPaintProperty(name,opacity,this.form.lineslider)
      this.$map.setPaintProperty(name,width,Number(this.form.linewidth))
    },
    formchange() {
      let color = ''
      let name = ''
      let opacity = ''
      let size = ''
      switch (this.clickLayer.kind) {
        case 'polygon':
          name = this.clickLayer.name + '-polygon'
          color = 'fill-color'
          opacity = 'fill-opacity'
          break;
        case 'line':
          name = this.clickLayer.name + '-line'
          color = 'line-color'
          opacity = 'line-opacity'
          size = 'line-width'
          break;
        case 'point':
          name = this.clickLayer.name + '-point'
          color = 'circle-color'
          opacity = 'circle-opacity'
          size = 'circle-radius'
          break;
      
        default:
          break;
      }
      this.$map.setPaintProperty(name,color,this.form.color)
      this.$map.setPaintProperty(name,opacity,this.form.slider)
      if(this.sizeNum) {
        this.$map.setPaintProperty(name,size,this.sizeNum)
      }
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
  margin: 0!important;
  border-left: 1px solid rgba(127,127,127,.45);
}
.wrap_head{
  height: 24px;
  color: rgba(127,127,127,.8);
  font-size: 15px;
  line-height: 18px;
  font-weight: 400;
  padding: 12px;
  border-bottom: 1px solid #ccc;
  h4{
    margin: 2px;
  }
}
.el-tabs{
  height: calc(100% - 49px)!important;
}
/deep/.el-tabs__item{
  color: #ccc;
}
/deep/.el-tabs__item.is-active{
  color: #000;
}
/deep/.el-tabs__active-bar{
  background-color: #000;
}
.table_head{
  font-size: 18px;
  font-weight: 400;
  margin: 10px 0;
}
.table_span{
  font-weight: 700;
  font-size: 12px;
  margin: 10px 0;
  span{
    font-weight: 400;
  }
}
.table_content{
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 10px;

}
.table_content_input{
  width:150px ;
}
.el-slider{
  width: 100px;
  text-align: center;
}
.table_content_slider{
  width:50px ;
}
.table_content_width{
  justify-content: start;
}
</style>
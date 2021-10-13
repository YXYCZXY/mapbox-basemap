<template>
  <div class="tilesets_wrap">
    <div class="tilesets_content">
      <div class="tilesets_content_useData">
        <p>正在使用的数据</p>
        <div class="useData--none">
          没有正在使用的瓦片集。
        </div>
      </div>
      <div class="tilesets_content_useData">
        <p>未使用的数据</p>
        <div class="useData" v-for="item in this.unUseData">
          <div class="useData--name">
            {{item.name}}
          </div>
          <div class="useData--content" >
            <button v-for="(tags,index) in item.layer" class="content_btn" @click="selectLayer($event,tags)">
              <div class="content_color" :style="{backgroundColor:'rgb('+Math.floor(Math.random() * 256)+','+Math.floor(Math.random() * 256)+','+Math.floor(Math.random() * 256)+')'}">
              </div>
              <i class="el-icon-map-location"></i>
              <span class="content_btn_span">{{tags.name}}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      sumData:[],
      unUseData:[],
      useData:[],
      activeColor:'',
      isAction:'',
      lastDom:null 
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    async initData() {
      await axios.get('apis/api/tilesets').then(res => {
        res.data.forEach(item => {
          let url = 'apis/api/tilesets/'+item +'/tilejson'
          let obj = {
            name:item,
            layer:[]
          } 
          
          axios.get(url).then(res => {
            res.data.vector_layers.forEach((item,index) => {
              let layerObj = {
                source:url,
                name:item.id,
                tiles:obj.name,
                kind:res.data.tilestats.layers[index].geometry,
                minZoom:item.minzoom,
                maxZoom:item.maxzoom,
                center:res.data.center
              }
              obj.layer.push(layerObj)
            })
            this.unUseData.push(obj)
          })
          
        })
      })
      
    },
    selectLayer(e,tags) {
      this.lastDom && (this.lastDom.style.background = '#fff')
      let ele = e.target.parentNode
      if(ele.className !== 'content_btn') {
        return
      }
      ele.style.background = '#ccc'
      this.lastDom = ele
      this.$emit('tilesets',tags)
    }
  }
}
</script>


<style lang="less" scoped>
.tilesets_wrap{
  width: 360px;
  height: 360px;
  max-height: 360px;
  overflow: auto;
  position: absolute;
  left: 375px;
  top: 90px;
  border:1px solid rgba(0,0,0,0.45) ;
  border-radius: 10px;
  background-color: #ffff;
}
div::-webkit-scrollbar{
  width:5px;
  height:5px;
  /**/
}
div::-webkit-scrollbar-track{
  background: rgb(239, 239, 239);
  border-radius:2px;
}
div::-webkit-scrollbar-thumb{
  background: #bfbfbf;
  border-radius:5px;
}
div::-webkit-scrollbar-thumb:hover{
  background: #333;
}
div::-webkit-scrollbar-corner{
  background: #179a16;
}
.tilesets_content_useData{
  font-size: 10px;
  line-height: 15px;
  font-weight: 700;
  color: black;
  padding: 12px 12px 0px 12px;
}
.useData--none{
  margin: 6px 12px;
  padding: 12px;
  border:1px dashed rgba(0,0,0,0.45);
  border-radius: 10px;
}
.useData{
  margin-left: 20px;
}
.useData--name{
  color: #666666;
}
.useData--content{
  margin-top: 5px;
  display: flex;
  flex-wrap:wrap;
}
.content_btn{
  width: 90px;
  padding: 3px;
  font-size: 12px;
  border: none;
  border-radius: 5px;
  background-color: #ffff;
  cursor: pointer;
  display: flex;
  margin-bottom: 4px;
  margin-right: 4px;
}
.content_btn:hover{
  background-color: #ccc;
}
.content_color{
  width: 3px;
  height: 15px;
  border: 1px solid #fff;
  border-radius:10px

}
.content_btn_span{
  white-space:nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 45px;
  text-align: left;
}
.el-icon-map-location{
  font-size: 14px;
  font-weight: 500;
  padding-left: 10px;
  padding-right: 10px;
}
</style>
<template>
  <div class="page">
    <el-container>
      <el-main>
        <h2 class="page_h2">{{tilesetData.id}}</h2>
        <div class="page_content">
          <h3 class="page_h3">图层详情</h3>
          <el-card class="box-card" v-for="item in tilesetData.tilestats.layers" :key="item.index">
            <div slot="header" class="clearfix">

              <span style="display:flex"><div class="content_color" :style="{backgroundColor:'rgb('+Math.floor(Math.random() * 256)+','+Math.floor(Math.random() * 256)+','+Math.floor(Math.random() * 256)+')'}">
              </div>{{item.layer}}</span>
              <span>{{item.attributes.length}}个属性字段</span>
            </div>
            <div v-for="field in item.attributes" class="box-card_content">
              <div class="box-card_content_div">{{field.attribute}}</div><div class="box-card_content_div">{{field.type}}</div>
            </div>
          </el-card>
        </div>
      </el-main>
      <el-aside width="319px" >
        <div class="page_aside">
          <h3>详情</h3>
        </div>
        <div class="form_content">
          <div class="form_item">
            <span>数据ID</span>
            <div class="form_item_ID"><span>{{tilesetData.id}}</span></div>
          </div>
          <div class="form_item_kind">
            <div>
              <div class="form_item_kind_span">格式</div>
              <div>{{tilesetData.type}}</div>
            </div>
            <div>
              <div class="form_item_kind_span">类型</div>
              <div>{{tilesetData.format}}</div>
            </div>
            <div>
              <div class="form_item_kind_span">格式</div>
              <div>{{(tilesetData.filesize / 1000000) | filtersSize}}MB</div>
            </div>
          </div>
          <div class="form_item_other">
            <span>数据级别</span>
            <div class="form_item"><span>z{{tilesetData.minzoom}} ~ z{{tilesetData.maxzoom}}</span></div>
          </div>
          <div class="form_item_other">
            <span>数据范围</span>
            <div class="form_item"><span>{{tilesetData.bounds}}</span></div>
          </div>
        </div>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import {mapTilejson} from '../libs/requerst'
export default {
  filters: {
    filtersSize(val) {
      return parseInt(val)
    }
  },
  data () {
    return {
      tilesetData:{}
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init() {
      await mapTilejson(this.$route.query.name).then(res => {
        this.tilesetData = res.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
.page{
  width: 100%;
  height: 100%;
}
.el-container{
  height: 100%;
  padding: 40px 80px;
}
.page_h2{
  font-size: 45px;
  line-height: 54px;
  font-weight: 400;
  margin: 0;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
}
.page_h3{
  font-size: 18px;
  line-height: 24px;
  font-weight: 400;
  margin: 0;
  padding:20px 0;
}
.box-card{
  margin-bottom: 40px;
}
.el-main::-webkit-scrollbar{
  display: none;
}
.clearfix{
  display: flex;
  justify-content: space-between;
  span{
    font-size: 12px;
    color: #666666;
  }
}
.box-card_content{
  font-size: 12px;
  color: #666666;
  display: flex;
  border-bottom: 1px dashed #666;
  padding-bottom: 8px;
  margin-bottom: 8px;
}
.box-card_content_div{
  width: 150px;
}
.content_color{
  width: 3px;
  height: 15px;
  border: 1px solid #fff;
  border-radius:10px;
  margin-right: 10px;
}
.page_aside{
  padding-top: 48px;
  h3{
    font-weight: 400;
    margin: 0;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
  }
}
.form_content{
  padding-top: 20px;
  font-size: 12px;
}
.form_item{
  span{
    font-weight: 700;
  }
}
.form_item_ID{
  padding:6px 6px;
  margin-top: 6px;;
  background-color: rgba(0,0,0,0.1);
  span{
    color: #666;
  }
}
.form_item_kind{
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}
.form_item_kind_span{
  font-weight: 700;
}
.form_item_other{
  margin-top: 16px;
}
</style>
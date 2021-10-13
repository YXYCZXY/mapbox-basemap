
export default {  
    addLayerData(kind, value) {
      let layers = []
      let sourceLayer = ''
      if(value.name.indexOf('-copy')){
        sourceLayer = value.name.replace('-copy','')
      } else {
        sourceLayer = value.name
      }
      switch (kind) {
        case 'polygon':
          layers = [
            

            {
              id: value.name + '-polygon',
              type: 'fill',
              minzoom:value.minZoom,
              maxzoom:value.maxZoom,
              //图层源
              source: value.tiles,
              //矢量贴图源中使用的图层
              'source-layer': sourceLayer,
              filter: ['==', '$type', 'Polygon'],
              'layout': {
                'visibility': 'visible'
              },
              paint: {
                'fill-color': "rgb(255, 69, 0)",
                'fill-opacity': 0.1
              },
            },
            {
              id: value.name + '-polygon-outline',
              type: 'line',
              minzoom:value.minZoom,
              maxzoom:value.maxZoom,
              source: value.tiles,
              'source-layer': sourceLayer,
              filter: ['==', '$type', 'Polygon'],
              //布局属性
              layout: {
                'line-join': 'round',
                'line-cap': 'round',
                'visibility': 'visible'
              },
              //图层属性
              paint: {
                'line-color': "rgb(255, 69, 0)",
                'line-width': 1,
                'line-opacity': 0.7
              }
            }
          ]
          break;
        case 'line':
          layers = [
            {
              id: value.name + '-line',
              type: 'line',
              source: value.tiles,
              'source-layer': sourceLayer,
              filter: ['==', '$type', 'LineString'],
              layout: {
                'line-join': 'round',
                'line-cap': 'round',
                'visibility': 'visible'
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
              id: value.name + '-point',
              type: 'circle',
              source: value.tiles,
              'source-layer': sourceLayer,
              filter: ['==', '$type', 'Point'],
              'layout': {
                'visibility': 'visible'
              },
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
      return layers
    },
    getAPI(module) {
      return `apis/api/${module}`
    }
}
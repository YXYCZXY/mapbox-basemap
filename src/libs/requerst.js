import util from './util'
import xhr from './xhr'
const API = {
  tilesets:util.getAPI('tilesets')
}

export const mapTilejson = (content) => {
  return xhr({
    method:'GET',
    url:`${API.tilesets}/${content}/tilejson`
  })
}
<template>
  <div ref="mapRef" style="width: 100vw; height: 100vh"></div>
</template>

<script setup lang="ts">
  import mapBoxGl from 'maplibre-gl'
  import 'maplibre-gl/dist/maplibre-gl.css'
  import * as turf from '@turf/turf'
  import { onMounted, ref, watch } from 'vue'
  import useData from '/@/hooks/useData'
  import { ADMINISTRATIVE_DISTRICT_COLOR } from '/@/constant'

  const { schoolList, schoolStageActive, administrativeDistrictActive, isSchoolMatching } =
    useData()

  const MY_KEY = '012f0661147775734a640be856496cb5'
  const mapRef = ref<HTMLElement>()

  onMounted(() => {
    const map = new mapBoxGl.Map({
      container: mapRef.value!,
      style: {
        version: 8,
        sources: {
          'tdt-vec': {
            type: 'raster',
            tiles: [
              `https://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=${MY_KEY}`
            ],
            tileSize: 256
          },
          'tdt-cva': {
            type: 'raster',
            tiles: [
              `https://t1.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=${MY_KEY}`
            ],
            tileSize: 256
          }
        },
        layers: [
          {
            id: 'tdt-tiles-layer',
            type: 'raster',
            source: 'tdt-vec'
          },
          {
            id: 'tdt-cva-layer',
            type: 'raster',
            source: 'tdt-cva'
          }
        ]
      },
      center: [112.5831424, 22.8518603],
      zoom: 10
    })

    map.on('style.load', () => {
      map.addSource('geojson-area-source', {
        type: 'geojson',
        data: turf.featureCollection([])
      })

      map.addLayer({
        id: 'geojson-area-layer',
        type: 'fill',
        source: 'geojson-area-source',
        paint: {
          'fill-color': [
            // 使用let定义变量
            'let',
            'fillColor',
            // 使用get获取到geojson中properties中的值，赋值给fillColor
            ['get', 'fillColor'],
            // 使用变量
            ['to-color', ['var', 'fillColor']]
          ],
          'fill-opacity': 0.5
        }
      })

      map.addLayer({
        id: 'state-borders',
        type: 'line',
        source: 'geojson-area-source',
        layout: {},
        paint: {
          'line-color': '#627BC1',
          'line-width': 2
        }
      })

      watch(
        [schoolList, schoolStageActive, administrativeDistrictActive],
        () => {
          var collection = turf.featureCollection(
            schoolList.reduce((pre: Parameters<typeof turf.featureCollection>[0], schoolItem) => {
              if (
                schoolItem.ifShow &&
                isSchoolMatching(schoolItem.schoolStage, schoolItem.administrativeDistrict)
              ) {
                pre.push(
                  turf.polygon(
                    [schoolItem.areaPointList.map(item => [item.longitude, item.latitude])],
                    {
                      title: schoolItem.name,
                      description: schoolItem.description,
                      administrativeDistrict: schoolItem.administrativeDistrict,
                      fillColor: ADMINISTRATIVE_DISTRICT_COLOR[schoolItem.administrativeDistrict]
                    }
                  )
                )
              }
              return pre
            }, [])
          )
          // @ts-ignore
          map.getSource('geojson-area-source')!.setData(collection)
        },
        { immediate: true }
      )
    })

    map.on('click', 'geojson-area-layer', function (e) {
      const centerOfMassPosition = turf.centerOfMass(e.features![0]).geometry.coordinates
      new mapBoxGl.Popup()
        .setLngLat([centerOfMassPosition[0], centerOfMassPosition[1]])
        .setHTML(
          `
          <div class="InfoWindow" style="padding: 10px">
            <div style="font-size: 18px;font-weight: 500;color: #68a4ff;">
              ${e.features![0].properties?.title}
            </div>
            <div style="font-size: 14px;font-weight: 500;color: #333333;padding-top: 10px;">
              <span style="color: #68a4ff">备注：</span>
              ${e.features![0].properties?.description}
            </div>
            <img style="width: 100%; margin-top: 10px;" src="${'https://pic1.58cdn.com.cn/enterprise/appearance/big/n_v26cf2cd5f6704427d8d7ab4b1a28d261a.jpg'}" />
          </div>
        `
        )
        .addTo(map)
    })

    // Change the cursor to a pointer when the mouse is over the states layer.
    map.on('mouseenter', 'geojson-area-layer', function () {
      map.getCanvas().style.cursor = 'pointer'
    })

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'geojson-area-layer', function () {
      map.getCanvas().style.cursor = ''
    })
  })
</script>

import React from 'react'
import './index.scss'

import type CanvasType from 'vislite/types/Canvas'
import { Canvas, throttle, Mercator } from "vislite"
import chinaData from "../../../assets/china.json"

let updateView: Function
let painter: CanvasType
class ChinaMap extends React.Component {
    refContent: React.RefObject<any>

    constructor(props: any) {
        super(props)
        this.refContent = React.createRef()
    }

    render() {
        return (<div className='china-map' ref={this.refContent} style={{
            width: "100%",
            height: "100%"
        }}>

            {/* 旋转球 */}
            <div className="global-view">
                <div className="global-line"></div>
                <div className="global-rt"></div>
            </div>

            <div className="map_tips left_top">
                <div className="title">
                    全年工业生产量
                </div>
                <div className="value">
                    <span className="item">2</span>
                    <span className="item">4</span>
                    <span>，</span>
                    <span className="item">9</span>
                    <span className="item">3</span>
                    <span className="item">4</span>
                    <span>，</span>
                    <span className="item">2</span>
                    <span className="item">8</span>
                    <span className="item">6</span>
                    <span>M</span>
                </div>
            </div>

            <div className="map_tips right_bottom">
                <div className="title">
                    全年农业生产量
                </div>
                <div className="value">
                    <span className="item">2</span>
                    <span className="item">4</span>
                    <span>，</span>
                    <span className="item">9</span>
                    <span className="item">3</span>
                    <span className="item">4</span>
                    <span>，</span>
                    <span className="item">2</span>
                    <span className="item">8</span>
                    <span className="item">6</span>
                    <span>M</span>
                </div>
            </div>
        </div>)
    }

    componentDidMount() {
        let preRegionName: string = ""
        setTimeout(() => {
            this.doUpdate()

            window.addEventListener("resize", {
                handleEvent: throttle(() => {
                    this.doUpdate()
                }, {
                    keep: true
                }) as any
            })

            this.refContent.current.addEventListener("mousemove", (event: MouseEvent) => {
                if (updateView) {
                    painter.getRegion(event.offsetX, event.offsetY).then((regionName) => {
                        if (preRegionName != regionName) {
                            preRegionName = regionName

                            this.refContent.current.setAttribute('title', regionName)
                            updateView(regionName)
                        }
                    })
                }
            })
        })

    }

    doUpdate() {
        painter = new Canvas(this.refContent.current)

        let info = painter.getInfo()
        let width = info.width
        let height = info.height

        let mercator = new Mercator(Math.min(width * 0.01, height * 0.016)), cx = width * 0.54, cy = height * 0.5

        let drawPolygon = function (data: any, isGray?: boolean) {

            // 绘制区域
            for (let t = 0; t < data.length; t++) {
                painter.beginPath()
                for (let p = 0; p < data[t].length; p++) {
                    let point = mercator.use(data[t][p][0], data[t][p][1])
                    painter.lineTo(point[0] + cx + (isGray ? -5 : 0), point[1] + cy + (isGray ? 15 : 0))
                }
                painter.closePath()

                if (isGray) painter.fill()
                else painter.full()
            }

            // 绘制空间连线
            if (isGray) {
                for (let t = 0; t < data.length; t++) {
                    for (let p = 0; p < data[t].length; p++) {
                        let point = mercator.use(data[t][p][0], data[t][p][1])
                        painter.beginPath().moveTo(point[0] + cx - 5, point[1] + cy + 15).lineTo(point[0] + cx, point[1] + cy).stroke()
                    }
                }
            }
        }

        let drawRegion = function (feature: any, isGray?: boolean) {
            painter.setRegion(feature.properties.name)

            for (let j = 0; j < feature.geometry.coordinates.length; j++) {
                if (feature.geometry.type == "Polygon") {
                    drawPolygon(feature.geometry.coordinates, isGray)
                } else {
                    for (let k = 0; k < feature.geometry.coordinates.length; k++) {
                        drawPolygon(feature.geometry.coordinates[k], isGray)
                    }
                }
            }
        }

        updateView = function (regionName?: string) {
            painter.clearRect(0, 0, width, height)

            painter.config({
                fillStyle: "gray",
                strokeStyle: 'white',
            })

            for (let i = 0; i < chinaData.features.length; i++) {
                drawRegion(chinaData.features[i], true)
            }

            painter.config({
                fillStyle: "#03185f",
                strokeStyle: '#273da6',
                lineWidth: 1
            })

            let currentIndex = -1
            for (let i = 0; i < chinaData.features.length; i++) {
                if (chinaData.features[i].properties.name == regionName) {
                    currentIndex = i;
                } else {
                    drawRegion(chinaData.features[i])
                }
            }

            if (currentIndex != -1) {
                painter.config({
                    fillStyle: '#bc8f09'
                });
                drawRegion(chinaData.features[currentIndex])
            }

        }

        updateView()
    }
}

export default ChinaMap
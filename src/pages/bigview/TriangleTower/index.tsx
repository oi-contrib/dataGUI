import React from 'react'

import { Canvas, throttle, move } from "vislite"

class TriangleTower extends React.Component {
    refContent: React.RefObject<any>

    constructor(props: any) {
        super(props)
        this.refContent = React.createRef()
    }

    render() {
        return (<div ref={this.refContent} style={{
            width: "100%",
            height: "100%"
        }}></div>)
    }

    componentDidMount() {
        setTimeout(() => {
            this.doUpdate()

            window.addEventListener("resize", {
                handleEvent: throttle(() => {
                    this.doUpdate()
                }, {
                    keep: true
                }) as any
            })
        })
    }

    doUpdate() {
        let painter = new Canvas(this.refContent.current)

        let info = painter.getInfo()

        let tpP = [info.width * 0.5, 60]
        let tbP = [info.width * 0.5, info.height - 30]
        let tlP = [130, info.height - 50]
        let trP = [info.width - 130, info.height - 50]

        let leftLen = Math.sqrt((tlP[0] - tpP[0]) * (tlP[0] - tpP[0]) + (tlP[1] - tpP[1]) * (tlP[1] - tpP[1]))
        let rightLen = Math.sqrt((trP[0] - tpP[0]) * (trP[0] - tpP[0]) + (trP[1] - tpP[1]) * (trP[1] - tpP[1]))
        let centerLen = Math.sqrt((tbP[0] - tpP[0]) * (tbP[0] - tpP[0]) + (tbP[1] - tpP[1]) * (tbP[1] - tpP[1]))

        painter.config({
            lineWidth: 1
        })
        for (let i = 0; i < 5; i++) {
            let leftColor = ["#515cb0", "#6c6ee5", "#7f7dba", "#4fb3d3", "#c8c27d"][i]
            let rightColor = ["#5b67c5", "#797afc", "#8e8dd3", "#58c7ea", "#ded98c"][i]

            painter.config({
                fillStyle: "white",
                textBaseline: "bottom",
                fontSize: 12
            })
            if (i % 2 == 0) {
                painter.config({
                    strokeStyle: leftColor,
                    textAlign: "left"
                }).beginPath().moveTo(info.width * 0.5, tlP[1] - 10).lineTo(tlP[0] - 120, tlP[1] - 10).stroke()
                    .fillText((2016 + i) + "年 增加28万吨", tlP[0] - 120, tlP[1] - 12)
            } else {
                painter.config({
                    strokeStyle: rightColor,
                    textAlign: "right"
                }).beginPath().moveTo(info.width * 0.5, trP[1] - 10).lineTo(trP[0] + 120, trP[1] - 10).stroke()
                    .fillText((2016 + i) + "年 增加28万吨", trP[0] + 120, trP[1] - 12)
            }

            painter.config({
                fillStyle: leftColor
            }).beginPath().moveTo(tpP[0], tpP[1]).lineTo(tbP[0], tbP[1]).lineTo(tlP[0], tlP[1]).closePath().fill()

            painter.config({
                fillStyle: rightColor
            }).beginPath().moveTo(tpP[0], tpP[1]).lineTo(tbP[0], tbP[1]).lineTo(trP[0], trP[1]).closePath().fill()

            if (i < 4) {
                tlP = move(tpP[0] - tlP[0], tpP[1] - tlP[1], leftLen * 0.17, tlP[0], tlP[1])
                trP = move(tpP[0] - trP[0], tpP[1] - trP[1], rightLen * 0.17, trP[0], trP[1])
                tbP = move(tpP[0] - tbP[0], tpP[1] - tbP[1], centerLen * 0.17, tbP[0], tbP[1])
            }

        }
    }
}

export default TriangleTower
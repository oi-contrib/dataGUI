import React from 'react'

import { Canvas, rotate, throttle } from "vislite"
import data from "./data.json"

class RosePie extends React.Component {
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
        let radius = Math.min(info.width * 0.5, info.height * 0.5) - 40
        let cx = info.width * 0.5, cy = info.height * 0.5 + 20

        let allValue = 0, maxValue = 0
        for (let i = 0; i < data.length; i++) {
            allValue += data[i].value
            if (maxValue < data[i].value) {
                maxValue = data[i].value
            }
        }

        painter.config({
            lineWidth: 1
        })

        let colors = ['#4d8ffd', '#3af4f9', '#4dfd7d', '#b7fd4d', '#fdf24d', '#ffc425', '#fd974d', '#fd4d58', '#b74dfd', '#724dfd', '#4d5cfd']

        let beginDeg = Math.PI * -0.6
        let deg = Math.PI * 2 / data.length;
        for (let index = 0; index < data.length; index++) {
            let radius2 = (radius - radius * 0.3) * (data[index].value / maxValue) + radius * 0.3
            let color = colors[index];

            painter.config({
                "fillStyle": color,
                'strokeStyle': color
            })

                .fillArc(cx, cy, radius * 0.3, radius2, beginDeg, deg)

            let dot1 = rotate(cx, cy, beginDeg + deg * 0.5, cx + radius * 0.3 + (radius2 - radius * 0.3) * 0.75, cy)
            let dot2 = rotate(cx, cy, beginDeg + deg * 0.5, cx + radius2 + 10, cy)
            let dot3 = [dot2[0] + (dot2[0] > cx ? 10 : -10), dot2[1]]

            // 连线
            painter.beginPath().moveTo(dot1[0], dot1[1]).lineTo(dot2[0], dot2[1]).lineTo(dot3[0], dot3[1]).stroke()

            // 提示文字
            painter.config({
                'fontSize': 9,
                "textBaseline": "middle",
                'textAlign': dot3[0] > cx ? "left" : "right"
            }).fillText(" " + data[index].mark + " " + data[index].value + " ", dot3[0], dot3[1])


            // 百分百
            painter.config({
                'fontSize': 7,
                'textAlign': "center",
                'fillStyle': 'white'
            }).fillText((data[index].value / allValue * 100).toFixed(0) + "%", dot1[0], dot1[1])

            beginDeg += deg
        }
    }
}

export default RosePie
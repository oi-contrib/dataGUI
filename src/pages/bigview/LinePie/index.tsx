import React from 'react'

import { Canvas, throttle } from "vislite"

class LinePie extends React.Component {
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
        let radius = Math.min(info.width * 0.5, (info.height - 50) * 0.5) - 10
        let cx = info.width * 0.5, cy = 50 + radius

        painter.config({
            textAlign: "center",
            fillStyle: "white",
            strokeStyle: "#7a8f9e",
            shadowColor: "white",
            shadowBlur: 5,
            lineWidth: 1,
            fontSize: 18
        })
            .fillText("第三产业", 70, 70)
            .fillText("40.6%", 70, 90)
            .beginPath().moveTo(30, 100).lineTo(110, 100).lineTo(cx, cy).stroke()
            .fillText("第一产业", info.width - 50, info.height - 90)
            .fillText("29.5%", info.width - 50, info.height - 70)
            .beginPath().moveTo(info.width - 10, info.height - 60).lineTo(info.width - 110, info.height - 60).lineTo(cx, cy).stroke()
            .fillText("第二产业", 70, info.height - 50)
            .fillText("29.9%", 70, info.height - 30)
            .beginPath().moveTo(30, info.height - 20).lineTo(110, info.height - 20).lineTo(cx, cy).stroke()

        painter.config({
            fillStyle: "#2b2f38",
            shadowBlur: 0
        }).fillCircle(cx, cy, radius * 0.5)
            .config({
                fillStyle: "#4b4d55"
            }).fillCircle(cx, cy, radius * 0.3)
            .config({
                fillStyle: "#8f9092"
            }).fillCircle(cx, cy, radius * 0.1)
            .config({
                fillStyle: "gray"
            }).fillArc(cx, cy, radius * 0.65 - 2, radius * 0.65 - 4, 0, Math.PI * 2)

        let perDeg = Math.PI * 2 / 70
        for (let i = 0; i < 70; i++) {
            if (i == 0) {
                painter.config({
                    fillStyle: "#9a8a56"
                })
            } else if (i == 23) {
                painter.config({
                    fillStyle: "#9fbd69"
                })
            } else if (i == 50) {
                painter.config({
                    fillStyle: "#4583a7"
                })
            }
            painter.fillArc(cx, cy, radius * 0.65, radius * 0.9, Math.PI * 0.4 + perDeg * i, perDeg * 0.6)
        }

    }
}

export default LinePie
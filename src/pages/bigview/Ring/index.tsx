import React from 'react'

import { Canvas, throttle } from "vislite"

class Ring extends React.Component {
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
        painter.config({
            arcEndCap: "round",
            fontSize: 12
        })

        let radius = Math.min(info.width * 0.5, (info.height - 50) * 0.5) - 10
        for (let i = 0; i < 4; i++) {
            painter.config({
                fillStyle: ["#7679b6", "#777ef9", "#57c7ee", "#dcd086"][i]
            }).fillArc(info.width * 0.5, (info.height - 50) * 0.5 + 50, radius * (1 - 0.2 * i), radius * (1 - 0.2 * i - 0.18), Math.PI * 0.5, (4 - i) * 0.8 + 1)
                .config({
                    fillStyle: "white"
                }).fillText((2016 + i) + "年 增长10%", info.width * 0.5 + 5, (info.height - 50) * 0.5 + 50 + radius * (1 - 0.2 * i - 0.09))
        }
    }
}

export default Ring
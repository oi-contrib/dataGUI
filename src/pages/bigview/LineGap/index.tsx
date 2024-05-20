import React from 'react'

import { Canvas, throttle } from "vislite"

class LineGap extends React.Component {
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
        let top = 50, itemHeight = (info.height - 70) / 6, itemWidth = info.width
        for (let i = 0; i < 6; i++) {
            let value = [28, 24, 19, 15, 12, 7][i]

            painter.config({
                fillStyle: "gray",
                textAlign: "right"
            }).fillText("部门" + (i + 1), 60, top + itemHeight * 0.5)

            painter.config({
                fillStyle: ["#56b39a", "#3c8da4", "#56babb", "#b9dc5a", "#ba8c5a", "#972f6f"][i]
            })
            for (let j = 0; j < 30; j++) {
                if (j == value) painter.config({
                    fillStyle: "#0f354d"
                })
                painter.fillRect(j * (itemWidth - 150) / 30 + 70, top + itemHeight * 0.15, (itemWidth - 150) / 30 * 0.7, itemHeight * 0.7)
            }

            painter.config({
                fillStyle: "#346e95",
                textAlign: "left"
            }).fillText(value * 200, itemWidth - 60, top + itemHeight * 0.5)

            top += itemHeight
        }
    }
}

export default LineGap
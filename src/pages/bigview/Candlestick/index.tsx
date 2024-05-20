import React from 'react'

import { Canvas, throttle } from "vislite"

class Candlestick extends React.Component {
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

        let time = ['2017-10-24', '2017-10-25', '2017-10-26', '2017-10-27']
        let data = [
            // 开、关、低、高
            [20, 34, 10, 38],
            [40, 35, 30, 50],
            [31, 38, 33, 44],
            [38, 15, 5, 42]
        ]

        let info = painter.getInfo()

        let width = info.width
        let height = info.height - 50

        let grid = {
            left: 30, right: 10, top: 0, bottom: 30
        }

        let calcY = function (value: number) {
            return (50 - value) / 50 * (height - grid.top - grid.bottom) + 50 + grid.top
        }

        let calcX = function (index: number) {
            return index / 4 * (width - grid.left - grid.right) + grid.left
        }

        painter.config({
            strokeStyle: "rgba(255,255,255,0.6)",
            fillStyle: "rgba(255,255,255,0.6)",
            lineWidth: 1,
            textAlign: "right",
            fontSize: 10
        })

        for (let i = 0; i <= 5; i++) {
            painter.config({
                lineDash: i == 0 ? [] : [5, 15]
            }).beginPath()
                .moveTo(grid.left, calcY(i * 10))
                .lineTo(width - grid.right, calcY(i * 10))
                .stroke().fillText(i * 10, grid.left - 10, calcY(i * 10))
        }

        painter.config({
            lineDash: []
        })
        for (let i = 0; i <= 4; i++) {
            painter.beginPath().moveTo(calcX(i), calcY(0)).lineTo(calcX(i), calcY(0) + 5).stroke()
        }

        painter.config({
            textAlign: "center",
            textBaseline: "top"
        })

        let singleWidth = (width - grid.left - grid.right) / 4 * 0.7
        for (let i = 0; i < time.length; i++) {

            // 底部刻度
            painter.fillText(time[i], calcX(i + 0.5), calcY(0) + 5)

            painter.config({
                lineWidth: 2,
                strokeStyle: data[i][0] > data[i][1] ? "#5ab362" : "#ea5454"
            }).beginPath().moveTo(calcX(i + 0.5), calcY(data[i][2])).lineTo(calcX(i + 0.5), calcY(data[i][3])).stroke().config({
                lineWidth: singleWidth
            }).beginPath().moveTo(calcX(i + 0.5), calcY(data[i][0])).lineTo(calcX(i + 0.5), calcY(data[i][1])).stroke()
        }

    }
}

export default Candlestick
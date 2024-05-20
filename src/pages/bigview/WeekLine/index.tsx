import React from 'react'

import { Canvas, throttle } from "vislite"

class WeekLine extends React.Component {
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

        let width = info.width
        let height = info.height - 50

        let grid = {
            left: 30, right: 10, top: 0, bottom: 30
        }

        let calcY = function (value: number) {
            return (200 - value) / 200 * (height - grid.top - grid.bottom) + 50 + grid.top
        }

        let calcX = function (index: number) {
            return index / 7 * (width - grid.left - grid.right) + grid.left
        }

        painter.config({
            strokeStyle: "rgba(255,255,255,0.6)",
            fillStyle: "rgba(255,255,255,0.6)",
            lineWidth: 1,
            textAlign: "right",
            fontSize: 10
        })

        for (let i = 0; i <= 4; i++) {
            painter.config({
                lineDash: i == 0 ? [] : [5, 15]
            }).beginPath()
                .moveTo(grid.left, calcY(i * 50))
                .lineTo(width - grid.right, calcY(i * 50))
                .stroke().fillText(i * 50, grid.left - 10, calcY(i * 50))
        }

        let data = [120, 200, 150, 80, 70, 110, 130]
        let weeks = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

        for (let i = 0; i <= 7; i++) {
            painter.beginPath().moveTo(calcX(i), calcY(0)).lineTo(calcX(i), calcY(0) + 5).stroke()
        }

        painter.config({
            textAlign: "center",
            textBaseline: "top"
        })

        // 底部刻度
        for (let i = 0; i < weeks.length; i++) {
            painter.fillText(weeks[i], calcX(i + 0.5), calcY(0) + 5)
        }

        // 连线
        painter.config({
            lineDash: [2, 4],
            lineWidth: 4,
            strokeStyle: "#5470C6"
        }).beginPath()
        for (let i = 0; i < data.length; i++) {
            painter.lineTo(calcX(i + 0.5), calcY(data[i]))
        }
        painter.stroke()

        // 三角形
        painter.config({
            lineDash: [],
            lineWidth: 1,
            strokeStyle: "red",
            fillStyle: "yellow"
        })
        for (let i = 0; i < data.length; i++) {
            let x = calcX(i + 0.5)
            let y = calcY(data[i])

            painter.beginPath().moveTo(x, y - 7).lineTo(x - 5, y + 5).lineTo(x + 5, y + 5).closePath().full()
        }
    }
}

export default WeekLine
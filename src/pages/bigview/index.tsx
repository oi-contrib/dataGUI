import React from 'react'
import './index.scss'

import { throttle } from "vislite"

import RosePie from "./RosePie"
import Candlestick from "./Candlestick"
import LinePie from "./LinePie"
import Ring from "./Ring"
import TriangleTower from "./TriangleTower"
import LineGap from "./LineGap"
import ChinaMap from "./ChinaMap"
import WeebTable from "./WeebTable"
import WeebLine from "./WeekLine"

interface IState {
    titleSize: number
}
class Bigview extends React.Component<{}, IState> {
    refContent: React.RefObject<any>

    constructor(props: any) {
        super(props)
        this.refContent = React.createRef()

        this.state = {
            titleSize: 30
        }
    }

    componentDidMount() {
        this.updateSize()

        window.addEventListener("resize", {
            handleEvent: throttle(() => {
                this.updateSize()
            }, {
                keep: true
            }) as any
        })
    }

    updateSize() {
        let width = 1920
        let height = 1920 * window.innerHeight / window.innerWidth
        let scaleVal = window.innerWidth / 1920

        this.refContent.current.style.transform = 'scale(' + scaleVal + ',' + scaleVal + ' )'
        this.refContent.current.style.width = width + "px"
        this.refContent.current.style.height = height + 'px'

        this.setState({
            titleSize: height * 0.03
        })
    }

    render() {
        return (<div className='bigview-view'>

            <div className='root' ref={this.refContent} >

                {/* 大标题 */}
                <div className="title-view">
                    <div className="title" style={{
                        fontSize: this.state.titleSize + "px"
                    }}>
                        可视化大屏
                    </div>
                </div>

                {/* 左上 */}
                <div className="view-item" style={{
                    left: "1%",
                    top: "6%"
                }}>
                    <div className='sub-title'>全国部门数据信息</div>
                    <LineGap></LineGap>
                </div>

                {/* 左中 */}
                <div className="view-item" style={{
                    left: "1%",
                    top: "37.5%"
                }}>
                    <div className='sub-title'>金融业务</div>
                    <RosePie></RosePie>
                </div>

                {/* 左下 */}
                <div className="view-item" style={{
                    left: "1%",
                    top: "69%"
                }}>
                    <div className='sub-title'>股票变化情况</div>
                    <Candlestick></Candlestick>
                </div>

                {/* 中上 */}
                <div className="view-item" style={{
                    left: "23%",
                    top: "9%",
                    width: "54%",
                    height: "60%",
                    backgroundColor: "transparent"
                }}>
                    <ChinaMap></ChinaMap>
                </div>

                {/* 中下左 */}
                <div className="view-item" style={{
                    left: "24%",
                    top: "69%",
                    width: "25.5%"
                }}>
                    <div className='sub-title'>一周数据变化</div>
                    <WeebLine></WeebLine>
                </div>

                {/* 中下右 */}
                <div className="view-item" style={{
                    right: "24%",
                    top: "69%",
                    width: "25.5%"
                }}>
                    <div className='sub-title'>一周数据明细</div>
                    <WeebTable></WeebTable>
                </div>

                {/* 右上 */}
                <div className="view-item" style={{
                    right: "1%",
                    top: "6%"
                }}>
                    <div className='sub-title'>三大产业占比</div>
                    <LinePie></LinePie>
                </div>

                {/* 右中 */}
                <div className="view-item" style={{
                    right: "1%",
                    top: "37.5%"
                }}>
                    <div className='sub-title'>掘进效率</div>
                    <Ring></Ring>
                </div>

                {/* 右下 */}
                <div className="view-item" style={{
                    right: "1%",
                    top: "69%"
                }}>
                    <div className='sub-title'>万吨掘进率</div>
                    <TriangleTower></TriangleTower>
                </div>

            </div>

        </div>)
    }
}

export default Bigview

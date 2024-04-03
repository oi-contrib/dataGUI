import React from 'react'
import './index.scss'

import { throttle } from "vislite"

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
                }}></div>

                {/* 左中 */}
                <div className="view-item" style={{
                    left: "1%",
                    top: "37.5%"
                }}></div>

                {/* 左下 */}
                <div className="view-item" style={{
                    left: "1%",
                    top: "69%"
                }}></div>

                {/* 中下左 */}
                <div className="view-item" style={{
                    left: "24%",
                    top: "69%",
                    width: "25.5%"
                }}></div>

                {/* 中下右 */}
                <div className="view-item" style={{
                    right: "24%",
                    top: "69%",
                    width: "25.5%"
                }}></div>

                {/* 右上 */}
                <div className="view-item" style={{
                    right: "1%",
                    top: "6%"
                }}></div>

                {/* 右中 */}
                <div className="view-item" style={{
                    right: "1%",
                    top: "37.5%"
                }}></div>

                {/* 右下 */}
                <div className="view-item" style={{
                    right: "1%",
                    top: "69%"
                }}></div>

            </div>

        </div>)
    }
}

export default Bigview

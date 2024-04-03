import React from 'react'
import './index.scss'

class Index extends React.Component {

    render() {
        return (<div className='index-view' style={{
            minHeight: "100vh",
            backgroundColor: "#ebebeb",
            padding: "20px"
        }}>

            {/* 可视化大屏 */}
            <a className='bigview' style={{
                width: "400px",
                height: "200px",
                backgroundImage: "url('./snipping/bigview.jpeg')",
                position: "fixed",
                right: "20px",
                top: "20px",
                backgroundSize: "cover"
            }} target='_blank' href="#/bigview">
                <h3 style={{
                    position: "absolute",
                    bottom: "-40px",
                    left: "10px",
                    fontWeight: "800",
                    fontFamily: "cursive",
                    color: "black"
                }}>可视化大屏</h3>
            </a>

            {/* 图表用例 */}
            <div style={{
                width: "calc(100vw - 460px)",
                minHeight: "calc(100vh - 40px)",
                backgroundColor: "white",
                outline: "1px solid #9E9E9E",
                borderRadius: "10px"
            }}>
                <h3 style={{
                    position: "absolute",
                    bottom: "30px",
                    left: "30px",
                    fontWeight: "800",
                    fontFamily: "cursive",
                    color: "black"
                }}>图表用例</h3>
            </div>

        </div>)
    }
}

export default Index

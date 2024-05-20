import React from 'react'
import './index.scss'

import { Link } from 'react-router-dom'

class Index extends React.Component {

    render() {

        return (<div className='index-view' style={{
            minHeight: "100vh",
            backgroundColor: "#ebebeb",
            padding: "20px"
        }}>

            {/* 可视化大屏 */}
            <Link className='bigview' style={{
                width: "400px",
                height: "200px",
                backgroundImage: "url('./snipping/bigview.jpeg')",
                position: "fixed",
                right: "20px",
                top: "20px",
                backgroundSize: "cover"
            }} to="/bigview">
                <h3 style={{
                    position: "absolute",
                    bottom: "-40px",
                    left: "10px",
                    fontWeight: "800",
                    fontFamily: "cursive",
                    color: "black"
                }}>可视化大屏</h3>
            </Link>

            {/* 图表用例 */}
            <div className='itemsview' style={{
                width: "calc(100vw - 460px)",
                minHeight: "calc(100vh - 40px)",
                backgroundColor: "white",
                outline: "1px solid #9E9E9E",
                borderRadius: "10px",
                columnCount: "auto",
                columnWidth: "220px",
                columnGap: "10px",
                padding: "10px"
            }}>

                <Link className='item' to="/manual-unlocking" >
                    <div className="icon" style={{
                        height: "310px",
                        backgroundImage: "url('./snipping/manual-unlocking.jpeg')",
                    }}></div>
                    <h4 className='label'>手式解锁</h4>
                </Link>

                <Link className='item' to="/ring3d">
                    <div className="icon" style={{
                        height: "200px",
                        backgroundImage: "url('./snipping/ring3d.jpeg')",
                    }}></div>
                    <h4 className='label'>3D环图</h4>
                </Link>

                <Link className='item' to="/h2o">
                    <div className="icon" style={{
                        height: "160px",
                        backgroundImage: "url('./snipping/h2o.png')",
                    }}></div>
                    <h4 className='label'>水分子式 H2O</h4>
                </Link>

            </div>

        </div>)
    }

}

export default Index

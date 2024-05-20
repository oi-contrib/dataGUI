import React from 'react'

class WeebTable extends React.Component {
    refContent: React.RefObject<any>

    constructor(props: any) {
        super(props)
        this.refContent = React.createRef()
    }

    render() {
        return (<div ref={this.refContent} style={{
            width: "100%",
            height: "100%"
        }}>
            <table style={{
                width: "calc(100% - 40px)",
                height: "calc(100% - 50px)",
                border: "1px solid gray",
                marginLeft: "20px",
                marginTop: "40px",
                textAlign: "center"
            }}>
                <thead style={{
                    lineHeight: "30px",
                    backgroundColor: "#506976",
                    color: "white"
                }}>
                    <tr>
                        <td>序号</td>
                        <td>名称</td>
                        <td>描述</td>
                        <td>产出量</td>
                        <td>趋势</td>
                    </tr>
                </thead>
                <tbody style={{
                    color: "#9E9E9E"
                }}>
                    <tr>
                        <td>#1</td>
                        <td>尿酸</td>
                        <td>一种肥料</td>
                        <td>102顿</td>
                        <td>⇡上涨</td>
                    </tr>
                    <tr>
                        <td>#2</td>
                        <td>黄瓜</td>
                        <td>蔬果类</td>
                        <td>34顿</td>
                        <td>⇡上涨</td>
                    </tr>
                    <tr>
                        <td>#3</td>
                        <td>番茄</td>
                        <td>蔬果类</td>
                        <td>380顿</td>
                        <td>⇣下降</td>
                    </tr>
                    <tr>
                        <td>#4</td>
                        <td>矿泉水</td>
                        <td>重要的资源</td>
                        <td>420顿</td>
                        <td>⇡上涨</td>
                    </tr>
                    <tr>
                        <td>#5</td>
                        <td>西瓜</td>
                        <td>水果，很好吃</td>
                        <td>1420顿</td>
                        <td>⇣下降</td>
                    </tr>
                    <tr>
                        <td>#6</td>
                        <td>大米</td>
                        <td>主要的食物</td>
                        <td>34420顿</td>
                        <td>⇡上涨</td>
                    </tr>

                </tbody>
            </table>
        </div>)
    }
}

export default WeebTable
import React from 'react'
import { useRoutes } from "react-router-dom"
import LazyComponent from './components/lazy-component'

import './styles/App.scss'

import store from './stores/index'
import dialogs from './dialogs/lazy-load'

// 引入页面
let Index = LazyComponent(() => import('./pages/index/index'))
let Bigview = LazyComponent(() => import('./pages/bigview/index'))

const App: React.FC = (): JSX.Element => {
  const routing = useRoutes([
    {
      path: "/bigview",
      element: <Bigview />
    },
    {
      path: "/",
      element: <Index />
    }
  ])

  class UiDialog extends React.Component {
    constructor(props: any) {
      super(props)

      this.state = {
        pages: []
      }

      // 监听store改变
      store.subscribe(() => {
        this.setState({
          pages: store.getState()["dialogInstance"]
        })

      })
    }

    render() {
      return (<div className="dialog-view">
        {/* 统一遮罩 */}
        <div className="mask"></div>
        {
          (this.state as any).pages.map((item: any, index: any) => <div key={index}>{(() => {
            let NyDialog = (dialogs as any)[item.id]

            return (<NyDialog data={item.data}></NyDialog>)
          })()}</div>)
        }</div>)
    }
  }

  return <>

    {/* 主体内容 */}
    <div className="main-view">
      {routing}
    </div>

    {/* 弹框 */}
    <UiDialog></UiDialog>
  </>
}

export default App

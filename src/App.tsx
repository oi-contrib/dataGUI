import React from 'react'
import { useRoutes } from "react-router-dom"
import LazyComponent from './components/lazy-component'

import './styles/App.scss'

// 引入页面
let Index = LazyComponent(() => import('./pages/index/index'))
let Bigview = LazyComponent(() => import('./pages/bigview/index'))
let ManualUnlocking = LazyComponent(() => import('./pages/manual-unlocking/index'))
let Ring3D = LazyComponent(() => import('./pages/ring3d/index'))
let H2O = LazyComponent(() => import('./pages/h2o/index'))

const App: React.FC = (): JSX.Element => {
  const routing = useRoutes([
    {
      path: "/bigview",
      element: <Bigview />
    }, {
      path: "/manual-unlocking",
      element: <ManualUnlocking />
    }, {
      path: "/ring3d",
      element: <Ring3D />
    }, {
      path: "/h2o",
      element: <H2O />
    }, {
      path: "/",
      element: <Index />
    }
  ])

  return (<>

    {/* 内容 */}
    <div className="main-view">
      {routing}
    </div>

    {/* 源码 */}
    <a target='_blank' href='https://github.com/oi-contrib/dataGUI' title='查看源码' style={{
      position: "fixed",
      right: "20px",
      bottom: "20px",
      width: "50px",
      height: "50px",
      backgroundImage: "url('./logo.png')",
      backgroundSize: "90% auto",
      backgroundColor: "white",
      borderRadius: "50%",
      backgroundPosition: "center center",
      boxShadow: "0 0 5px 3px #607D8B"
    }}></a>

  </>)
}

export default App

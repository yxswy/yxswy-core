import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';
import 'monaco-editor/esm/vs/editor/contrib/find/browser/findController.js';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

// import axios from 'axios'
import { Button } from 'antd'

import { createRef, useEffect } from 'react'
import '../layouts/index2.less'
monaco.editor.defineTheme('BlackTheme', {
  base: 'vs-dark',
  inherit: true,
  rules: [{
    background: '#1e1e1e',
    token: '2'
  }],
  colors: {
    // 相关颜⾊属性配置
    // 'editor.foreground': '#000000',
    'editor.background': '#1e1e1e',     //背景⾊
    // 'editorCursor.foreground': '#8B0000',
    // 'editor.lineHighlightBackground': '#0000FF20',
    // 'editorLineNumber.foreground': '#008800',
    // 'editor.selectionBackground': '#88000030',
    // 'editor.inactiveSelectionBackground': '#88000015'
  }
});
// //设置⾃定义主题
monaco.editor.setTheme('BlackTheme');

let monacoInstance: monaco.editor.IStandaloneCodeEditor
let monacoInstanceNext: monaco.editor.IStandaloneCodeEditor

export default function HomePage() {

  const monacoRef = createRef<HTMLDivElement>();
  const nextMonacoRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (!monacoInstance) {
      monacoInstance = monaco.editor.create(monacoRef.current as HTMLDivElement, {
        value: `console.log("hello,world")`,
        language: "javascript",
        // theme: 'BlackTheme',
        automaticLayout: true,
        fontSize: 15,
        lineHeight: 1.8
      })

      monacoInstanceNext = monaco.editor.create(nextMonacoRef.current as HTMLDivElement, {
        value: ``,
        language: "javascript",
        // theme: 'BlackTheme',
        automaticLayout: true,
        fontSize: 15,
        lineHeight: 1.8
      })
    }
  }, [])

  const transform = () => {
    // axios.post('http://localhost:3010/es6_to_es5', {
    //   data: {
    //     code: monacoInstance.getValue()
    //   }
    // })
    //   .then(res => res.data)
    //   .then(res => {
    //     console.log(res.data)
    //     monacoInstanceNext.setValue(res.data)
    //   })
  }

  return (
    <div className='root'>
      <div className='header'>
        <span>eS6 To es5</span>
        <Button type='primary' className="transform-button" onClick={transform}>转化</Button>
      </div>
      <div className="transform-box">
        <div id="monaco">
          <div className="box" ref={monacoRef}></div>
        </div>
        <div id="monacoNext">
          <div className="box" ref={nextMonacoRef}></div>
        </div>
      </div>
    </div>
  );
}

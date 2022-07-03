import '../styles/function.less'
import { Breadcrumb, Button, Modal } from 'antd';
import { useState, useRef, useEffect } from 'react';

export default function FunctionPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const monacoRef = useRef<HTMLInputElement>(null);

  const jumpTo = (url: string): void => {
    window.open(url)
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      {/* <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Application Center</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Application List</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>An Application</Breadcrumb.Item>
      </Breadcrumb> */}

      <h3 className='function-title'>functions</h3>

      <div className="function">
        <a className="item" href="http://1.117.69.24/yxswy-transform/" target="_blank">es6 使用 babel 转 es5</a>
        <div className="item">es6 使用 babel 转 es5</div>
        <div className="item">es6 使用 babel 转 es5</div>
        <div className="item">es6 使用 babel 转 es5</div>
      </div>

      <Modal width={800} title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <div id="monaco" ref={monacoRef}></div>
        <Button type="primary">转化</Button>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
}

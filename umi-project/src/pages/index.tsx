import yayJpg from '../assets/yay.jpg';

import { Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { Button, Tabs, Pagination, Modal } from 'antd';
import { useState } from 'react';

const { TabPane } = Tabs;

const onChange = (key: string) => {
  console.log(key);
};

interface DataType {
  key: string;
  name: string;
  money: string;
  address: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: '标题',
    dataIndex: 'name',
    render: text => <a target={"_blank"} href="https://www.baidu.com">{text}</a>,
  },
  {
    width: '280px',
    title: '操作',
    dataIndex: 'address',
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: '定义一个 HTML 块，该块会决定 Angular 如何渲染单个条目。',
    money: '￥300,000.00',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: '要列出你的条目，请把一个简写形式 let item of items 赋值给 *ngFor。',
    money: '￥1,256,000.00',
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: '定义一个 HTML 块，该块定 Angulwear 如何渲染单个条目。',
    money: '￥120,000.00',
    address: 'Sidney No. 1 Lake Park',
  },
];

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record: DataType) => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};


export default function HomePage() {

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  return (
    <div>
      <Tabs defaultActiveKey="1" onChange={onChange}>
        <TabPane tab="Related articles" key="1">
          <Button type="primary" className="mb16" onClick={showModal}>Create Now</Button>
          <Table
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            columns={columns}
            dataSource={data}
            bordered
            size="middle"
            pagination={false}
          />
          <div className="site-layout-pagination">
            <Pagination defaultCurrent={6} total={500} />
          </div>

          <Modal
            title="新增数据"
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <p>{modalText}</p>
          </Modal>
        </TabPane>
        <TabPane tab="Advanced query" key="2">
          <Button type="primary">Button</Button>
          <h2>Yay! Welcome to umi!</h2>
          <p>
            <img src={yayJpg} width="388" />
          </p>
          <p>
            To get started, edit <code>pages/index.tsx</code> and save to reload.
          </p>
        </TabPane>
        <TabPane tab="Components" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </div>
  );
}

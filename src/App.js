import React from 'react';
import { Layout } from 'antd';
import { Header, Content } from './styles/AppStyle';
const App = () => {
  // const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Header>
        <span>Travel Todo</span>
      </Header>
      <Content>
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'white',
            borderRadius: 10,
          }}
        >
          Map
        </div>
      </Content>
    </Layout>
  );
};
export default App;

import React, { useEffect, useState, useReducer } from 'react';
import { useIntl, getLocale, getAllLocales, setLocale } from 'umi';
import { Button, Divider, message } from 'antd'
import { CopyOutlined } from '@ant-design/icons';
import AppContext from './createContext'
import copy from 'copy-to-clipboard';
import styles from './index.less';
import { Layout, } from 'antd'
import reducer from './reducer'
import Login from './login'
import FileList from './FileList'
import logo from '@/logo.png'
const { Header, Content, Footer } = Layout;

export default () => {
  const [state, dispatch] = useReducer(reducer, {})
  const [loginStatus, setLoginStatus] = useState(false)
  const intl = useIntl();
  const currentLocale = getLocale();
  const locales = getAllLocales()

  const handleChangeLanguage = () => {
    const nextLocale = locales.find(
      locale => locale !== currentLocale,
    ) as string;
    setLocale(nextLocale, false);
  };

  const handleCopy = (v: string) => {
    if (copy(v)) {
      message.success(intl.formatMessage({ id: 'COPY_LINK_SUCCESS' }));
    } else {
      message.warn(intl.formatMessage({ id: 'COPY_LINK_FAIL' }));
    }
  }

  const loginedPad = (
    <div className={styles.loginedPad}>
      <span>accountId：{window.localStorage.getItem('accountId')}</span>
      <Divider type="vertical" style={{ margin: '0 15px' }} />
      apiUrl<a onClick={() => handleCopy(window.localStorage.getItem('apiUrl'))}><CopyOutlined /></a>
      <Divider type="vertical" style={{ margin: '0 15px' }} />
      downloadUrl<a onClick={() => handleCopy(window.localStorage.getItem('downloadUrl'))}><CopyOutlined /></a>
    </div>
  )

  useEffect(() => {
    if (window.localStorage.getItem('accountId')) {
      setLoginStatus(true)
    } else {
      setLoginStatus(false)
    }
  }, [state])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Layout className={styles.layout}>
        <Header className={styles.header}><img src={logo} alt="" />B2Viewer</Header>
        <Content className={styles.content}>
          <Button onClick={handleChangeLanguage} shape="round" style={{ float: 'right' }}>{intl.formatMessage(
            {
              id: 'LANGUAGE'
            })}</Button>
          {!loginStatus ? <Login /> : loginedPad}
          <FileList />
        </Content>
        <Footer style={{ textAlign: 'center' }}><a href="https://github.com/Shen-Yu/b2-viewer">B2Viewer</a> ©2020 Created by <a href="https://github.com/Shen-Yu">Shen-Yu</a></Footer>
      </Layout>
    </AppContext.Provider>
  );
}

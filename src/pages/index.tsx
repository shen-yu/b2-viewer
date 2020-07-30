import React, { useEffect, useState, useReducer } from 'react';
import { useIntl, getLocale, getAllLocales, setLocale } from 'umi';
import { Button } from 'antd'
import AppContext from './createContext'
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

  const loginedPad = (
    <div style={{ marginBottom: 10 }}>AccountId：{window.localStorage.getItem('accountId')}</div>
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
        <Footer style={{ textAlign: 'center' }}>B2Viewer ©2020 Created by <a href="https://github.com/Shen-Yu">Shen-Yu</a></Footer>
      </Layout>
    </AppContext.Provider>
  );
}

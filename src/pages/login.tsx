import React, { useContext, useMemo } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useIntl } from 'umi'
import Base64 from 'crypto-js/enc-base64';
import Utf8 from 'crypto-js/enc-utf8';
import { getAuthorize } from '@/services';
import AppContext from './createContext';


const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 22 },
};
const tailLayout = {
    wrapperCol: { offset: 2, span: 22 },
};

export default () => {
    const intl = useIntl()
    const { state, dispatch } = useContext(AppContext);

    const onFinish = (values: any) => {
        const Authorization =
            'Basic' +
            Base64.stringify(
                Utf8.parse(`${values.applicationKeyId}:${values.applicationKey}`),
            );
        getAuthorize({ Authorization }).then((res: any) => {
            if (res) {
                dispatch({
                    type: 'SET_LOGIN',
                    params: res
                })
                window.localStorage.setItem('accountId', res.accountId);
                window.localStorage.setItem('authorizationToken', res.authorizationToken);
                window.localStorage.setItem('apiUrl', res.apiUrl);
                window.localStorage.setItem('downloadUrl', res.downloadUrl);
                message.success(intl.formatMessage({ id: 'LOGIN_SUCCESS' }))
            }
        }).catch((err: any) => {
            console.log(err)
        });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    useMemo(() => { console.log(state) }, [state])

    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{ marginBottom: 10 }}
            layout='inline'
        >
            <Form.Item
                name="applicationKeyId"
                rules={[
                    { required: true, message: intl.formatMessage({ id: 'TIP_ID' }) },
                ]}
                style={{ display: 'inline-block' }}
            >
                <Input style={{ width: 260 }} placeholder={intl.formatMessage({ id: 'TIP_ID' })} />
            </Form.Item>

            <Form.Item
                name="applicationKey"
                rules={[
                    { required: true, message: intl.formatMessage({ id: 'TIP_KEY' }) },
                ]}
                style={{ display: 'inline-block' }}
            >
                <Input.Password
                    style={{ width: 260 }}
                    placeholder={intl.formatMessage({ id: 'TIP_KEY' })}
                />
            </Form.Item>

            <Form.Item {...tailLayout} style={{ display: 'inline-block' }}>
                <Button type="primary" htmlType="submit">
                    {intl.formatMessage({ id: 'LOGIN' })}
                </Button>
            </Form.Item>
        </Form>
    );
};

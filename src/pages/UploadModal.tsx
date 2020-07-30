import React, { useEffect, useReducer, useState, useContext } from 'react';
import reducer from './reducer';
import { Modal, Upload, message } from 'antd';
import AppContext from './createContext';
import * as CryptoJS from 'crypto-js';
import { InboxOutlined } from '@ant-design/icons';
const { Dragger } = Upload;

export default ({ uploadModalShow, setUploadModalShowFn }) => {
  const ctx = useContext(AppContext);
  const { state, dispatch } = ctx;
  const [uploadUrl, setUploadUrl] = useState('');
  const [fileSha, setFileSha] = useState('');

  const beforeAction = file => {
    const reader = new FileReader();
    reader.onload = function () {
      const hash: string = CryptoJS.SHA1(
        CryptoJS.enc.Latin1.parse(reader.result as string),
      ) as any;
      setFileSha(hash);
    };
  };

  useEffect(() => {
    if (state.upload) {
      setUploadUrl(state.upload.uploadUrl);
    }
  }, [state]);

  return (
    <Modal
      title="Upload Box"
      visible={uploadModalShow}
      footer={null}
      onCancel={() => setUploadModalShowFn(false)}
    >
      <Upload
        name="file"
        action="/upload"
        headers={{
          Authorization: state.authorizationToken,
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'cross-site',
          'X-Bz-File-Name': 'test.txt',
          'Content-Type': 'image/png',
          'X-Bz-Content-Sha1': fileSha,
        }}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">Support for a single or bulk upload.</p>
      </Upload>
    </Modal>
  );
};

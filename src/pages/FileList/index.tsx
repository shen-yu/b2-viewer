import React, { useState, useContext, useEffect } from 'react';
import { Form, Table, Select, Modal, Divider, Button, message } from 'antd';
import ImagesModal from './ImagesModal'
import VideoModal from './VideoModal'
import { getBuckets, getFileList } from '@/services'
import { fileSize } from '@/utils'
import { BASE_URL } from '@/config'
import AppContext from '../createContext'
import moment from 'moment'
import copy from 'copy-to-clipboard';
import { useIntl } from 'umi'
const { Option } = Select;

interface bucketsValues {
    bucketId: string;
    bucketName: string;
}

export default () => {
    const intl = useIntl()
    const { state, dispatch } = useContext(AppContext);
    const [buckets, setBuckets] = useState([])
    const [fileList, setFileList] = useState([])
    const [imagesList, setImagesList] = useState([])
    const [videoOrigin, setVideoOrigin] = useState('')
    const [nowBucket, setNowBucket] = useState('')
    const [modalShowImages, setModalShowImages] = useState(false);
    const [modalShowVideo, setModalShowVideo] = useState(false);

    const handlePreview = (t, r, j) => {
        const type = r.contentType
        if (type.includes('image')) {
            setModalShowImages(true)
        }
        if (type.includes('audio')) {
            setVideoOrigin(j)
            setModalShowVideo(true)
        }
        if (type.includes('video')) {
            setVideoOrigin(j)
            setModalShowVideo(true)
        }
    }

    const handleCopy = (v: string) => {
        if (copy(v)) {
            message.success(intl.formatMessage({ id: 'COPY_LINK_SUCCESS' }));
        } else {
            message.warn(intl.formatMessage({ id: 'COPY_LINK_FAIL' }));
        }
    }

    const columns = [
        {
            title: intl.formatMessage({ id: 'FILE_NAME' }),
            dataIndex: 'fileName',
            width: 380,
            textWrap: 'word-break',
            ellipsis: true,
            key: 'fileName',
            render: (t: string, r: any) => {
                const jumpUrl = `${BASE_URL}/file/${nowBucket}/${t}`;
                return (
                    <a onClick={() => handlePreview(t, r, jumpUrl)}>{t}</a>
                )
            }
        },
        {
            title: intl.formatMessage({ id: 'FILE_SIZE' }),
            dataIndex: 'contentLength',
            key: 'contentLength',
            sorter: (a: any, b: any) => a.contentLength - b.contentLength,
            render: (t: number) => {
                return (
                    <span>{fileSize(t)}</span>
                )
            }
        },
        {
            title: intl.formatMessage({ id: 'FILE_TYPE' }),
            dataIndex: 'contentType',
            key: 'contentType'
        },
        {
            title: intl.formatMessage({ id: 'UPLOAD_TIME' }),
            dataIndex: 'uploadTimestamp',
            key: 'uploadTimestamp',
            width: 180,
            sorter: (a: any, b: any) => a.uploadTimestamp - b.uploadTimestamp,
            render: (t: string) => {
                return (
                    <span>{moment(t).format('YYYY-MM-DD HH:mm:ss')}</span>
                )
            }
        },
        {
            title: intl.formatMessage({ id: 'OPERATION' }),
            width: 180,
            dataIndex: 'operation',
            key: 'contentSha1',
            render: (t: string, r: any) => {
                const jumpUrl = `${BASE_URL}/file/${nowBucket}/${r.fileName}`;
                return (
                    <>
                        <Button onClick={() => handlePreview(t, r, jumpUrl)} type="primary" size="small">{intl.formatMessage({ id: 'PREVIEW' })}</Button>
                        <Divider type="vertical" />
                        <Button onClick={() => handleCopy(jumpUrl)} type="primary" size="small">{intl.formatMessage({ id: 'COPY_LINK' })}</Button>
                    </>
                )
            }
        },
    ];


    const handleChange = (bucketId: string, o: any) => {
        setNowBucket(o.children)
        getFileList({ bucketId }).then((res: any) => {
            if (res) {
                const list = res.files
                const imagesList = list.filter(i => i.contentType.includes('image'))
                setFileList(list)
                setImagesList(imagesList.map(v => ({ ...v, src: `${BASE_URL}/file/${o.children}/${v.fileName}` })))
            }
        })
        // getUploadUrl({ bucketId }).then(res => {
        //     if (res) {
        //         dispatch({
        //             type: 'SET_UPLOAD',
        //             params: res
        //         })
        //     }
        // })
    }

    const onImagesChange = (e) => {
        console.log(e)
    }

    // const setUploadModalShowFn = (v: boolean) => {
    //     setUploadModalShow(v)
    // }

    useEffect(() => {
        if (window.localStorage.getItem('accountId')) {
            const accountId = window.localStorage.getItem('accountId')
            getBuckets({ accountId }).then((res: any) => {
                if (res) {
                    setBuckets(res.buckets)
                }
            })
        }
    }, [state])
    return (
        <>
            <Form
                layout="inline"
                style={{ justifyContent: 'space-between', marginBottom: 10 }}
            >
                <Form.Item label="Buckets">
                    <Select style={{ width: 120 }} onChange={handleChange}>
                        {buckets.map((i: bucketsValues) => <Option value={i.bucketId} key={i.bucketId}>{i.bucketName}</Option>)}
                    </Select>
                </Form.Item>
                {/* <Form.Item label=" " colon={false}>
                    <Button onClick={() => setUploadModalShowFn(true)} type='primary' icon={<CloudUploadOutlined />} style={{ display: 'inline-block' }}>Upload</Button>
                </Form.Item> */}
            </Form>
            <Table dataSource={fileList} columns={columns} rowKey="fileId" pagination={{ showSizeChanger: true }} />
            <Modal
                title={intl.formatMessage({ id: 'MODAL_TITLE_IMAGE' })}
                visible={modalShowImages}
                onOk={() => setModalShowImages(true)}
                onCancel={() => setModalShowImages(false)}
                footer={null}
            >
                <ImagesModal imagesList={imagesList} onImagesChange={onImagesChange} />
            </Modal>
            <Modal
                title={intl.formatMessage({ id: 'MODAL_TITLE_VIDEO' })}
                width={790}
                visible={modalShowVideo}
                onOk={() => setModalShowVideo(true)}
                onCancel={() => setModalShowVideo(false)}
                footer={null}
            >
                <VideoModal videoOrigin={videoOrigin} />
            </Modal>
            {/* <UploadModal uploadModalShow={uploadModalShow} setUploadModalShowFn={setUploadModalShowFn} /> */}
        </>
    )
}

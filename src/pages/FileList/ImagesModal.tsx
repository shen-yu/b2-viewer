import React, { useState, useMemo } from 'react'
import copy from 'copy-to-clipboard';
import { useIntl } from 'umi'
import { message } from 'antd'
import {
    LeftCircleOutlined,
    RightCircleOutlined,
} from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import styles from '../index.less';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default ({ imagesList, onImagesChange }) => {
    const intl = useIntl()
    const [list, setList] = useState([])
    const handleCopy = (v: string) => {
        if (copy(v)) {
            message.success(intl.formatMessage({ id: 'COPY_LINK_SUCCESS' }));
        } else {
            message.warn(intl.formatMessage({ id: 'COPY_LINK_FAIL' }));
        }
    }

    useMemo(() => { setList(imagesList) }, [imagesList])

    return (
        <Carousel
            className={styles.customCarousel}
            showArrows={true}
            onChange={onImagesChange}
            renderArrowPrev={(clickHandler: () => void, hasPrev: boolean, label: string) => (hasPrev && <div onClick={clickHandler} className={styles.swipeArrowLeft} style={{ left: 0 }}><LeftCircleOutlined style={{ fontSize: 38 }} /></div>)}
            renderArrowNext={(clickHandler: () => void, hasNext: boolean, label: string) => (hasNext && <div onClick={clickHandler} className={styles.swipeArrowRight} style={{ right: 0 }}><RightCircleOutlined style={{ fontSize: 38 }} /></div>)}>
            {list.map(i => {
                return <div key={i.fileName}>
                    <img src={i.src} />
                    <p onClick={() => handleCopy(i.src)} className={styles.legend}>{i.fileName}</p>
                </div>
            })}
        </Carousel>
    )
}
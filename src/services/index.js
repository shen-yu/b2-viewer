import { stringify } from 'qs';
import request from '@/utils/request';

// 获取用户令牌 /b2_authorize_account
export async function getAuthorize(params) {
    return request(`/login/b2_authorize_account`, {
        method: 'GET',
        headers: {
            ...params,
        },
    });
}

// 获取uploadUrl /b2_get_upload_url
export async function getUploadUrl(params) {
    return request(`/api/b2_get_upload_url?${stringify(params)}`);
}

// 获取Buckets /b2_list_buckets
export async function getBuckets(params) {
    return request(`/api/b2_list_buckets?${stringify(params)}`);
}

// 获取文件 /b2_list_file_names
export async function getFileList(params) {
    return request(`/api/b2_list_file_names?${stringify(params)}`);
}

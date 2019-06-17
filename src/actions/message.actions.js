import { createActions } from 'redux-actions';
import { message as msg } from 'antd';

const handlePayload = type => (description, duration) => msg[type](description, duration);

export const messageActions = createActions({
    ERROR: handlePayload('error'),
    INFO: handlePayload('info'),
    LOADING: handlePayload('loading'),
    SUCCESS: handlePayload('success'),
    WARNING: handlePayload('warning'),
});
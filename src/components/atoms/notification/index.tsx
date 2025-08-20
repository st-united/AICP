import {
  InfoCircleFilled,
  ExclamationCircleFilled,
  WarningFilled,
  CheckCircleFilled,
  CloseOutlined,
} from '@ant-design/icons';
import { notification } from 'antd';
import './notification.scss';

export enum NotificationTypeEnum {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
}

export const openNotificationWithIcon = (type: NotificationTypeEnum, description: string) => {
  let icon = <CheckCircleFilled className='text-white' />;

  switch (type) {
    case NotificationTypeEnum.INFO:
      icon = <InfoCircleFilled className='text-white' />;
      break;
    case NotificationTypeEnum.ERROR:
      icon = <ExclamationCircleFilled className='text-white' />;
      break;
    case NotificationTypeEnum.WARNING:
      icon = <WarningFilled className='text-white' />;
      break;
    case NotificationTypeEnum.SUCCESS:
      icon = <CheckCircleFilled className='text-white' />;
      break;
  }

  notification[type]({
    message: description,
    className: `notification-${type}`,
    closeIcon: <CloseOutlined />,
    placement: 'topRight',
    icon: icon,
  });
};

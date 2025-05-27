import './EmptyData.scss';
import { Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

interface Props {
  content?: string;
  type?: 'large' | 'small';
}

export const EmptyData = ({ content, type = 'large' }: Props) => {
  const { t } = useTranslation();

  const name = type === 'large' ? 'large-empty' : type === 'small' ? 'small-empty' : '';
  return (
    <div className={name}>
      <Row className='children-container'>
        <Typography className='empty-text'>{content ? content : t('TABLE.EMPTY')}</Typography>
      </Row>
    </div>
  );
};

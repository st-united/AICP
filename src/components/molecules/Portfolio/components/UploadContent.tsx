import { FolderAddFilled } from '@ant-design/icons';
import { Divider } from 'antd';
import React, { memo } from 'react';

import { UploadContentProps } from '@app/interface/portfolio.interface';

const UploadContent = memo<UploadContentProps>(({ t }: UploadContentProps) => (
  <div className='w-full flex items-center justify-center text-gray-400'>
    <div className='flex flex-col items-center justify-center p-4 rounded-xl gap-2'>
      <FolderAddFilled className='text-4xl !text-[#FF8C5F]' />
      <span className='text-sm px-10'>{t('PORTFOLIO.CHOOSE_FILE')}</span>
      <Divider orientation='center' className='!text-sm !my-0 !text-gray-400'>
        {t('PORTFOLIO.OR')}
      </Divider>
      <div className='text-sm text-[#FF8C5F] border-[#FF8C5F] border-2 border-solid rounded-xl px-2 py-1'>
        {t('PORTFOLIO.PICK_FILE')}
      </div>
    </div>
  </div>
));

UploadContent.displayName = 'UploadContent';

export { UploadContent };

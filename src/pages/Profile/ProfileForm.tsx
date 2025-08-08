import { Form, Input, DatePicker, Button, Select } from 'antd';
import { Rule } from 'antd/lib/form';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useProfileForm } from './hook/useProfileForm';
import { useProfileSchema } from './profileSchema';
import CustomAvatar from '@app/components/atoms/CustomAvatar/CustomAvatar';
import JobSelect from '@app/components/atoms/CustomSelect/JobSelect';
import ProvinceSelect from '@app/components/atoms/CustomSelect/ProvinceSelect';
import PhoneInput from '@app/components/atoms/PhoneInput/PhoneInput';
import { DATE_TIME } from '@app/constants';
import { yupSync } from '@app/helpers';
import { UserProfile } from '@app/interface/user.interface';

import './Profile.scss';

interface ProfileFormProps {
  userData: UserProfile;
}

const ProfileForm = ({ userData }: ProfileFormProps) => {
  const { t } = useTranslation();
  const validator = [yupSync(useProfileSchema())] as unknown as Rule[];
  const memoizedUserData = useMemo(() => userData, [JSON.stringify(userData)]);

  const {
    form,
    editing,
    loading,
    onEdit,
    onCancel,
    onSubmit,
    shouldShowStudentFields,
    onStudentChange,
    previewImage,
    setPreviewImage,
    setFileImage,
  } = useProfileForm(memoizedUserData);

  const studentOptions = [
    { label: <div className='!px-4'>{t('PROFILE.STUDENT')}</div>, value: true },
    { label: <div className='!px-4'>{t('PROFILE.WORKER')}</div>, value: false },
  ];

  if (!userData) return null;

  return (
    <div>
      <div className='bg-[#FF8C5F] h-[145px] rounded-t-2xl'>
        <div className='absolute top-12 mx-auto left-1/2 -translate-x-1/2 lg:left-12 lg:translate-x-0'>
          <CustomAvatar
            avatar={memoizedUserData?.avatarUrl}
            previewImage={previewImage}
            isEdit={!editing}
            setPreviewImage={setPreviewImage}
            setFileImage={setFileImage}
          />
        </div>
      </div>

      <Form
        form={form}
        layout='vertical'
        className='w-full flex flex-col items-center !mt-[120px] !px-4'
        onFinish={onSubmit}
      >
        <h1 className='text-[1.813rem] font-bold text-center mb-6'>{t('PROFILE.TITLE_2')}</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 max-w-[900px] w-full'>
          <Form.Item
            name='fullName'
            label={
              <span>
                {t('PROFILE.FULLNAME')}
                <span className='text-red-500 ml-1'>*</span>
              </span>
            }
            rules={validator}
          >
            <Input
              className='!px-6 !py-3 !rounded-lg'
              placeholder={t('PROFILE.FULLNAME_PLACEHOLDER') as string}
              disabled={!editing}
            />
          </Form.Item>

          <Form.Item
            name='email'
            label={
              <span>
                {t('PROFILE.EMAIL')}
                <span className='text-red-500 ml-1'>*</span>
              </span>
            }
          >
            <Input
              className='!px-6 !py-3 !rounded-lg'
              placeholder={t('PROFILE.EMAIL_PLACEHOLDER') as string}
              disabled
            />
          </Form.Item>

          <Form.Item
            name='phoneNumber'
            label={
              <span>
                {t('PROFILE.PHONE')}
                <span className='text-red-500 ml-1'>*</span>
              </span>
            }
            rules={validator}
          >
            <PhoneInput disabled={!editing} className='h-[48px]' />
          </Form.Item>

          <Form.Item name='dob' label={t('PROFILE.DOB')} rules={validator}>
            <DatePicker
              className='!px-6 !py-3 !rounded-lg w-full'
              format={DATE_TIME.DAY_MONTH_YEAR}
              placeholder={t('PROFILE.DOB_PLACEHOLDER') as string}
              disabled={!editing}
              showNow={false}
            />
          </Form.Item>

          <Form.Item name='province' label={t('PROFILE.PROVINCE')} rules={validator}>
            <ProvinceSelect className='custom-orange-select h-full' disabled={!editing} />
          </Form.Item>

          <Form.Item name='job' label={t('PROFILE.OCCUPATION')} rules={validator}>
            <JobSelect className='custom-orange-select' disabled={!editing} />
          </Form.Item>

          <Form.Item name='isStudent' label={t('PROFILE.TARGET_LABEL')} rules={validator}>
            <Select
              className='custom-orange-select h-12'
              disabled={!editing}
              options={studentOptions}
              onChange={onStudentChange}
            />
          </Form.Item>

          {shouldShowStudentFields && (
            <>
              <Form.Item name='university' label={t('PROFILE.SCHOOL_LABEL')} rules={validator}>
                <Input
                  className='!px-6 !py-3 !rounded-lg bg-white'
                  placeholder={t('PROFILE.SCHOOL_PLACEHOLDER') as string}
                  disabled={!editing}
                />
              </Form.Item>

              <Form.Item name='studentCode' label={t('PROFILE.STUDENT_ID_LABEL')} rules={validator}>
                <Input
                  className='!px-6 !py-3 !rounded-lg'
                  placeholder={t('PROFILE.STUDENT_ID_PLACEHOLDER') as string}
                  disabled={!editing}
                />
              </Form.Item>
            </>
          )}
        </div>

        <Form.Item className='w-full max-w-[900px] flex justify-end !py-8'>
          <div className='flex justify-end gap-2'>
            {!editing ? (
              <Button
                onClick={onEdit}
                className='!rounded-3xl !px-8 !py-4 !text-md !bg-[#FF8C5F] !border-[#FF8C5F] !text-white font-bold'
              >
                {t('PORTFOLIO.EDIT')}
              </Button>
            ) : (
              <>
                <Button
                  onClick={onCancel}
                  className='!rounded-2xl !px-5 !py-4 !border-[#FF8C5F] !text-[#FF8C5F] hover:!bg-[#FF8C5F] hover:!text-white font-bold'
                >
                  {t('PORTFOLIO.CANCEL')}
                </Button>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='!rounded-2xl !px-8 !py-4 !text-md !bg-[#FF8C5F] !border-[#FF8C5F] !text-white font-bold'
                  loading={loading}
                  disabled={loading}
                >
                  {t('PORTFOLIO.SAVE')}
                </Button>
              </>
            )}
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfileForm;

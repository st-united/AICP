import { Form, Input, DatePicker, Button } from 'antd';
import { Rule } from 'antd/lib/form';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useProfileSchema } from './profileSchema';
import CustomAvatar from '@app/components/atoms/CustomAvatar/CustomAvatar';
import JobSelect from '@app/components/atoms/CustomSelect/JobSelect';
import ProvinceSelect from '@app/components/atoms/CustomSelect/ProvinceSelect';
import PhoneInput from '@app/components/atoms/PhoneInput/PhoneInput';
import { DATE_TIME, NAVIGATE_URL } from '@app/constants';
import { yupSync } from '@app/helpers';
import { useGetProfile, useUpdateProfile } from '@app/hooks';
import { UserProfile } from '@app/interface/user.interface';

import './Profile.scss';

const Profile = () => {
  const [avatar, setAvatar] = useState<string>();
  const [isEdit, setIsEdit] = useState(false);
  const [form] = Form.useForm();
  const { data } = useGetProfile();
  const updateProfileMutation = useUpdateProfile();
  const { t } = useTranslation();
  const validator = [yupSync(useProfileSchema())] as unknown as Rule[];
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        fullName: data.fullName || '',
        email: data.email || '',
        phoneNumber: data.phoneNumber || null,
        dob: data.dob ? dayjs(data.dob) : null,
        province: data.province || null,
        job: Array.isArray(data.job)
          ? data.job.every((j) => typeof j === 'object' && j !== null && 'id' in j)
            ? data.job.map((j) => (j as unknown as { id: string }).id)
            : (data.job as string[])
          : [],
        referralCode: data.referralCode || null,
      });
    }
  }, [
    data?.fullName,
    data?.email,
    data?.phoneNumber,
    data?.dob,
    data?.province,
    data?.job,
    data?.referralCode,
    form,
  ]);

  useEffect(() => {
    if (data?.avatarUrl) {
      setAvatar(data.avatarUrl);
    }
  }, [data?.avatarUrl]);

  const handleCancel = () => {
    setIsEdit(false);
    form.resetFields();
  };

  const handleSubmit = async (values: UserProfile) => {
    const phoneNumber = values.phoneNumber?.replace('(', '').replace(')', '');

    const fixedValues = {
      ...values,
      job: Array.isArray(values.job) ? values.job : values.job ? [values.job] : [],
      phoneNumber: phoneNumber,
    };
    updateProfileMutation.mutate(fixedValues, {
      onSuccess: () => {
        setIsEdit(false);
        navigate(NAVIGATE_URL.PROFILE);
      },
    });
  };

  return (
    <div className='relative rounded-2xl bg-white h-full shadow overflow-auto'>
      <div className='bg-[#FF8C5F] h-[145px] rounded-t-2xl '>
        <div className='absolute top-12 mx-auto left-1/2 -translate-x-1/2 lg:left-12 lg:translate-x-0'>
          <CustomAvatar avatar={avatar} isEdit={isEdit} onAvatarChange={setAvatar} />
        </div>
      </div>
      <Form
        form={form}
        layout='vertical'
        className='w-full flex justify-center !mt-[120px] !px-4'
        onFinish={handleSubmit}
        initialValues={{
          fullName: data?.fullName ?? '',
          email: data?.email ?? '',
          phoneNumber: data?.phoneNumber ?? null,
          dob: data?.dob ? dayjs(data?.dob) : null,
          province: data?.province ?? null,
          job: Array.isArray(data?.job)
            ? data?.job.every((j) => typeof j === 'object' && j !== null && 'id' in j)
              ? data?.job.map((j) => (j as unknown as { id: string }).id)
              : data?.job
            : [],
          referralCode: data?.referralCode ?? null,
        }}
      >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2 max-w-[900px] w-full'>
          <Form.Item name='fullName' label={t('PROFILE.FULLNAME')} rules={validator}>
            <Input
              className='!px-6 !py-3 !rounded-lg'
              placeholder={t('PROFILE.FULLNAME_PLACEHOLDER') as string}
              disabled={!isEdit}
            />
          </Form.Item>
          <Form.Item name='email' label={t('PROFILE.EMAIL')}>
            <Input
              className='!px-6 !py-3 !rounded-lg'
              placeholder={t('PROFILE.EMAIL_PLACEHOLDER') as string}
              disabled
            />
          </Form.Item>
          <Form.Item
            name='phoneNumber'
            className='!w-full'
            label={t('PROFILE.PHONE')}
            rules={validator}
          >
            <PhoneInput disabled={!isEdit} className='h-[48px]' />
          </Form.Item>
          <Form.Item name='dob' label={t('PROFILE.DOB')} rules={validator}>
            <DatePicker
              className='!px-6 !py-3 !rounded-lg w-full'
              format={DATE_TIME.DAY_MONTH_YEAR}
              placeholder={t('PROFILE.DOB_PLACEHOLDER') as string}
              disabled={!isEdit}
              showNow={false}
            />
          </Form.Item>
          <Form.Item name='province' label={t('PROFILE.PROVINCE')} rules={validator}>
            <ProvinceSelect className='custom-orange-select h-full' disabled={!isEdit} />
          </Form.Item>
          <Form.Item name='job' label={t('PROFILE.OCCUPATION')} rules={validator}>
            <JobSelect className='custom-orange-select' disabled={!isEdit} />
          </Form.Item>
          <Form.Item className='md:col-span-2 border-t border-[#E5E5E5] !py-8'>
            <div className='flex justify-end gap-2 !flex-row'>
              {!isEdit ? (
                <>
                  <Button
                    onClick={() => setIsEdit(true)}
                    className='!flex !justify-center !items-center !rounded-3xl !px-8 !py-4 !text-md !bg-[#FF8C5F] !border-[#FF8C5F] !text-white font-bold'
                  >
                    {t('PORTFOLIO.EDIT')}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={handleCancel}
                    className='!flex !justify-center !items-center !rounded-2xl !px-5 !py-4 !border-[#FF8C5F] !text-[#FF8C5F] !text-md hover:!bg-[#FF8C5F] hover:!text-white font-bold'
                  >
                    {t('PORTFOLIO.CANCEL')}
                  </Button>
                  <Button
                    type='primary'
                    htmlType='submit'
                    className='!flex !justify-center !items-center !rounded-2xl !px-8 !py-4 !text-md !bg-[#FF8C5F]  !border-[#FF8C5F] !text-white font-bold'
                  >
                    {t('PORTFOLIO.SAVE')}
                  </Button>
                </>
              )}
            </div>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};
export default Profile;

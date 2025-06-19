import { Form, Input, DatePicker, Button } from 'antd';
import { Rule } from 'antd/lib/form';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useProfileSchema } from './profileSchema';
import CustomAvatar from '@app/components/atoms/CustomAvatar/CustomAvatar';
import CountrySelect from '@app/components/atoms/CustomSelect/CountrySelect';
import JobSelect from '@app/components/atoms/CustomSelect/JobSelect';
import ProvinceSelect from '@app/components/atoms/CustomSelect/ProvinceSelect';
import { yupSync } from '@app/helpers';
import { useGetProfile } from '@app/hooks';

const Profile = () => {
  const [avatar, setAvatar] = useState<string>();
  const [isEdit, setIsEdit] = useState(false);
  const [form] = Form.useForm();
  const { data } = useGetProfile();
  const { t } = useTranslation();
  const validator = [yupSync(useProfileSchema())] as unknown as Rule[];

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        fullName: data.fullName || '',
        email: data.email || '',
        phone: data.phoneNumber || '',
        dob: data.dob ? dayjs(data.dob) : null,
        country: data.country || null,
        province: data.province || null,
        occupation: data.job || null,
        referral: data.referralCode || null,
      });
    }
  }, [data, form]);

  const handleCancel = () => {
    setAvatar('');
    setIsEdit(false);
    form.resetFields();
  };

  const handleSubmit = async (values: any) => {
    console.log('Form values:', values);
    // TODO: Add update profile API call here
    setIsEdit(false);
  };

  return (
    <>
      <div className='relative rounded-2xl bg-white'>
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
            phone: data?.phoneNumber ?? '',
            dob: data?.dob ? dayjs(data?.dob) : null,
            country: data?.country ?? null,
            province: data?.province ?? null,
            occupation: data?.job ?? null,
            referral: data?.referralCode ?? null,
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
            <Form.Item name='phone' label={t('PROFILE.PHONE')} rules={validator}>
              <Input
                className='!px-6 !py-3 !rounded-lg'
                placeholder={t('PROFILE.PHONE_PLACEHOLDER') as string}
                disabled={!isEdit}
              />
            </Form.Item>
            <Form.Item name='dob' label={t('PROFILE.DOB')} rules={validator}>
              <DatePicker
                className='!px-6 !py-3 !rounded-lg w-full'
                format='DD/MM/YYYY'
                placeholder={t('PROFILE.DOB_PLACEHOLDER') as string}
                disabled={!isEdit}
              />
            </Form.Item>
            <Form.Item name='province' label={t('PROFILE.PROVINCE')} rules={validator}>
              <ProvinceSelect disabled={!isEdit} />
            </Form.Item>
            <Form.Item name='occupation' label={t('PROFILE.OCCUPATION')} rules={validator}>
              <JobSelect disabled={!isEdit} />
            </Form.Item>
            <Form.Item name='referral' label={t('PROFILE.REFERRAL')} rules={validator}>
              <Input disabled defaultValue='jKvs500' className='!px-6 !py-3 !rounded-lg' />
            </Form.Item>
            <Form.Item className='md:col-span-2 border-t border-[#E5E5E5] !py-8'>
              <div className='flex justify-end gap-2 !flex-row'>
                {!isEdit ? (
                  <>
                    <Button
                      onClick={() => setIsEdit(true)}
                      className='!flex !justify-center !items-center !rounded-3xl !px-8 !py-4 !text-md !bg-[#FF8C5F] !border-[#FF8C5F] !text-white'
                    >
                      Chỉnh sửa
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={handleCancel}
                      className='!flex !justify-center !items-center !rounded-2xl !px-5 !py-4 !border-[#FF8C5F] !text-[#FF8C5F] !text-md hover:!bg-[#FF8C5F] hover:!text-white'
                    >
                      Hủy bỏ
                    </Button>
                    <Button
                      type='primary'
                      htmlType='submit'
                      className='!flex !justify-center !items-center !rounded-2xl !px-8 !py-4 !text-md !bg-[#FF8C5F]  !border-[#FF8C5F] !text-white'
                    >
                      Lưu
                    </Button>
                  </>
                )}
              </div>
            </Form.Item>
          </div>
        </Form>
      </div>
    </>
  );
};
export default Profile;

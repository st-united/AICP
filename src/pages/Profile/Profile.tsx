<<<<<<< HEAD
import { Form, Input, DatePicker, Button } from 'antd';
import { Rule } from 'antd/lib/form';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useProfileSchema } from './profileSchema';
import CustomAvartar from '@app/components/CustomAvartar/CustomAvartar';
import CountrySelect from '@app/components/CustomSelect/CountrySelect';
import JobSelect from '@app/components/CustomSelect/JobSelect';
import ProvinceSelect from '@app/components/CustomSelect/ProvinceSelect';
import { yupSync } from '@app/helpers';
import { useGetProfile } from '@app/hooks';

const Profile = () => {
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
        phone: data.phone || '',
        // dob: data.dob ? new Date(data.dob) : null,
        // country: data.country || null,
        // province: data.province || null,
        // occupation: data.occupation || null,
        // referral: data.referral || null,
      });
    }
  }, [data, form]);

  const handleCancel = () => {
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
        <div className='bg-[#3D6ADA] h-[145px] rounded-t-2xl '>
          <div className='absolute top-12 mx-auto left-1/2 -translate-x-1/2 lg:left-12 lg:translate-x-0'>
            <CustomAvartar avatar={data?.avatar || ''} isEdit={isEdit} />
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
            phone: data?.phone ?? '',
            // dob: data?.dob ? new Date(data.dob) : null,
            // country: data?.country ?? null,
            // province: data?.province ?? null,
            // occupation: data?.occupation ?? null,
            // referral: data?.referral ?? null,
          }}
        >
          <div className='grid grid-cols-1 md:grid-cols-2 gap-2 max-w-[900px] w-full'>
            <Form.Item name='fullName' label={t<string>('PROFILE.FULLNAME')} rules={validator}>
              <Input
                className='!px-6 !py-3 !rounded-lg'
                placeholder={t<string>('PROFILE.FULLNAME_PLACEHOLDER')}
                disabled={!isEdit}
              />
            </Form.Item>
            <Form.Item name='email' label={t<string>('PROFILE.EMAIL')}>
              <Input
                className='!px-6 !py-3 !rounded-lg'
                placeholder={t<string>('PROFILE.EMAIL_PLACEHOLDER')}
                disabled
              />
            </Form.Item>
            <Form.Item name='phone' label={t<string>('PROFILE.PHONE')} rules={validator}>
              <Input
                className='!px-6 !py-3 !rounded-lg'
                placeholder={t<string>('PROFILE.PHONE_PLACEHOLDER')}
                disabled={!isEdit}
              />
            </Form.Item>
            <Form.Item name='dob' label={t<string>('PROFILE.DOB')} rules={validator}>
              <DatePicker
                className='!px-6 !py-3 !rounded-lg w-full'
                format='DD/MM/YYYY'
                placeholder={t<string>('PROFILE.DOB_PLACEHOLDER')}
                disabled={!isEdit}
              />
            </Form.Item>
            <Form.Item name='country' label={t<string>('PROFILE.COUNTRY')} rules={validator}>
              <CountrySelect disabled={!isEdit} />
            </Form.Item>
            <Form.Item name='province' label={t<string>('PROFILE.PROVINCE')} rules={validator}>
              <ProvinceSelect disabled={!isEdit} />
            </Form.Item>
            <Form.Item name='occupation' label={t<string>('PROFILE.OCCUPATION')} rules={validator}>
              <JobSelect disabled={!isEdit} />
            </Form.Item>
            <Form.Item name='referral' label={t<string>('PROFILE.REFERRAL')} rules={validator}>
              <Input disabled defaultValue='jKvs500' className='!px-6 !py-3 !rounded-lg' />
            </Form.Item>
            <Form.Item className='md:col-span-2 border-t border-[#E5E5E5] !py-8'>
              <div className='flex justify-end gap-2 !flex-row'>
                {!isEdit ? (
                  <>
                    <Button
                      onClick={() => setIsEdit(true)}
                      className='!flex !justify-center !items-center !rounded-3xl !px-8 !py-4 !text-md !bg-[#3D6ADA] !text-white'
                    >
                      Chỉnh sửa
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={handleCancel}
                      className='!flex !justify-center !items-center !rounded-2xl !px-5 !py-4 !border-[#3D6ADA] !text-[#3D6ADA] !text-md hover:!bg-[#3D6ADA] hover:!text-white'
                    >
                      Hủy bỏ
                    </Button>
                    <Button
                      type='primary'
                      htmlType='submit'
                      className='!flex !justify-center !items-center !rounded-2xl !px-8 !py-4 !text-md !bg-[#3D6ADA] !text-white'
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
=======
const Profile = () => {
  return (
    <div className='flex flex-col'>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
    </div>
  );
};

>>>>>>> 5c46566 (feat: [AICP-24] Implement Homepage)
export default Profile;

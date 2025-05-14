import { Form, Input, DatePicker, Button } from 'antd';
import { useEffect, useState } from 'react';

import CustomAvartar from '@app/components/CustomAvartar/CustomAvartar';
import CountrySelect from '@app/components/CustomSelect/CountrySelect';
import JobSelect from '@app/components/CustomSelect/JobSelect';
import ProvinceSelect from '@app/components/CustomSelect/ProvinceSelect';
import { useGetProfile } from '@app/hooks';

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [form] = Form.useForm();
  const { data, isLoading } = useGetProfile();

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        fullName: data.fullName || '',
        email: data.email || '',
        phone: data.phone || '',
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
          }}
        >
          <div className='grid grid-cols-1 md:grid-cols-2 gap-2 max-w-[900px] w-full'>
            <Form.Item
              name='fullName'
              label='Họ tên'
              rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
            >
              <Input
                className='!px-6 !py-3 !rounded-lg'
                placeholder='Nhập họ tên'
                disabled={!isEdit}
              />
            </Form.Item>
            <Form.Item
              name='email'
              label='Email'
              rules={[{ required: true, message: 'Vui lòng nhập email' }]}
            >
              <Input className='!px-6 !py-3 !rounded-lg' placeholder='Nhập email' disabled />
            </Form.Item>
            <Form.Item
              name='phone'
              label='Số điện thoại'
              rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
            >
              <Input
                className='!px-6 !py-3 !rounded-lg'
                placeholder='Nhập số điện thoại'
                disabled={!isEdit}
              />
            </Form.Item>
            <Form.Item name='dob' label='Ngày sinh'>
              <DatePicker
                className='!px-6 !py-3 !rounded-lg w-full'
                format='DD/MM/YYYY'
                placeholder='Chọn ngày sinh'
                disabled={!isEdit}
              />
            </Form.Item>
            <Form.Item name='country' label='Quốc gia'>
              <CountrySelect disabled={!isEdit} />
            </Form.Item>
            <Form.Item name='province' label='Tỉnh thành'>
              <ProvinceSelect disabled={!isEdit} />
            </Form.Item>
            <Form.Item name='occupation' label='Nghề nghiệp'>
              <JobSelect disabled={!isEdit} />
            </Form.Item>
            <Form.Item name='referral' label='Mã giới thiệu'>
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
export default Profile;

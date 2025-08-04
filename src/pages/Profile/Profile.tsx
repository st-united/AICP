import { Form, Input, DatePicker, Button, Select } from 'antd';
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
import PortfolioContent from '@app/components/molecules/Portfolio/PortfolioContent';
import { DATE_TIME, NAVIGATE_URL } from '@app/constants';
import { yupSync } from '@app/helpers';
import { useGetProfile, useUpdateProfile } from '@app/hooks';
import { UserProfile } from '@app/interface/user.interface';

import './Profile.scss';

const Profile = () => {
  const [form] = Form.useForm();
  const [portfolioForm] = Form.useForm();

  const [isEdit, setIsEdit] = useState(false);
  const [initialValues, setInitialValues] = useState<UserProfile | null>(null);

  const { data } = useGetProfile();
  const { mutate: updateProfile, isPending: isLoading } = useUpdateProfile();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const validator = [yupSync(useProfileSchema())] as unknown as Rule[];
  const isStudent = Form.useWatch('isStudent', form);
  const shouldShowStudentFields = isStudent === true;

  useEffect(() => {
    if (!data) return;

    const parsedValues: UserProfile = {
      id: data.id ?? '',
      fullName: data.fullName || '',
      email: data.email || '',
      phoneNumber: data.phoneNumber || '',
      dob: data.dob ? dayjs(data.dob) : '',
      province: data.province || '',
      job: parseJob(data.job),
      referralCode: data.referralCode || '',
      isStudent: data.isStudent ?? false,
      university: data.isStudent ? data.university || '' : '',
      studentCode: data.isStudent ? data.studentCode || '' : '',
    };

    form.setFieldsValue(parsedValues);
    setInitialValues(parsedValues);
  }, [data, form]);

  const parseJob = (job: unknown): string[] => {
    if (!Array.isArray(job)) return [];
    return job.every((j) => typeof j === 'object' && j !== null && 'id' in j)
      ? job.map((j) => (j as { id: string }).id)
      : (job as string[]);
  };

  const normalizePhoneNumber = (phone?: string) => phone?.replace('(', '').replace(')', '') ?? '';

  const handleCancel = () => {
    setIsEdit(false);
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  };

  const handleSubmit = (values: UserProfile) => {
    const updatedValues: UserProfile = {
      ...values,
      phoneNumber: normalizePhoneNumber(values.phoneNumber),
      job: Array.isArray(values.job) ? values.job : values.job ? [values.job] : [],
      university: values.isStudent ? values.university || '' : '',
      studentCode: values.isStudent ? values.studentCode || '' : '',
    };

    updateProfile(updatedValues, {
      onSuccess: () => {
        setIsEdit(false);
        navigate(NAVIGATE_URL.PROFILE);
      },
    });
  };

  const studentOptions = [
    { label: <div className='!px-4'>{t('PROFILE.STUDENT')}</div>, value: true },
    { label: <div className='!px-4'>{t('PROFILE.WORKER')}</div>, value: false },
  ];

  const handleStudentChange = (value: boolean) => {
    form.setFieldValue('isStudent', value);
    if (!value) {
      form.setFieldsValue({
        university: '',
        studentCode: '',
      });
    }
  };

  return (
    <div className='relative rounded-2xl bg-white h-full shadow overflow-y-auto'>
      <div className='bg-[#FF8C5F] h-[145px] rounded-t-2xl'>
        <div className='absolute top-12 mx-auto left-1/2 -translate-x-1/2 lg:left-12 lg:translate-x-0'>
          <CustomAvatar avatar={data?.avatarUrl} isEdit={isEdit} />
        </div>
      </div>

      <Form
        form={form}
        layout='vertical'
        className='w-full flex flex-col items-center !mt-[120px] !px-4'
        onFinish={handleSubmit}
      >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 max-w-[900px] w-full'>
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

          <Form.Item name='phoneNumber' label={t('PROFILE.PHONE')} rules={validator}>
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

          <Form.Item name='isStudent' label={t('PROFILE.TARGET_LABEL')} rules={validator}>
            <Select
              className='custom-orange-select h-12'
              disabled={!isEdit}
              options={studentOptions}
              onChange={handleStudentChange}
            />
          </Form.Item>

          {shouldShowStudentFields && (
            <>
              <Form.Item name='university' label={t('PROFILE.SCHOOL_LABEL')} rules={validator}>
                <Input
                  className='!px-6 !py-3 !rounded-lg'
                  placeholder={t('PROFILE.SCHOOL_PLACEHOLDER') as string}
                  disabled={!isEdit}
                />
              </Form.Item>

              <Form.Item name='studentCode' label={t('PROFILE.STUDENT_ID_LABEL')} rules={validator}>
                <Input
                  className='!px-6 !py-3 !rounded-lg'
                  placeholder={t('PROFILE.STUDENT_ID_PLACEHOLDER') as string}
                  disabled={!isEdit}
                />
              </Form.Item>
            </>
          )}
        </div>

        <Form.Item className='w-full max-w-[900px] flex justify-end !py-8'>
          <div className='flex justify-end gap-2'>
            {!isEdit ? (
              <Button
                onClick={() => setIsEdit(true)}
                className='!rounded-3xl !px-8 !py-4 !text-md !bg-[#FF8C5F] !border-[#FF8C5F] !text-white font-bold'
              >
                {t('PORTFOLIO.EDIT')}
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleCancel}
                  className='!rounded-2xl !px-5 !py-4 !border-[#FF8C5F] !text-[#FF8C5F] hover:!bg-[#FF8C5F] hover:!text-white font-bold'
                >
                  {t('PORTFOLIO.CANCEL')}
                </Button>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='!rounded-2xl !px-8 !py-4 !text-md !bg-[#FF8C5F] !border-[#FF8C5F] !text-white font-bold'
                  loading={isLoading}
                  disabled={isLoading}
                >
                  {t('PORTFOLIO.SAVE')}
                </Button>
              </>
            )}
          </div>
        </Form.Item>
      </Form>

      <div className='py-6 px-4'>
        <h1 className='text-[18px] font-bold text-center my-2'>{t('PROFILE.PORTFOLIO_HEADER')}</h1>
        <PortfolioContent edit={isEdit} onCancel={handleCancel} onSave={portfolioForm.submit} />
      </div>
    </div>
  );
};

export default Profile;

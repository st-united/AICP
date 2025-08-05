import { Form } from 'antd';
import { useEffect, useState } from 'react';
import { useUpdateProfile } from '@app/hooks';
import { UserProfile } from '@app/interface/user.interface';
import dayjs, { Dayjs } from 'dayjs';
import { DATE_TIME } from '@app/constants';

type UserProfileFormValues = Omit<UserProfile, 'dob'> & {
  dob?: Dayjs | null;
};

export const useProfileForm = (initialData: UserProfile) => {
  const [form] = Form.useForm<UserProfileFormValues>();
  const [editing, setEditing] = useState(false);
  const { mutateAsync: updateProfile, isPending: loading } = useUpdateProfile();

  const isStudent = Form.useWatch('isStudent', form);
  const shouldShowStudentFields = isStudent === true;

  const normalizePhoneNumber = (phone?: string) => phone?.replace('(', '').replace(')', '') ?? '';
  const normalizeInitialValues = (data: UserProfile): UserProfileFormValues => {
    return {
      ...data,
      dob: data.dob ? dayjs(data.dob) : null,
      job: Array.isArray(data.job)
        ? data.job.map((j) => (typeof j === 'string' ? j : (j as any).id))
        : [],
      phoneNumber: normalizePhoneNumber(data.phoneNumber),
      university: data.isStudent ? data.university || '' : '',
      studentCode: data.isStudent ? data.studentCode || '' : '',
      isStudent: !!data.isStudent,
    };
  };

  useEffect(() => {
    const normalized = normalizeInitialValues(initialData);
    form.setFieldsValue(normalized);
  }, [initialData, form]);

  const onEdit = () => {
    setEditing(true);
  };

  const onCancel = () => {
    const normalized = normalizeInitialValues(initialData);
    form.setFieldsValue(normalized);
    setEditing(false);
  };

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();

      const updatedValues: UserProfile = {
        ...values,
        dob: values.dob ? values.dob.toDate().toISOString() : '',
        province: values.province ?? null,
        phoneNumber: normalizePhoneNumber(values.phoneNumber),
        job: Array.isArray(values.job) ? values.job : values.job ? [values.job] : [],
        isStudent: values.isStudent,
        university: values.isStudent ? values.university : '',
        studentCode: values.isStudent ? values.studentCode : '',
      };

      console.log(values.isStudent);
      await updateProfile(updatedValues);
      setEditing(false);
    } catch (error) {
      console.error('Validation or update failed:', error);
    }
  };

  const onStudentChange = (value: boolean) => {
    form.setFieldValue('isStudent', value);
    if (!value) {
      form.setFieldValue('university', '');
      form.setFieldValue('studentCode', '');
    }
  };

  return {
    form,
    editing,
    loading,
    onEdit,
    onCancel,
    onSubmit,
    shouldShowStudentFields,
    onStudentChange,
  };
};

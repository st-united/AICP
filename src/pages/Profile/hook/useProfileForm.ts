import { Form } from 'antd';
import { useEffect, useState } from 'react';
import { useUpdateProfile } from '@app/hooks';
import { UserProfile } from '@app/interface/user.interface';

export const useProfileForm = (initialData: UserProfile) => {
  const [form] = Form.useForm<UserProfile>();
  const [editing, setEditing] = useState(false);
  const { mutateAsync: updateProfile, isPending: loading } = useUpdateProfile();

  const isStudent = Form.useWatch('isStudent', form);
  const shouldShowStudentFields = isStudent === true;

  const normalizePhoneNumber = (phone?: string) => phone?.replace('(', '').replace(')', '') ?? '';
  const normalizeInitialValues = (data: UserProfile): UserProfile => {
    return {
      ...data,
      // dob: data.dob ? dayjs(data.dob) : undefined,
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
    console.log(initialData.dob?.toString());
  }, [initialData, form]);

  const onEdit = () => {
    setEditing(true);
  };

  const onCancel = () => {
    setEditing(false);
  };

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();

      const updatedValues: UserProfile = {
        ...values,
        province: values.province ?? null,
        phoneNumber: normalizePhoneNumber(values.phoneNumber),
        job: Array.isArray(values.job) ? values.job : values.job ? [values.job] : [],
        university: values.isStudent ? values.university || '' : '',
        studentCode: values.isStudent ? values.studentCode || '' : '',
      };

      await updateProfile(updatedValues);
      setEditing(false);
    } catch (error) {
      console.error('Validation or update failed:', error);
    }
  };

  const onStudentChange = (value: boolean) => {
    form.setFieldValue('isStudent', value);
    if (!value) {
      form.setFieldsValue({ university: '', studentCode: '' });
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

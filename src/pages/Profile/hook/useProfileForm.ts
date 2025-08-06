import { Form } from 'antd';
import { useEffect, useState } from 'react';
import { useUpdateProfile, useUploadAvatar } from '@app/hooks';
import { UserProfile } from '@app/interface/user.interface';
import dayjs, { Dayjs } from 'dayjs';
import { DATE_TIME } from '@app/constants';
import { RcFile } from 'antd/es/upload';

type UserProfileFormValues = Omit<UserProfile, 'dob'> & {
  dob?: Dayjs | null;
};

export const useProfileForm = (initialData: UserProfile) => {
  const [form] = Form.useForm<UserProfileFormValues>();
  const [editing, setEditing] = useState(false);
  const { mutateAsync: updateProfile, isPending: loading } = useUpdateProfile();
  const [previewImage, setPreviewImage] = useState(initialData?.avatarUrl ?? '');
  const [fileImage, setFileImage] = useState<RcFile>();

  const { mutateAsync: uploadAvatar } = useUploadAvatar();

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
    console.log(form.getFieldValue('dob'));
  }, [initialData, form]);

  const onEdit = () => {
    setEditing(true);
  };

  const onCancel = () => {
    const normalized = normalizeInitialValues(initialData);
    form.setFieldsValue(normalized);
    setPreviewImage(initialData.avatarUrl ?? '');
    setFileImage(undefined);
    setEditing(false);
  };

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();

      const updatedValues: UserProfile = {
        ...values,
        dob: values.dob ? values.dob.toDate().toISOString() : null,
        province: values.province ?? null,
        phoneNumber: normalizePhoneNumber(values.phoneNumber),
        job: Array.isArray(values.job) ? values.job : values.job ? [values.job] : [],
        university: values.isStudent ? values.university || '' : '',
        studentCode: values.isStudent ? values.studentCode || '' : '',
      };
      if (fileImage) {
        const formData = new FormData();
        formData.append('avatar', fileImage);
        uploadAvatar(formData, {
          onSuccess: (response) => {
            updatedValues.avatarUrl = response.data.avatarUrl || response.data.avatar;
          },
        });
      }
      updateProfile(updatedValues);
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
    previewImage,
    setPreviewImage,
    setFileImage,
  };
};

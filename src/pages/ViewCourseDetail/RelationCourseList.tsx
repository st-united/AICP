import { Button, Modal } from 'antd';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { NAVIGATE_URL } from '@app/constants';
import { useRegisterCourse } from '@app/hooks/useCourse';
import { Course } from '@app/interface/course.interface';

interface RelationCourseListProps {
  courses: Course[];
  title?: string;
  onRegisterSuccess?: (courseId: string) => void;
}

const RelationCourseList: React.FC<RelationCourseListProps> = ({
  courses,
  title,
  onRegisterSuccess,
}) => {
  const { t } = useTranslation();
  const { mutate: registerCourse, isPending } = useRegisterCourse();
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const handleRegister = useCallback(
    (courseId: string) => {
      registerCourse(courseId, {
        onSuccess: () => {
          setIsSuccessModalVisible(true);
          onRegisterSuccess?.(courseId);
        },
      });
    },
    [registerCourse, onRegisterSuccess],
  );

  if (!courses?.length) {
    return <div className='text-center text-gray-500 py-4'>{t('TEST_RESULT.NO_DATA')}</div>;
  }

  return (
    <>
      <div className='w-full mx-auto mt-6 bg-white rounded-2xl shadow'>
        <h3 className='text-2xl md:text-3xl lg:text-4xl font-bold text-[#fe7743] py-8 text-center'>
          {title || t('TEST_RESULT.SUGGESTION_TITLE')}
        </h3>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 px-2 md:px-8 pb-8'>
          {courses.map((course) => (
            <div key={course.id} className='px-4 md:px-16'>
              <div className='bg-white border-2 border-[#fe7743] rounded-2xl shadow-lg flex flex-col overflow-hidden'>
                <div className='relative w-full aspect-video'>
                  <img
                    src={course.linkImage}
                    alt={course.title}
                    className='w-full h-full object-cover'
                    loading='lazy'
                  />
                </div>

                <div className='flex-1 flex flex-col p-4 md:p-6 bg-[#F7F6FA]'>
                  <h4 className='text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-3 line-clamp-1'>
                    {course.title}
                  </h4>

                  <div
                    className='text-sm md:text-base text-gray-600 mb-4 flex-1 line-clamp-3'
                    dangerouslySetInnerHTML={{ __html: course.description }}
                  />

                  <div className='flex justify-end gap-3'>
                    <Button
                      className='rounded-full font-semibold text-base px-5 py-1.5 border-[#fe7743] text-[#fe7743]'
                      onClick={() =>
                        window.open(NAVIGATE_URL.DETAIL_COURSE_DYNAMIC(course.id), '_blank')
                      }
                    >
                      {t('RECOMMEND.VIEW_DETAIL')}
                    </Button>

                    <Button
                      type='primary'
                      loading={isPending}
                      disabled={isPending}
                      className='bg-[#fe7743] hover:bg-[#d16236] rounded-full font-semibold text-base px-5 py-1.5'
                      onClick={() => handleRegister(course.id)}
                    >
                      {t('RECOMMEND.SUGGESTION_REGISTER')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal
        open={isSuccessModalVisible}
        onCancel={() => setIsSuccessModalVisible(false)}
        footer={null}
        centered
        closable
      >
        <div className='text-center'>
          <div className='w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center'>
            <svg
              className='w-8 h-8 text-green-500'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              viewBox='0 0 24 24'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
            </svg>
          </div>

          <h3 className='text-xl font-semibold mb-2'>Đăng ký khóa học thành công!</h3>
          <p className='text-gray-600'>
            Đội ngũ DevPlus sẽ sớm liên hệ với bạn để trao đổi về thông tin khóa học!
          </p>
        </div>
      </Modal>
    </>
  );
};

export default RelationCourseList;

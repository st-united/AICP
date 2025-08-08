import { CheckCircleFilled } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { NAVIGATE_URL } from '@app/constants';
import { useRegisterCourse } from '@app/hooks/useCourse';
import { Course } from '@app/interface/course.interface';

interface RelationCourseListProps {
  courses: Course[];
  title?: string;
}

const RelationCourseList: React.FC<RelationCourseListProps> = ({ courses, title }) => {
  const { t } = useTranslation();
  const { mutate: registerCourse, isPending } = useRegisterCourse();

  const handleRegister = useCallback(
    (courseId: string) => {
      registerCourse(courseId, {
        onSuccess: () => {
          window.open(NAVIGATE_URL.DETAIL_COURSE_DYNAMIC(courseId), '_blank');
        },
      });
    },
    [registerCourse],
  );

  if (!courses?.length) {
    return (
      <div className='text-center text-gray-500 py-4 px-4 text-sm xsM:text-base'>
        {t('TEST_RESULT.NO_DATA')}
      </div>
    );
  }

  return (
    <>
      <div className='w-full mx-auto mt-4 xsM:mt-6 bg-white rounded-xl smML:rounded-2xl shadow'>
        <h3 className='text-xl xsM:text-2xl sm:text-3xl md:text-4xl lgM:text-5xl font-bold text-[#fe7743] py-4 xsM:py-6 sm:py-8 text-center px-4'>
          {title || t('TEST_RESULT.SUGGESTION_TITLE')}
        </h3>

        <div className='grid grid-cols-1 smML:grid-cols-2 lgM:grid-cols-3 gap-4 xsM:gap-8 px-3 xsM:px-4 sm:px-6 md:px-8 pb-4 xsM:pb-6 sm:pb-8'>
          {courses.map((course) => (
            <div key={course.id} className='w-full max-w-md mx-auto'>
              <div className='bg-white border-2 border-[#fe7743] rounded-xl smML:rounded-2xl shadow-lg flex flex-col overflow-hidden h-full'>
                <div className='relative w-full aspect-video'>
                  <img
                    src={course.linkImage}
                    alt={course.title}
                    className='w-full h-full object-cover'
                    loading='lazy'
                  />
                </div>

                <div className='flex-1 flex flex-col p-3 xsM:p-4 sm:p-5 md:p-6 bg-[#F7F6FA]'>
                  <h4 className='text-base xsM:text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2 xsM:mb-3 line-clamp-2 smML:line-clamp-1'>
                    {course.title}
                  </h4>

                  <div
                    className='text-xs xsM:text-sm sm:text-base text-gray-600 mb-3 xsM:mb-4 flex-1 line-clamp-2 xsM:line-clamp-3'
                    dangerouslySetInnerHTML={{ __html: course.description }}
                  />

                  <div className='flex flex-col xsM:flex-row justify-end gap-2 xsM:gap-3'>
                    <Button
                      className='rounded-full font-semibold text-xs xsM:text-sm sm:text-base px-3 xsM:px-4 sm:px-5 py-1 xsM:py-1.5 border-[#fe7743] text-[#fe7743] order-2 xsM:order-1'
                      onClick={() =>
                        window.open(NAVIGATE_URL.DETAIL_COURSE_DYNAMIC(course.id), '_blank')
                      }
                    >
                      {t('RECOMMEND.VIEW_DETAIL')}
                    </Button>

                    <Button
                      type='primary'
                      loading={isPending}
                      disabled={isPending || course.isRegistered}
                      className={`rounded-full font-semibold text-xs xsM:text-sm sm:text-base px-3 xsM:px-4 sm:px-5 py-1 xsM:py-1.5 order-1 xsM:order-2 !text-white ${
                        course.isRegistered ? '!bg-[#16610E] cursor-not-allowed' : 'bg-[#fe7743]'
                      }`}
                      onClick={() => handleRegister(course.id)}
                    >
                      {course.isRegistered && (
                        <CheckCircleFilled
                          style={{
                            color: 'white',
                            backgroundColor: '#16610E',
                            borderRadius: '50%',
                            marginRight: '8px',
                          }}
                        />
                      )}
                      {course.isRegistered
                        ? t('COURSES.REGISTERED')
                        : t('RECOMMEND.SUGGESTION_REGISTER')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RelationCourseList;

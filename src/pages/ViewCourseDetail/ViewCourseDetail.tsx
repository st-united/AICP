import { CheckCircleFilled, LeftOutlined } from '@ant-design/icons';
import { Alert, Button, Card, Spin } from 'antd';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

import RelationCourseList from './RelationCourseList';
import SuccessModal from '@app/components/molecules/Modal/SuccessModal';
import { useCourseDetail, useCourse, useRegisterCourse } from '@app/hooks/useCourse';

import './ViewCourseDetail.scss';

const ViewCourseDetail = () => {
  const { t } = useTranslation();

  const HTMLContent: React.FC<{ content: string; className?: string }> = ({
    content,
    className = '',
  }) => {
    return <div className={className} dangerouslySetInnerHTML={{ __html: content }} />;
  };

  const { courseId } = useParams<{ courseId: string }>();
  const { data: courseData, isLoading, error } = useCourseDetail(courseId || '');
  const { data: courseList, isLoading: listCourseLoading, error: listCourseError } = useCourse();
  const { mutate: registerCourse, isPending } = useRegisterCourse();
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const handleRegister = useCallback(
    (courseId: string) => {
      registerCourse(courseId, {
        onSuccess: () => {
          setIsSuccessModalVisible(true);
        },
      });
    },
    [registerCourse],
  );

  if (isLoading || listCourseLoading) {
    return <Spin className='top-1/2 left-1/2 fixed -translate-x-1/2 -translate-y-1/2' />;
  }

  if (error || listCourseError || !courseData || !courseList) {
    return (
      <>
        <div className='flex items-center border-none !text-gray-600 gap-2'>
          <LeftOutlined size={30} />
          {t<string>('EXAM.RESULT.BACK_TO_HOME')}
        </div>
        <div className='flex justify-center items-center h-screen px-2 xs:px-3 sm:px-4'>
          <Alert
            message={t('COURSES.ERROR_OCCURRED')}
            description={t('COURSES.COURSE_LOAD_ERROR')}
            type='error'
            showIcon
          />
        </div>
      </>
    );
  }

  return (
    <>
      <div className='min-h-screen p-2 xs:p-3 xsM:p-4 sm:p-5 md:p-6 lg:p-8' id='course-detail'>
        <div className='max-w-7xl mx-auto h-full'>
          <Link
            className='flex text-primary-gray items-center justify-start text-base md:text-lg !mb-3 md:!mb-5 hover:text-primary-light cursor-pointer'
            to={'/'}
          >
            <div className='flex items-center border-none !text-gray-600 gap-2'>
              <LeftOutlined size={30} />
              {t<string>('EXAM.RESULT.BACK_TO_HOME')}
            </div>
          </Link>
          <div className='text-center mb-8'>
            <h1 className='text-2xl sm:text-3xl font-bold text-orange-500 mb-2'>
              {courseData.title}
            </h1>
          </div>

          <div className='flex flex-col lg:grid lg:grid-cols-3 lgL:grid-cols-4 gap-4 xs:gap-5 xsM:gap-6 sm:gap-7 md:gap-8 lg:gap-10 bg-white p-3 xs:p-4 xsM:p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-lg xs:rounded-xl lg:rounded-2xl shadow-lg'>
            <div className='lg:col-span-2 lgL:col-span-3 flex flex-col gap-3 xs:gap-4 xsM:gap-5 sm:gap-6 md:gap-7 lg:gap-8'>
              <div className='w-full overflow-hidden rounded-lg xs:rounded-xl lg:rounded-2xl shadow-md'>
                <img
                  src={courseData.linkImage}
                  alt='Course'
                  className='w-full h-auto object-cover'
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>

              <div className='grid gap-3 xs:gap-4 xsM:gap-5 sm:gap-6 md:gap-7'>
                <Card className='border-none'>
                  <h3 className='text-base xs:text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2 xs:mb-3 sm:mb-4'>
                    {t('COURSES.COURSE_DESCRIPTION')}
                  </h3>
                  <HTMLContent
                    content={courseData.description}
                    className='text-xs xs:text-sm sm:text-base prose prose-sm xs:prose-base max-w-none [&>p]:mb-2 xs:[&>p]:mb-3 [&>ul]:ml-3 xs:[&>ul]:ml-4 [&>ul]:list-disc [&>li]:mb-1 xs:[&>li]:mb-2 [&>li]:text-gray-600 [&>strong]:text-gray-800'
                  />
                </Card>

                <Card className='border-none'>
                  <h3 className='text-base xs:text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2 xs:mb-3 sm:mb-4'>
                    {t('COURSES.COURSE_INFORMATION')}
                  </h3>
                  <HTMLContent
                    content={courseData.courseInformation}
                    className="text-xs xs:text-sm sm:text-base prose prose-sm xs:prose-base max-w-none [&>ul]:ml-3 xs:[&>ul]:ml-4 [&>ul]:list-disc [&>li]:mb-2 xs:[&>li]:mb-3 [&>li]:flex [&>li]:items-start [&>li]:space-x-2 xs:[&>li]:space-x-3 [&>li]:text-gray-600 [&>strong]:text-gray-800 [&>li:before]:content-['•'] [&>li:before]:text-blue-500 [&>li:before]:font-bold [&>li:before]:mr-1 xs:[&>li:before]:mr-2"
                  />
                </Card>

                <Card className='border-none'>
                  <h3 className='text-base xs:text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2 xs:mb-3 sm:mb-4'>
                    {t('COURSES.CONTACT_INFORMATION')}
                  </h3>
                  <HTMLContent
                    content={courseData.contactInformation}
                    className="text-xs xs:text-sm sm:text-base prose prose-sm xs:prose-base max-w-none [&>ul]:ml-3 xs:[&>ul]:ml-4 [&>ul]:list-disc [&>li]:mb-2 xs:[&>li]:mb-3 [&>li]:flex [&>li]:items-start [&>li]:space-x-2 xs:[&>li]:space-x-3 [&>li]:text-gray-600 [&>strong]:text-gray-800 [&>li:before]:content-['•'] [&>li:before]:text-green-500 [&>li:before]:font-bold [&>li:before]:mr-1 xs:[&>li:before]:mr-2 [&_a]:text-blue-600 [&_a]:hover:text-blue-800 [&_a]:underline [&_a]:break-words"
                  />
                </Card>
              </div>
            </div>

            <div className='lg:sticky top-6 self-start z-10 space-y-3 xs:space-y-4 xsM:space-y-5 sm:space-y-6 md:space-y-7 lg:space-y-8 order-first lg:order-last lgL:col-span-1'>
              <Card className='shadow-lg border-0 px-3 xs:px-4 sm:px-5 md:px-6 py-4 xs:py-5 sm:py-6 md:py-7 rounded-xl xs:rounded-2xl bg-[#FFE9E14F]'>
                <h3 className='text-base xs:text-lg sm:text-xl md:text-[1.42rem] font-semibold text-gray-800 mb-3 xs:mb-4 sm:mb-5'>
                  {t('COURSES.COURSE_OVERVIEW')}
                </h3>
                <div className='text-xs xs:text-sm sm:text-base text-gray-600 mb-3 xs:mb-4 sm:mb-5'>
                  <HTMLContent
                    content={courseData.overview}
                    className='prose prose-sm xs:prose-base max-w-none [&>p]:mb-2 xs:[&>p]:mb-3 [&>ul]:ml-3 xs:[&>ul]:ml-4 [&>ul]:list-disc [&>li]:mb-1'
                  />
                  {courseData.applicableObjects && (
                    <div className='mt-3 xs:mt-4 p-2 xs:p-3 bg-blue-50 rounded-md xs:rounded-lg'>
                      <p className='text-blue-800 font-medium text-xs xs:text-sm sm:text-base'>
                        <strong>{t('COURSES.TARGET_AUDIENCE')}</strong>{' '}
                        {courseData.applicableObjects}
                      </p>
                    </div>
                  )}
                </div>

                <div className='mt-4 xs:mt-5 sm:mt-6 md:mt-7'>
                  <Button
                    type='primary'
                    size='large'
                    loading={isPending}
                    disabled={isPending || courseData.isRegistered}
                    onClick={() => handleRegister(courseData.id)}
                    className={`w-full h-10 border-none rounded-full font-semibold text-xs xs:text-sm sm:text-base md:text-lg !text-white ${
                      courseData.isRegistered ? '!bg-[#16610E] cursor-not-allowed' : 'bg-orange-500'
                    }`}
                  >
                    {courseData.isRegistered && (
                      <CheckCircleFilled
                        style={{
                          color: 'white',
                          backgroundColor: '#16610E',
                          borderRadius: '50%',
                          marginRight: '8px',
                        }}
                      />
                    )}
                    {courseData.isRegistered ? t('COURSES.REGISTERED') : t('COURSES.REGISTER_NOW')}
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          <div className='mt-6 xs:mt-7 sm:mt-8 md:mt-10 lg:mt-12'>
            <RelationCourseList courses={courseList} title={t<string>('COURSES.RELATED_COURSES')} />
          </div>
        </div>
      </div>
      <SuccessModal
        visible={isSuccessModalVisible}
        onClose={() => setIsSuccessModalVisible(false)}
        title={t('COURSES.COURSE_REGISTRATION_SUCCESS')}
        message={t('COURSES.COURSE_REGISTRATION_SUCCESS_MESSAGE')}
      />
    </>
  );
};

export default ViewCourseDetail;

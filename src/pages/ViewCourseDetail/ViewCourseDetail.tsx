import { PlayCircleOutlined } from '@ant-design/icons';
import { Alert, Button, Card, Spin } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';

import RelationCourseList from './RelationCourseList';
import { useCourseDetail, useCourse } from '@app/hooks/useCourse';

import './ViewCourseDetail.scss';

const AIReadinessCoursePage = () => {
  const HTMLContent: React.FC<{ content: string; className?: string }> = ({
    content,
    className = '',
  }) => {
    return <div className={className} dangerouslySetInnerHTML={{ __html: content }} />;
  };
  const { courseId } = useParams<{ courseId: string }>();
  const { data: courseData, isLoading, error } = useCourseDetail(courseId || '');
  const { data: courseList, isLoading: listCourseLoading, error: listCourseError } = useCourse();

  if (isLoading || listCourseLoading) {
    return <Spin className='top-1/2 left-1/2 fixed -translate-x-1/2 -translate-y-1/2' />;
  }

  if (error || listCourseError || !courseData || !courseList) {
    return (
      <div className='flex justify-center items-center h-screen px-4'>
        <Alert
          message='Đã xảy ra lỗi'
          description='Không thể tải thông tin khóa học. Vui lòng thử lại sau.'
          type='error'
          showIcon
        />
      </div>
    );
  }

  return (
    <div className='min-h-screen p-6' id='course-detail'>
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-orange-500 mb-2'>{courseData.title}</h1>
        </div>

        {/* Main Content */}
        <div className='grid lg:grid-cols-3 gap-8 bg-white p-10 rounded-xl shadow-lg'>
          {/* Left Column - Hero Card */}
          <div className='lg:col-span-2 flex flex-col gap-6'>
            <img
              src={courseData.linkImage}
              alt='Course'
              className='object-contain rounded-2xl shadow-md'
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />

            {/* Course Details Section */}
            <div className='grid gap-5'>
              {/* Course Description */}
              <Card className='border-none'>
                <h3 className='text-lg font-semibold text-gray-800 mb-2'>Mô tả khóa học</h3>
                <HTMLContent
                  content={courseData.description}
                  className='text-sm prose prose-sm max-w-none [&>p]:mb-3 [&>ul]:ml-4 [&>ul]:list-disc [&>li]:mb-2 [&>li]:text-gray-600 [&>strong]:text-gray-800'
                />
              </Card>

              {/* Course Information */}
              <Card className='border-none'>
                <h3 className='text-lg font-semibold text-gray-800 mb-2'>Thông tin khóa học</h3>
                <HTMLContent
                  content={courseData.courseInformation}
                  className="text-sm prose prose-sm max-w-none [&>ul]:ml-4 [&>ul]:list-disc [&>li]:mb-3 [&>li]:flex [&>li]:items-start [&>li]:space-x-3 [&>li]:text-gray-600 [&>strong]:text-gray-800 [&>li:before]:content-['•'] [&>li:before]:text-blue-500 [&>li:before]:font-bold [&>li:before]:mr-2"
                />
              </Card>

              {/* Contact Information */}
              <Card className='border-none'>
                <h3 className='text-lg font-semibold text-gray-800 mb-2'>Thông tin liên hệ</h3>
                <HTMLContent
                  content={courseData.contactInformation}
                  className="text-sm prose prose-sm max-w-none [&>ul]:ml-4 [&>ul]:list-disc [&>li]:mb-3 [&>li]:flex [&>li]:items-start [&>li]:space-x-3 [&>li]:text-gray-600 [&>strong]:text-gray-800 [&>li:before]:content-['•'] [&>li:before]:text-green-500 [&>li:before]:font-bold [&>li:before]:mr-2 [&_a]:text-blue-600 [&_a]:hover:text-blue-800 [&_a]:underline"
                />
              </Card>
            </div>
          </div>

          {/* Right Column - Course Info */}
          <div className='space-y-6'>
            {/* Course Overview */}
            <Card className='shadow-lg border-0 px-4 py-6 rounded-2xl bg-[#FFE9E14F]'>
              <h3 className='text-lg font-semibold text-gray-800 mb-4'>Thông tin tổng quan:</h3>
              <div className='text-sm text-gray-600 mb-4'>
                <HTMLContent
                  content={courseData.overview}
                  className='prose prose-sm max-w-none [&>p]:mb-3 [&>ul]:ml-4 [&>ul]:list-disc [&>li]:mb-1'
                />
                {courseData.applicableObjects && (
                  <div className='mt-4 p-3 bg-blue-50 rounded-lg'>
                    <p className='text-blue-800 font-medium'>
                      <strong>Đối tượng:</strong> {courseData.applicableObjects}
                    </p>
                  </div>
                )}
              </div>

              <div className='mt-6'>
                <Button
                  type='primary'
                  size='large'
                  className='w-full bg-orange-500 hover:bg-orange-600 border-none rounded-full font-semibold'
                  icon={<PlayCircleOutlined />}
                >
                  Đăng ký ngay
                </Button>
              </div>
            </Card>
          </div>
        </div>
        <RelationCourseList courses={courseList} title='Các khóa học liên quan' />
      </div>
    </div>
  );
};

export default AIReadinessCoursePage;

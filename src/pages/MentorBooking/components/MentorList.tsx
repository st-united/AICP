import { SearchOutlined } from '@ant-design/icons';
import { Card, Input, Spin, Typography } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';

import UserCard from '@app/components/molecules/UserCard';
import { useMentorInfinite } from '@app/hooks/useMentor';
import { PAGE_SIZE } from '@app/interface/mentor.interface';

interface MentorListProps {
  slotSelected: { date: string | null; timeSlot: string | null };
  setMentorSelected: (key: string) => void;
  mentorSelected: string;
}

const MentorList = ({ slotSelected, mentorSelected, setMentorSelected }: MentorListProps) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useMentorInfinite({
    search,
    scheduledDate: slotSelected ? slotSelected.date : null,
    timeSlot: slotSelected ? slotSelected.timeSlot : null,
    take: PAGE_SIZE,
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { ref, inView } = useInView({
    threshold: 0.5,
    root: scrollContainerRef.current ?? undefined,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  return (
    <Card
      title={
        slotSelected?.date ? (
          <Typography className='!text-gray-700 text-sm font-normal'>
            Bạn đang xem danh sách các cố vấn có lịch trùng khớp với thời gian bạn đã chọn
          </Typography>
        ) : (
          ''
        )
      }
    >
      <Input
        className='p-3 mb-3'
        placeholder={t<string>('MENTOR_BOOKING.SEARCH_PLACEHOLDER')}
        suffix={<SearchOutlined />}
        onChange={(e) => setSearch(e.target.value)}
        allowClear
      />
      <Card className='border-none !p-0 w-full max-w-full flex-1' loading={isLoading}>
        <div
          ref={scrollContainerRef}
          className='overflow-auto h-[calc(100vh-18rem)] w-full max-w-full [&::-webkit-scrollbar]:w-2 '
        >
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-full'>
            {data?.pages.map((page) =>
              page.data.map((item: any) => (
                <UserCard
                  key={item?.id}
                  dataUser={item}
                  isSelected={mentorSelected === item?.id}
                  setSelected={setMentorSelected}
                />
              )),
            )}

            {hasNextPage && (
              <div ref={ref} className='col-span-full text-center py-6'>
                {isFetchingNextPage ? (
                  <div className='flex justify-center items-center'>
                    <Spin />
                  </div>
                ) : (
                  <div>{t('MENTOR_BOOKING.LOAD_MORE')}</div>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>
    </Card>
  );
};

export default MentorList;

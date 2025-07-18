import { Typography } from 'antd';
import React from 'react';

const { Title, Paragraph } = Typography;

type Props = {
  title: string;
  desc?: string; // đoạn mô tả đầu (không phải list)
  listItems?: string[]; // các dòng sẽ render dạng <li>
  paragraphs?: string[]; // dùng nếu không phải list
};

const Section = ({ title, desc, listItems, paragraphs }: Props) => (
  <div>
    <Title level={4} className='text-xl md:!text-[22px] !text-[#02185B] mb-3'>
      {title}
    </Title>

    {desc && (
      <Paragraph className='text-[14px] md:!text-[18px] leading-relaxed !mb-2'>{desc}</Paragraph>
    )}

    {listItems && (
      <ul className='ml-4 list-disc space-y-1 text-[14px] md:!text-[18px] leading-relaxed !mb-0 pl-4'>
        {listItems.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    )}

    {!listItems &&
      paragraphs?.map((p, idx) => (
        <Paragraph key={idx} className='text-[14px] md:!text-[18px] leading-relaxed !mb-0'>
          {p}
        </Paragraph>
      ))}
  </div>
);

export default Section;

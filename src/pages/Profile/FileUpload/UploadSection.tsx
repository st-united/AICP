import { FileUploader } from './FileUploader';

interface UploadSectionProps {
  label: string;
  disabled: boolean;
}

export const UploadSection = ({ label, disabled }: UploadSectionProps) => {
  return (
    <div className='space-y-2 transition-all duration-300'>
      <p className='font-medium mb-4'>{label}</p>
      <FileUploader disabled={disabled} />
    </div>
  );
};

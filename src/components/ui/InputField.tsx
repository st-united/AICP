export default function InputField({
  ...props
}: {
  type?: string;
  placeholder?: string;
  alt?: string;
  className?: string;
}) {
  const { type, placeholder, alt, className } = props;
  return (
    <>
      <input
        type={type || 'text'}
        alt={alt}
        className={`w-full bg-[#1955A0] h-11 !py-0 !pr-4 !pl-6 placeholder:text-[#69C0FF] !text-white outline-none rounded-md ${
          className ? className : ''
        }`}
        placeholder={placeholder}
      />
    </>
  );
}

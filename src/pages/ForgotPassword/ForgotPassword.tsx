import { ArrowLeftOutlined } from '@ant-design/icons';

import { InputField, Button } from '@app/components/ui/index';

export default function ForgotPassword() {
  return (
    <div className='!p-12 flex justify-start h-full w-full'>
      <div className='w-full'>
        <p className='text-white !mb-14 flex align-items gap-x-1'>
          <span>
            <ArrowLeftOutlined className='-translate-y-[2px]' />
          </span>
          <span>Quay về trang đăng nhập</span>
        </p>
        <div>
          <h1 className='text-4xl !text-white !font-bold'>Quên mật khẩu</h1>
          <p className='text-white !mb-8'>Bạn chưa có tài khoản? Đăng ký</p>
        </div>
        <form className='!space-y-8'>
          <InputField type={'email'} placeholder={'Email *'} />
          <Button type='primary' className={'w-full'}>
            Đặt lại mật khẩu
          </Button>
        </form>
      </div>
    </div>
  );
}

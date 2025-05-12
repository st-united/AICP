import { InputField, Button } from '@app/components/ui/index';

export default function ForgotPassword() {
  return (
    <div className='!p-12 flex justify-start'>
      <div className='w-4/5 h-full'>
        <p className='text-white !mb-14'>Quay về trang đăng nhập</p>
        <div>
          <h1 className='text-4xl !text-white font-bold'>Quên mật khẩu</h1>
          <p className='text-white !mb-8'>Bạn chưa có tài khoản? Đăng ký</p>
        </div>
        <form className='!space-y-8'>
          <InputField type={'email'} placeholder={'Email *'} />
          <Button>Đặt lại mật khẩu</Button>
        </form>
      </div>
    </div>
  );
}

const DemoCondition = async () => {
  return new Promise<boolean>((resolve) => {
    setTimeout(() => {
      console.log('DemoCondition');
      resolve(true);
    }, 2000);
  });
};

export default DemoCondition;

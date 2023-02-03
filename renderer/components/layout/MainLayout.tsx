const MainLayout = (props: React.PropsWithChildren) => {
  return (
    <>
      <main>{props.children}</main>

      {/* 통신 성공 실패값 여기에다 해주면 좋을듯. */}
    </>
  );
};

export default MainLayout;

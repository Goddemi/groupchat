const MainLayout = (props: React.PropsWithChildren) => {
  return (
    <>
      <main>{props.children}</main>
      {/* 통신 성공 실패 Notification 전역상태로 여기로 이동 */}
    </>
  );
};

export default MainLayout;

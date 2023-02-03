const GoBackButton = ({ goToLogin }: { goToLogin: () => void }) => {
  return (
    <span
      className="absolute top-2 left-3 text-gray-400 cursor-pointer"
      onClick={goToLogin}
    >
      ←
    </span>
  );
};

export default GoBackButton;

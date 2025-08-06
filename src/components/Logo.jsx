const Logo = ({ className = "" }) => {
  return (
    <div className={className}>
      <img
        src="./assets/mindtoria.png"
        alt="mindtoria"
        className="h-full w-full object-contain"
        loading="lazy"
      />
    </div>
  );
};

export default Logo;

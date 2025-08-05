const Logo = ({ className = "" }) => {
  return (
    <div className={className}>
      <img
        src="./public/assets/mindtoria-2.png"
        alt="mindtoria"
        className="h-full w-full object-contain"
        loading="lazy"
      />
    </div>
  );
};

export default Logo;

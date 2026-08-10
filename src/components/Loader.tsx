const Loader = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const dims = { sm: "h-4 w-4", md: "h-6 w-6", lg: "h-8 w-8" };
  return (
    <div
      className={`${dims[size]} animate-spin rounded-full border-2 border-primary/20 border-t-primary`}
    />
  );
};

export default Loader;

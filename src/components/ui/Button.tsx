interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
  size?: 'small' | 'medium' | 'large' | "extraLarge";
  border?: boolean
  onClick?: () => void;
}
export const Button = ({
  primary = false,
  size = 'medium', 
  children,
  border = true,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      type="button"
      className={`${primary ? "bg-primaryRed text-white font-bold border-primaryRed" : "bg-transparent border-black text-black"} ${border ? "border-2" : "border-none"} border-solid rounded-md px-3 py-1
      ${size == "small" ? "min-w-8 max-w-16" : size == "medium" ? "min-w-12 max-w-20" : size == "large" ? "min-w-16 max-w-24": "min-w-20"}
      ${props.className}`}
      
    >
      {children}
    </button>
  );
};
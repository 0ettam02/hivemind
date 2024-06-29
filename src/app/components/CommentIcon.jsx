import React from "react";
export const CommentIcon = ({
  fill = "#EA4335",
  filled,
  size,
  height,
  width,
  label,
  ...props
}) => {
  return (
    <svg
      width={size || width || 40}
      height={size || height || 24}
      viewBox="0 0 65 65"
      fill={filled ? fill : "none"}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M60,0H4C1.789,0,0,1.789,0,4v40c0,2.211,1.789,4,4,4h8v12
		c0,1.617,0.973,3.078,2.469,3.695C14.965,63.902,15.484,64,16,64c1.039,0,2.062-0.406,2.828-1.172L33.656,48H60
		c2.211,0,4-1.789,4-4V4C64,1.789,62.211,0,60,0z M56,40H32c-1.023,0-2.047,0.391-2.828,1.172L20,50.344V44c0-2.211-1.789-4-4-4H8V8
		h48V40z"
        stroke={fill}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
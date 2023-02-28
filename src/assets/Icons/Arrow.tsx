type IconProp = {
  fill?: string;
  stroke: string;
};

export const Arrow = ({ fill, stroke }: IconProp) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 70 70"
      viewBox="0 0 70 70"
    >
      <path
        d="M35,4c17.1,0,31,13.9,31,31S52.1,66,35,66S4,52.1,4,35S17.9,4,35,4 M35,0C15.7,0,0,15.7,0,35s15.7,35,35,35s35-15.7,35-35
		S54.3,0,35,0L35,0z"
        fill={fill}
        stroke={stroke}
      />
      <polyline
        stroke={stroke}
        fill={'none'}
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        points="41.5,18.3 22.8,34.6 42,51.4"
      />
    </svg>
  );
};

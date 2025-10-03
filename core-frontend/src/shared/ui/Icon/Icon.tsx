import { FC, SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
  name: string;
}

export const Icon: FC<IconProps> = ({ name, ...rest }) => {
  return (
    <svg {...rest}>
      <use xlinkHref={`/icons.svg#${name}`} />
    </svg>
  );
};

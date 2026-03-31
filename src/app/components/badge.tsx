interface Props {
  readonly children: React.ReactNode;
}
const Badge = ({ children }: Props) => {
  return <div className="green-bg px-2 py-1 rounded-md text-nowrap">{children}</div>;
};

export default Badge;

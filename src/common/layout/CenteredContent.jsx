export default function CenteredContent({ children, ...props }) {
  return (
    <div className="flex ...">
      <div className="flex-1 h-16"></div>
      <div className="flex-shrink-0 h-16 w-5/6 ...">{props.centeredComponent}</div>
      <div className="flex-1 h-16"></div>
    </div>
  );
}

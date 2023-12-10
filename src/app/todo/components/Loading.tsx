import { Skeleton } from "@nextui-org/skeleton";

export default function LoadingComponent() {
  return (
    <Skeleton>
      {Array(3)
        .fill(3)
        .map((_, index) => (
          <li
            key={index}
            className="flex justify-between items-center px-5 py-6 bg-bg-primary rounded-sm border border-bg-secondary"
          />
        ))}
    </Skeleton>
  );
}

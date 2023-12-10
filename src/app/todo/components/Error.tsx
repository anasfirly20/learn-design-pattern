import { handleRefresh } from "@/utils/utils";

export default function ErrorComponent() {
  return (
    <div>
      <p>
        An error has occurred,{" "}
        <span className="underline cursor-pointer" onClick={handleRefresh}>
          click here to reload the page.
        </span>
      </p>
    </div>
  );
}

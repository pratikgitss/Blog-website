import { Link } from "react-router-dom";

interface BlogCardProps {
  id: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}
export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
          <Avatar size="small" aName={authorName} />
          <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
            {authorName}
          </div>
          <div className="flex justify-center flex-col pl-2">
            <Circle />
          </div>
          <div className="pl-2 font-thin text-slate-800 text-sm flex justify-center flex-col">
            {publishedDate}
          </div>
        </div>
        <div className="font-semibold text-xl pt-2">{title}</div>
        <div className="font-thin text-md">
          {content.slice(0, 100) + (content.length > 100 ? "..." : "")}
        </div>
        <div className="font-thin text-sm text-slate-600 pt-4">{`${Math.ceil(
          content.length / 100
        )} minute(s) read`}</div>
      </div>
    </Link>
  );
};

export function Circle() {
  return <div className="rounded-full h-1 w-1 bg-slate-400"></div>;
}

export function Avatar({
  aName,
  size = "small",
}: {
  aName: string;
  size: "small" | "big";
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${
        size === "small" ? "w-6 h-6" : "w-10 h-10"
      } overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}
    >
      <span
        className={` ${
          size === "small" ? "text-xs" : "text-md"
        } text-xs text-gray-600 dark:text-gray-300`}
      >
        {aName[0]}
      </span>
    </div>
  );
}

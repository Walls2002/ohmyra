import { useEffect } from "react";

function Title({ title }) {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return null;
}

export default Title;

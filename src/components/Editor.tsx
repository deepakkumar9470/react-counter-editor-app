
import { useAppSelector } from "@/store/hooks/hooks";
import { RootState } from "@/store/store";
import { Button } from "@chakra-ui/react";
import QuillEditor from "react-quill";
import "react-quill/dist/quill.snow.css";
const Editor = ({ value, onChange }: { value: string, onChange: React.Dispatch<string> }) => {
  const storedUserData = useAppSelector((state: RootState) => state.users);
  return (
    <>
      {
        storedUserData && <QuillEditor
          theme="snow"
          style={{ height: "300px" }}
          value={value}
          onChange={onChange}
        />
      }

    </>
  );
};

export default Editor;
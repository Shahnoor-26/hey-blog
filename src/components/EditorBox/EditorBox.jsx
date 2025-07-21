import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import { env } from "../../env/env.js";

const EditorBox = ({
  name = "",
  label = "",
  initialValue = "",
  control,
  ...props
}) => {
  return (
    <div className="h-full w-full flex flex-col gap-2">
      {label && <label>{label}</label>}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey={env.tiny_editor_api_key}
            initialValue={initialValue}
            init={{
              initialValue: initialValue,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
          />
        )}
        {...props}
      />
    </div>
  );
};

export default EditorBox;

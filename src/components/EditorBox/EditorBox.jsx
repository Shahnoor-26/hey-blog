import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import { env } from "../../env/env.js";

const EditorBox = ({
  name = "",
  label = "",
  className = "",
  initialValue = "",
  control,
  ...props
}) => {
  return (
    <div className={`h-full w-full ${className}`}>
      {label && <label>{label}</label>}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey={env.tiny_editor_api_key}
            initialValue={initialValue}
            onEditorChange={onChange}
            init={{
              menubar: true,
              plugins: [
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
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | bold italic underline strikethrough | forecolor backcolor |  alignleft aligncenter alignright alignjustify |  bullist numlist outdent indent | link image media table |  code preview fullscreen | removeformat",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; line-height:1.6; padding: 1rem; }",
              image_caption: true,
              image_title: true,
              automatic_uploads: true,
              file_picker_types: "image media",
            }}
          />
        )}
        {...props}
      />
    </div>
  );
};

export default EditorBox;

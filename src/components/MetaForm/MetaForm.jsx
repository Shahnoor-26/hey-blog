import { useForm } from "react-hook-form";
import { Service } from "../../appwrite/configuration.js";
import { Button, EditorBox, Input, Select } from "../index.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCallback, useEffect } from "react";

const MetaForm = ({ article }) => {
  const { register, handleSubmit, watch, setValue, getValues, control } =
    useForm({
      defaultValues: {
        documentId: article ? article.documentId : "",
        title: article ? article.title : "",
        content: article ? article.content : "",
        status: article ? article.status : "active",
      },
    });

  const navigate = useNavigate();
  const userdata = useSelector((state) => state.auth.userdata.userdata);

  const submit = async (data) => {
    try {
      if (article) {
        const file = data.picture[0]
          ? await Service.fileUpload(data.picture[0])
          : "";

        if (file) Service.fileDelete(article.picture);

        const metadata = await Service.documentUpdate(article.$id, {
          ...data,
          picture: file ? file.$id : "",
        });

        if (metadata) navigate(`/article/${metadata.$id}`);
      } else {
        const file = data.picture[0]
          ? await Service.fileUpload(data.picture[0])
          : "";

        if (file) data.picture = file.$id;

        const metadata = await Service.documentCreate({
          ...data,
          userId: userdata.$id,
        });

        if (metadata) navigate(`/article/${metadata.$id}`);
      }
    } catch (error) {
      console.log("Form Submission Error ", error);
    }
  };

  const transformer = useCallback((data) => {
    try {
      if (data && typeof data === "string") {
        return data
          .trim()
          .toLowerCase()
          .replace(/[^a-zA-Z\d\s]+/g, "-")
          .replace(/\s/g, "-");
      }
      return "";
    } catch (error) {
      console.log("Transformer Error ", error);
    }
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title")
        setValue(
          "documentId",
          transformer(value.title, { shouldValidate: true })
        );
    });

    return () => subscription.unsubscribe();
  }, [watch, transformer, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div>
        <div>
          <Input
            label="Title: "
            placeholder="Enter article's title"
            className=""
            {...register("title", { required: true })}
          />
        </div>
        <div>
          <Input
            label="Endpoint: "
            placeholder="Enter article's endpoint"
            className=""
            {...register("documentId", { required: true })}
            onInput={(event) => {
              setValue("documentId", transformer(event.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />
        </div>
        <div>
          <EditorBox
            label="Content: "
            name="content"
            initialValue={getValues("content")}
            control={control}
          />
        </div>
      </div>
      <div>
        <div>
          <Input
            label="Featured Image"
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("picture", { required: !article })}
          />
        </div>
        {article && (
          <div>
            <img
              src={Service.filePreview(article.picture)}
              alt={article.title}
            />
          </div>
        )}

        <div>
          <Select
            label="Status: "
            options={["active", "inactive"]}
            {...register("status", { required: true })}
          />
        </div>

        <Button
          type="submit"
          children={article ? "Update Article" : "Create Article"}
        />
      </div>
    </form>
  );
};

export default MetaForm;

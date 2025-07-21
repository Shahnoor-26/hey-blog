import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Service } from "../../appwrite/configuration.js";
import { Button, Container, EditorBox, Input, Select } from "../index.js";

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
  const userdata = useSelector((state) => state.auth.userdata);

  const submit = async (data) => {
    try {
      if (article) {
        const file = data.picture[0]
          ? await Service.fileUpload(data.picture[0])
          : null;

        if (file) Service.fileDelete(article.picture);

        const metadata = await Service.documentUpdate(article.$id, {
          ...data,
          picture: file ? file.$id : article.picture,
        });

        if (metadata) navigate(`/article/${metadata.$id}`);
      } else {
        const file = data.picture[0]
          ? await Service.fileUpload(data.picture[0])
          : null;

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
    <Container className={"font-semibold antialiased select-none"}>
      <form
        onSubmit={handleSubmit(submit)}
        className="h-screen min-h-fit w-full p-2 md:flex text-base md:text-lg xl:text-xl"
      >
        <section className="h-auto w-full md:w-1/2 md:p-2 md:border-r-2">
          <div className="h-auto w-full p-2">
            <Input
              label="Title: "
              placeholder="Enter article's title"
              {...register("title", { required: true })}
              className="h-auto w-full px-2 py-1 border md:border-2 rounded text-sm md:text-base xl:text-lg transition-all duration-200 ease-in-out outline-none focus:ring-1 md:focus:ring-2"
            />
          </div>
          <div className="h-auto w-full p-2">
            <Input
              label="Endpoint: "
              placeholder="Enter article's endpoint"
              {...register("documentId", { required: true })}
              onInput={(event) => {
                setValue("documentId", transformer(event.currentTarget.value), {
                  shouldValidate: true,
                });
              }}
              className="h-auto w-full px-2 py-1 border md:border-2 rounded text-sm md:text-base xl:text-lg transition-all duration-200 ease-in-out outline-none focus:ring-1 md:focus:ring-2"
            />
          </div>
          <div className="h-auto w-full px-2 max-md:p-2">
            <EditorBox
              label="Content: "
              name="content"
              initialValue={getValues("content")}
              control={control}
            />
          </div>
        </section>
        <section className="h-auto w-full md:w-1/2 md:p-2">
          <div className="h-auto w-full p-2">
            <Input
              label="Featured Image: "
              type="file"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("picture", { required: !article })}
              className="h-auto w-full px-2 py-1 border md:border-2 rounded text-sm md:text-base xl:text-lg transition-all duration-200 ease-in-out outline-none focus:ring-1 md:focus:ring-2"
            />
          </div>
          {article && (
            <div className="h-2/5 md:h-1/2 xl:h-3/5 w-full p-2">
              <img
                src={Service.fileView(article.picture) || null}
                alt={article.title || "Not Available"}
                className="h-full w-full border md:border-2 rounded object-cover"
              />
            </div>
          )}
          <div className="h-auto w-full p-2 flex justify-between items-center">
            <div className="h-auto w-auto px-2 md:px-4 py-1 md:py-2 border md:border-2 rounded">
              <Select
                label="Status: "
                options={["active", "inactive"]}
                {...register("status", { required: true })}
              />
            </div>
            <Button
              type="submit"
              children={article ? "Update Article" : "Create Article"}
              className="max-h-fit max-w-fit px-2 md:px-4 py-1 md:py-2 border md:border-2 rounded transition-all duration-200 ease-in-out cursor-pointer outline-none focus:ring-1 md:focus:ring-2"
            />
          </div>
        </section>
      </form>
    </Container>
  );
};

export default MetaForm;

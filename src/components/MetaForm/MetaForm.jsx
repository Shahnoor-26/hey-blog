import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateIntoWebp } from "../utilities.js";
import { Service } from "../../appwrite/configuration.js";
import { Container, Input, Button, EditorBox, Select, Spin } from "../index.js";

const MetaForm = ({ article }) => {
  const [spin, updateSpin] = useState(false);
  const { register, handleSubmit, watch, getValues, setValue, control } =
    useForm({
      defaultValues: {
        title: article ? article.title : "",
        content: article ? article.content : "",
        status: article ? article.status : "active",
        documentId: article ? article.documentId : "",
      },
    });

  const navigate = useNavigate();
  const userdata = useSelector((state) => state.auth.userdata);

  const transformer = (str) => {
    if (!str && typeof str !== "string") return "";

    const source = String(str)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .replace(/-{2,}/g, "-")
      .slice(0, 36)
      .replace(/-+$/g, "");

    return source ? source : "";
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        const link = transformer(value.title);
        setValue("documentId", link, { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, transformer, setValue]);

  const submit = async (form) => {
    updateSpin(true);

    const source = form ? form.picture?.[0] : null;
    const webImage = source ? await updateIntoWebp(source) : null;
    const file = webImage ? await Service.fileUpload(webImage) : null;

    if (article) {
      try {
        if (file && article?.picture) await Service.fileDelete(article.picture);

        const metadata = await Service.documentUpdate(article.$id, {
          ...form,
          picture: file ? file.$id : article.picture,
        });

        if (metadata) {
          updateSpin(false);
          navigate(`/article/${metadata.$id}`);
        }
      } catch (error) {
        console.log(`website service error: ${error.message}`);
      }
    } else {
      try {
        const metadata = await Service.documentCreate({
          ...form,
          picture: file ? file.$id : "",
          userId: userdata ? userdata.$id : "",
        });

        if (metadata) {
          updateSpin(false);
          navigate(`/article/${metadata.$id}`);
        }
      } catch (error) {
        console.log(`website service error: ${error.message}`);
      }
    }
  };

  return (
    <Container className="bg-secondary-color text-primary-text font-semibold antialiased select-none">
      {spin && <Spin />}
      <form
        onSubmit={handleSubmit(submit)}
        className="h-screen min-h-fit w-full p-2 md:flex text-base md:text-lg xl:text-xl"
      >
        <section className="w-full md:w-1/2 md:p-2 md:border-secondary-accent md:border-r-2">
          <div className="w-full p-2">
            <Input
              label="Title: "
              placeholder="Enter your article's title"
              {...register("title", { required: true })}
              className="w-full px-2 py-1 bg-primary-color border-secondary-accent border md:border-2 rounded text-sm md:text-base xl:text-lg outline-none focus:ring-primary-accent focus:ring-1 md:focus:ring-2"
            />
          </div>
          <div className="w-full p-2">
            <Input
              label="Endpoint: "
              placeholder="Enter title to generate endpoint"
              {...register("documentId", { required: true })}
              onInput={(event) => {
                const endpoint = transformer(event.currentTarget.value);
                setValue("documentId", endpoint, { shouldValidate: true });
              }}
              className="w-full px-2 py-1 bg-primary-color border-secondary-accent border md:border-2 rounded text-sm md:text-base xl:text-lg outline-none focus:ring-primary-accent focus:ring-1 md:focus:ring-2"
            />
          </div>
          <div className="w-full px-2 max-md:p-2">
            <EditorBox
              label="Content: "
              name="content"
              initialValue={getValues("content")}
              control={control}
              className="flex flex-col gap-2.5"
            />
          </div>
        </section>
        <section className="w-full md:w-1/2 md:p-2">
          <div className="w-full p-2">
            <Input
              label="Featured Image: "
              type="file"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("picture", { required: !article })}
              className="w-full px-2 py-1 bg-primary-color border-secondary-accent border md:border-2 rounded text-sm md:text-base xl:text-lg outline-none focus:ring-primary-accent focus:ring-1 md:focus:ring-2"
            />
          </div>
          {article && (
            <div className="h-2/5 md:h-1/2 xl:h-3/5 w-full p-2">
              <img
                src={Service.fileView(article.picture) || null}
                alt={article.title || "Not Available"}
                className="h-full w-full border-secondary-accent border md:border-2 rounded object-cover"
              />
            </div>
          )}
          <div className="w-full p-2 flex justify-between items-center">
            <div className="min-h-fit min-w-fit px-2 md:px-4 py-1 md:py-2 bg-primary-color border-secondary-accent border md:border-2 rounded cursor-pointer">
              <Select
                label="Status: "
                options={["Active", "Inactive"]}
                {...register("status", { required: true })}
                className="rounded cursor-pointer focus:outline-none focus:ring-primary-accent focus:ring-1 md:focus:ring-2"
              />
            </div>
            <Button
              type="submit"
              children={article ? "Update Article" : "Create Article"}
              className="min-h-fit min-w-fit px-2 md:px-4 py-1 md:py-2 bg-primary-color border-secondary-accent border md:border-2 rounded cursor-pointer outline-none focus:ring-primary-accent focus:ring-1 md:focus:ring-2"
            />
          </div>
        </section>
      </form>
    </Container>
  );
};

export default MetaForm;

import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { updateIntoWebp } from "../utilities.js";
import { Service } from "../../appwrite/configuration.js";
import { Button, Container, EditorBox, Input, Select } from "../index.js";

const MetaForm = ({ article }) => {
  const { register, handleSubmit, watch, setValue, getValues, control } =
    useForm({
      defaultValues: {
        documentId: article ? article.documentId : "",
        title: article ? article.title : "",
        content: article ? article.content : "",
        status: article ? article.status : "public",
      },
    });

  const navigate = useNavigate();
  const userdata = useSelector((state) => state.auth.userdata);

  const transformer = useCallback((data) => {
    try {
      if (data && typeof data === "string") {
        let transformed = data
          .trim()
          .toLowerCase()
          .replace(/[^a-zA-Z0-9\s._-]+/g, "") // Only Appwrite-safe chars
          .replace(/\s+/g, "-") // Spaces to hyphens
          .replace(/^[-._]+/, "") // No leading special chars
          .replace(/[-._]+$/, "") // No trailing special chars
          .slice(0, 36); // Max 36 characters

        // Fallback if starts with non-alphanumeric
        if (!/^[a-zA-Z0-9]/.test(transformed)) {
          transformed = "doc-" + Date.now().toString(36);
        }

        return transformed;
      }
      return "";
    } catch (error) {
      console.log("Transformer Error", error);
      return "";
    }
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        const slug = transformer(value.title);
        setValue("documentId", slug, { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, transformer, setValue]);

  const submit = async (data) => {
    try {
      // Validate or fallback documentId
      if (
        !data.documentId ||
        data.documentId.length > 36 ||
        !/^[a-zA-Z0-9]/.test(data.documentId)
      ) {
        data.documentId = "doc-" + Date.now().toString(36);
      }

      const source = data.picture?.[0] ?? null;
      const webImage = source ? await updateIntoWebp(source) : null;
      const file = webImage ? await Service.fileUpload(webImage) : null;

      if (article) {
        // If editing, replace old image
        if (file && article.picture) {
          await Service.fileDelete(article.picture);
        }

        const metadata = await Service.documentUpdate(article.$id, {
          ...data,
          picture: file ? file.$id : article.picture,
        });

        if (metadata) navigate(`/article/${metadata.$id}`);
      } else {
        // On create
        if (file) data.picture = file.$id;
        data.userId = userdata.$id;

        const metadata = await Service.documentCreate(data);
        if (metadata) navigate(`/article/${metadata.$id}`);
      }
    } catch (error) {
      console.error("Form Submission Error", error);
    }
  };

  return (
    <Container className="bg-secondary-color text-primary-text font-semibold antialiased select-none">
      <form
        onSubmit={handleSubmit(submit)}
        className="h-screen min-h-fit w-full p-2 md:flex text-base md:text-lg xl:text-xl"
      >
        <section className="w-full md:w-1/2 md:p-2 md:border-secondary-accent md:border-r-2">
          <div className="w-full p-2">
            <Input
              label="Title: "
              placeholder="Enter article's title"
              {...register("title", { required: true })}
              className="w-full px-2 py-1 bg-primary-color border-secondary-accent border md:border-2 rounded text-sm md:text-base xl:text-lg outline-none focus:ring-primary-accent focus:ring-1 md:focus:ring-2"
            />
          </div>
          <div className="w-full p-2">
            <Input
              label="Endpoint: "
              placeholder="Enter article's endpoint"
              {...register("documentId", { required: true })}
              onInput={(event) => {
                const slug = transformer(event.currentTarget.value);
                setValue("documentId", slug, { shouldValidate: true });
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
          {article && article.picture && (
            <div className="h-2/5 md:h-1/2 xl:h-3/5 w-full p-2">
              <img
                src={Service.fileView(article.picture)}
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

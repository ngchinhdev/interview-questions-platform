import { authOptions } from "@app/api/auth/[...nextauth]/route";
import FormCreate from "@components/form-create";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface IFormQuestionProps {
  params: {
    slug: ["edit" | "create", string];
  };
}

const FormQuestion = async ({ params }: IFormQuestionProps) => {
  const session = await getServerSession(authOptions);

  console.log(params);

  if (!session) {
    redirect("/");
  }

  let editId = "";

  if (params.slug[0] === "edit" && params.slug[1]) {
    editId = params.slug[1];
  }

  return (
    <div>
      <div className="w-1/2">
        <h1 className="mt-8 scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl">
          {editId ? "Edit question" : "Contribute Question"}
        </h1>
        <p className="mt-2">
          Đóng góp câu hỏi và giải pháp của bạn giúp nhiều người có thêm kiến
          thức và sự chuẩn bị cho buổi phỏng vấn
        </p>
        <FormCreate editId={editId} />
      </div>
    </div>
  );
};

export default FormQuestion;

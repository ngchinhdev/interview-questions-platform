import { authOptions } from "@app/api/auth/[...nextauth]/route";
import FormCreate from "@components/form-create";
import { getServerSession } from "next-auth";
import Image from "next/image";
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
    <div className="mt-8 flex gap-10">
      <div className="w-1/2">
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl">
          {editId ? "Chỉnh sửa câu hỏi" : "Đóng góp câu hỏi"}
        </h1>
        <p className="mt-4">
          Đóng góp câu hỏi và giải pháp của bạn giúp nhiều người có thêm kiến
          thức và sự chuẩn bị cho buổi phỏng vấn
        </p>
        <FormCreate editId={editId} />
      </div>
      <div className="flex-1 py-5">
        <Image
          src="/images/contribute1.png"
          alt="Contribute"
          width={300}
          height={400}
          className="h-[500px] w-full"
        />
      </div>
    </div>
  );
};

export default FormQuestion;

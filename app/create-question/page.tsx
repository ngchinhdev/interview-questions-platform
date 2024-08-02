import FormCreate from "@components/form-create";

const CreateQuestion = () => {
  return (
    <div>
      <div className="w-1/2">
        <h1 className="mt-8 scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl">
          Contribute Question
        </h1>
        <p className="mt-2">
          Đóng góp câu hỏi và giải pháp của bạn giúp nhiều người có thêm kiến
          thức và sự chuẩn bị cho buổi phỏng vấn
        </p>
        <FormCreate />
      </div>
    </div>
  );
};

export default CreateQuestion;

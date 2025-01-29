// import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/components/layout/login-form";
// import { GithubOutlined } from "@ant-design/icons"

export default function LoginPage() {
  return (
    <div className=" text-xl flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          🇸 Social Space
        </a>
        <LoginForm />
      </div>
    </div>
  );
}

import { SignUp } from "@clerk/clerk-react";
import bgImage from "@/assets/sign_in2.png";
const SignUpPage = () => {
  return (
    <main
      className="flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat px-4"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <SignUp />
    </main>
  );
};

export default SignUpPage;

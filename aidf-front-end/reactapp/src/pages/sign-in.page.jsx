import { SignIn } from "@clerk/clerk-react";
import { Card, CardContent } from "@/components/ui/card";
import bgImage from "@/assets/sign_in2.png";
const SignInPage = () => {
  return (
    <main
      className="flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat px-4"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <SignIn />
    </main>
  );
};

export default SignInPage;

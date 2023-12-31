import { VStack } from "@/components/common/Stack";

import Profile from "./_components/Profile";
import Header from "@/components/common/Header";
import SignOutButton from "./_components/SignOutButton";

export default function Page({ params }: { params: { userID: string } }) {
  return (
    <VStack className="w-full h-full">
      <Header />
      <Profile />
      <div></div>
      <SignOutButton />
    </VStack>
  );
}
